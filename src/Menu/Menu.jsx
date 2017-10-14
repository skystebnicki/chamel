import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import CssEvent from '../utils/CssEvent';
import Dom from '../utils/Dom';
import KeyLine from '../utils/KeyLine';
import Paper from '../Paper/Paper';
import MenuItem from './MenuItem';
import LinkMenuItem from './LinkMenuItem';
import SubheaderMenuItem from './SubheaderMenuItem';
import classnames from 'classnames';
import ThemeService from '../styles/ChamelThemeService';

class Menu extends Component {

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call paprent constructor
    super(props);

    this.state = {
      nestedMenuShown: false,
      focusedIndex: props.focusedIndex
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({focusedIndex: nextProps.focusedIndex})
  }

  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);

    //Set the menu with
    this._setKeyWidth(el);

    //Save the initial menu height for later
    this._initialMenuHeight = el.offsetHeight + KeyLine.Desktop.GUTTER_LESS;

    //Show or Hide the menu according to visibility
    this._renderVisibility();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible !== prevProps.visible) this._renderVisibility();
  }

  render() {
    let theme = (this.context.chamelTheme && this.context.chamelTheme.menu)
      ? this.context.chamelTheme.menu : ThemeService.defaultTheme.menu;

    let classes = classnames(theme.menu, {
      [theme.menuHideable]: this.props.hideable,
      [theme.menuVisible]: this.props.visible
    });

    // If we have custom classes in the props, then let's include it
    if (this.props.classes) {
      classes += " " + this.props.classes;
    }

    const children = (this.props.menuItems.length) ? this._getChildren() : this.props.children;

    return (
      <Paper
        ref="paperContainer"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        zDepth={this.props.zDepth}
        style={{maxHeight: "460px", overflow: "auto"}}
        className={classes}
      >
        {children}
      </Paper>
    );
  }

  /**
   * Callback used to handle the hovering of mouse into the menu list
   *
   * @private
   */
  _handleMouseEnter = () => {
    this.setState({focusedIndex: null})
  }

  _getChildren() {
    let children = [],
      menuItem,
      itemComponent,
      isSelected,
      isDisabled,
      isFocused;

    //This array is used to keep track of all nested menu refs
    this._nestedChildren = [];

    for (let i = 0; i < this.props.menuItems.length; i++) {
      menuItem = this.props.menuItems[i];
      isSelected = i === this.props.selectedIndex;
      isDisabled = (menuItem.disabled === undefined) ? false : menuItem.disabled;

      if (this.state.focusedIndex == null) {
        isFocused = false;
      } else {
        isFocused = i === this.props.focusedIndex;
      }

      let {
        icon,
        data,
        attribute,
        number,
        toggle,
        onClick,
        ...other
        } = menuItem;

      switch (menuItem.type) {

        case MenuItem.Types.LINK:
          itemComponent = (
            <LinkMenuItem
              key={i}
              index={i}
              payload={menuItem.payload}
              target={menuItem.target}
              text={menuItem.text}
              disabled={isDisabled}/>
          );
          break;

        case MenuItem.Types.SUBHEADER:
          itemComponent = (
            <SubheaderMenuItem
              key={i}
              index={i}
              text={menuItem.text}/>
          );
          break;

        case MenuItem.Types.NESTED:
          let NestedMenuItem = require("./NestedMenuItem");
          itemComponent = (
            <NestedMenuItem
              ref={i}
              key={i}
              index={i}
              text={menuItem.text}
              disabled={isDisabled}
              menuItems={menuItem.items}
              zDepth={this.props.zDepth}
              onItemClick={this._onNestedItemClick}
              onItemTap={this._onNestedItemClick}/>
          );
          this._nestedChildren.push(i);
          break;

        default:
          itemComponent = (
            <MenuItem
              {...other}
              selected={isSelected}
              focused={isFocused}
              key={i}
              index={i}
              icon={menuItem.icon}
              data={menuItem.data}
              attribute={menuItem.attribute}
              number={menuItem.number}
              toggle={menuItem.toggle}
              disabled={isDisabled}
              onClick={this._onItemClick}>
              {menuItem.text}
            </MenuItem>
          );
      }
      children.push(itemComponent);
    }

    return children;
  }

  _setKeyWidth(el) {
    const menuWidth = this.props.autoWidth ?
    KeyLine.getIncrementalDim(el.offsetWidth) + 'px' :
      '100%';

    //Update the menu width
    Dom.withoutTransition(el, function () {
      // Changed the below to use auto width because
      // it was causing text to extnd beyond the menu
      // if items were added after the transition.
      if (el.style) {
        // Make sure we are mounted
        el.style.width = "auto";
      }
    });
  }

  _renderVisibility() {
    let el;

    if (this.props.hideable) {
      el = ReactDOM.findDOMNode(this);
      let innerContainer = ReactDOM.findDOMNode(this.refs.paperContainer.getInnerContainer());

      if (this.props.visible) {
        // Update the width
        this._setKeyWidth(el);

        //Open the menu
        /*
         This was not dealing with added menu items well at all. Changed the height
         to auto to fix the problems.
         - Sky Stebnicki
         */
        el.style.height = "auto"; //this._initialMenuHeight + 'px';

        //Set the overflow to visible after the animation is done so
        //that other nested menus can be shown
        CssEvent.onTransitionEnd(el, function () {
          //Make sure the menu is open before setting the overflow.
          //This is to accout for fast clicks
          if (this.props.visible) innerContainer.style.overflow = 'visible';
        }.bind(this));

      } else {

        //Close the menu
        el.style.height = '0px';

        //Set the overflow to hidden so that animation works properly
        innerContainer.style.overflow = 'hidden';
      }
    }
  }

  _onNestedItemClick = (e, index, menuItem) => {
    if (this.props.onItemClick) this.props.onItemClick(e, index, menuItem);
  }

  _onNestedItemTap = (e, index, menuItem) => {
    if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
  }

  _onItemClick = (e, index) => {
    if (this.props.onItemClick) this.props.onItemClick(e, index, this.props.menuItems[index]);
  }

  _onItemTap = (e, index) => {
    if (this.props.onItemTap) this.props.onItemTap(e, index, this.props.menuItems[index]);
  }

  _onItemToggle = (e, index, toggled) => {
    if (this.props.onItemToggle) this.props.onItemToggle(e, index, this.props.menuItems[index], toggled);
  };

  getClasses = (initialClasses, additionalClassObj) => {
    let classString = '';

    //Initialize the classString with the classNames that were passed in
    if (this.props.className) classString += ' ' + this.props.className;

    //Add in initial classes
    if (typeof initialClasses === 'object') {
      classString += ' ' + classNames(initialClasses);
    } else {
      classString += ' ' + initialClasses;
    }

    //Add in additional classes
    if (additionalClassObj) classString += ' ' + classNames(additionalClassObj);

    //Convert the class string into an object and run it through the class set
    return classNames(this.getClassSet(classString));
  };

  getClassSet = (classString) => {
    let classObj = {};

    if (classString) {
      classString.split(' ').forEach(function (className) {
        if (className) classObj[className] = true;
      });
    }

    return classObj;
  };
}

Menu.propTypes = {
  autoWidth: PropTypes.bool,
  onItemTap: PropTypes.func,
  onItemClick: PropTypes.func,
  onToggleClick: PropTypes.func,
  menuItems: PropTypes.array,
  selectedIndex: PropTypes.number,
  hideable: PropTypes.bool,
  visible: PropTypes.bool,
  zDepth: PropTypes.number,

  /**
   * The index that is currently being focused.
   *
   * This is used when moving the list up/down using the keyboard instead of hovering using the mouse
   *
   * @param {int}
   */
  focusedIndex: PropTypes.number,

  /**
   * Custom classes that will be applied to the paper container
   *
   * @param {string}
   */
  classes: PropTypes.string
};

Menu.defaultProps = {
  focusedIndex: null,
  autoWidth: true,
  hideable: false,
  visible: true,
  zDepth: 1,
  menuItems: []
};

/**
 * An alternate theme may be passed down by a provider
 */
Menu.contextTypes = {
  chamelTheme: PropTypes.object
};

export default Menu;
