import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import CssEvent from '../utils/CssEvent';
import Dom from '../utils/Dom';
import KeyLine from '../utils/KeyLine';
import Paper from '../Paper/Paper';
import Menu from './Menu';
import MenuItem from './MenuItem';
import LinkMenuItem from './LinkMenuItem';
import SubheaderMenuItem from './SubheaderMenuItem';

/***********************
 * Nested Menu Component
 ***********************/
class NestedMenuItem extends Component {

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call paprent constructor
    super(props);

    this.state = {
      open: false
    }
  }

  componentDidMount() {
    this._positionNestedMenu();
  }

  componentDidUpdate(prevProps, prevState) {
    this._positionNestedMenu();
  }

  render() {
    const classes = this.getClasses('chamel-nested-menu-item', {
      'chamel-open': this.state.open,
      'chamel-is-disabled': this.props.disabled
    });

    return (
      <div className={classes} onMouseEnter={this._openNestedMenu} onMouseLeave={this._closeNestedMenu}>
        <MenuItem index={this.props.index} disabled={this.props.disabled}
                  iconRightClassName="chamel-icon-custom-arrow-drop-right" onClick={this._onParentItemClick}>
          {this.props.text}
        </MenuItem>
        <Menu
          ref="nestedMenu"
          menuItems={this.props.menuItems}
          onItemClick={this._onMenuItemClick}
          onItemTap={this._onMenuItemTap}
          hideable={true}
          visible={this.state.open}
          zDepth={this.props.zDepth + 1}
        >
          {this.props.children}
        </Menu>
      </div>
    );
  }

  componentClickAway = () => {
    this._closeNestedMenu();
  };

  _positionNestedMenu = () => {
    let el = ReactDOM.findDOMNode(this),
      nestedMenu = ReactDOM.findDOMNode(this.refs.nestedMenu);

    nestedMenu.style.left = el.offsetWidth + 'px';
  };

  _openNestedMen = () => {
    if (!this.props.disabled) this.setState({open: true});
  };

  _closeNestedMenu = () => {
    this.setState({open: false});
  };

  _toggleNestedMenu = () => {
    if (!this.props.disabled) this.setState({open: !this.state.open});
  };

  _onParentItemClick = () => {
    this._toggleNestedMenu();
  };

  _onMenuItemClick = (e, index, menuItem) => {
    if (this.props.onItemClick) this.props.onItemClick(e, index, menuItem);
    this._closeNestedMenu();
  };

  _onMenuItemTap = (e, index, menuItem) => {
    if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
    this._closeNestedMenu();
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

NestedMenuItem.propTypes = {
  index: PropTypes.number,
  text: PropTypes.string,
  menuItems: PropTypes.array,
  zDepth: PropTypes.number,
  disabled: PropTypes.bool,
  onItemClick: PropTypes.func,
  onItemTap: PropTypes.func
};

NestedMenuItem.defaultProps = {
  disabled: false,
  zDepth: 1,
  index: -1
};

export default NestedMenuItem;
