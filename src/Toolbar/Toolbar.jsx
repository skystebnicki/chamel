import React from 'react';
import ReactDOM from "react-dom";
import ThemeService from '../styles/ChamelThemeService';
import IconButton from '../Button/IconButton';
import ChevronLeftIcon from '../icons/font/ChevronLeftIcon';
import ChevronRightIcon from '../icons/font/ChevronRightIcon';

/**
 * This variable will hold all the icons to be displayed in the toolbar
 *
 * If we are in mobile mode display, then we will evaluate the icon's width
 *  to determine how many icons will fit in the current toolbar.
 * Arrow navigation icons will be displayed if we have more icons to display
 *
 * @type {Array}
 */
var toolbarIcons = [];

/**
 * Main popover class handles absolute positioning paper relative to an element
 */
class Toolbar extends React.Component {

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call paprent constructor
    super(props);

    this.state = {
      /**
       * The width of the toolbar icons container
       *
       * This will determine if the icons to be displayed will fit in the toolbar
       */
      chamelToolbarWidth: 0,

      /**
       * The starting index of the icon that we are going to display
       *
       * This will be used if we are displaying the arrow navigation keys in the toolbar
       */
      startIconIndex: 0
    }
  }

  /**
   * Set accepted properties
   */
  static propTypes = {
    /**
     * If this is a secondary menu then it might be used inline in the document
     */
    secondary: React.PropTypes.bool
  };

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
    chamelTheme: React.PropTypes.object
  };

  componentDidMount() {

    // Get the offsetWidth of the main container for the toolbar icons
    let container = ReactDOM.findDOMNode(this.refs.chamelToolbar);

    this.setState({
      chamelToolbarWidth: container.offsetWidth
    });
  }

  componentWillUpdate() {

    /*
     * If the toolbarIcons length is 0, then we will get the toolbar icons from _getToolbarIcons()
     *
     * We need to get the icons here (componentWillUpdate)
     *  because the icons should be rendered first before we can get the icons (html nodes)
     */
    if (toolbarIcons.length == 0) {
      let level = 0;
      let container = ReactDOM.findDOMNode(this.refs.chamelToolbar);

      // Get the toolbar icons
      this._getToolbarIcons(this.props.children, container, level)
    }
  }

  render() {
    // Determine which theme to use
    let theme = (this.context.chamelTheme && this.context.chamelTheme.toolbar)
      ? this.context.chamelTheme.toolbar : ThemeService.defaultTheme.toolbar;

    /*
     * This will contain the total icons width to be displayed in the toolbar
     * And will be evaluated later to determine if we will display the arrow navigation keys
     */
    let totalIconsWidth = 0;

    // Let's calculate the total toolbar icons width, so we can evaluate if we need to display the arrow buttons
    toolbarIcons.map(function (icon) {
      totalIconsWidth += icon.width;
    })

    let classes = theme.toolbar;
    if (this.props.secondary) {
      classes += " " + theme.toolbarSecondary;
    }

    /*
     * Check if we should try to dynamically resize the toolbar
     */
    if (toolbarIcons.length != 0 && totalIconsWidth > this.state.chamelToolbarWidth) {

      /*
       * If the width of the totalIcons is greater than our toolbarWidth
       * then we need to evaluate how many icons should be displayed
       *
       * We will also display here the arrow navigation keys to browse the toolbars that are not displayed
       */
      let displayArrowLeft = null,
        displayArrowRight = null,
        totalDisplayIconWidth = 0,
        displayIcons = [],
        idx = this.state.startIconIndex;

      // Loop thru the toolbarIcons and evaluate how many icons will fit in the current toolbar's width
      for (let i = 1; i <= toolbarIcons.length; i++, idx++) {
        // Make sure that we will only evaluate if we have a toolbar icon
        if (toolbarIcons[idx]) {
          // Calculate the width of the total icons displayed
          totalDisplayIconWidth += toolbarIcons[idx].width;

          /*
           * If the width of the total icons displayed reaches the limit (chamelToolbarWidth)
           * Then we will break this for loop and will not add more toolbar icons to displayIcons
           *
           * We need to minus the toolbarWidth with 96 to accommodate the arrow navigation buttons
           */
          if (totalDisplayIconWidth > (this.state.chamelToolbarWidth - 144)) {
            break;
          }

          /*
           * The number of icons to be displayed are limited because we need to make sure that
           *  they will fit in the toolbar main container's width
           */
          displayIcons.push(toolbarIcons[idx].icon);
        }
      }

      // This will determine if we need to display the left arrow icon
      if (this.state.startIconIndex > 0) {
        displayArrowLeft = (
          <div className={theme.chamelToolbarLeftArrow}>
            <IconButton onTap={(e) => { this._handleArrowClick(-1); }}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        );
      } else {
        displayArrowLeft = null;
      }

      // This will determine if we need to display the right arrow icon
      if ((this.state.startIconIndex + displayIcons.length) < toolbarIcons.length) {
        displayArrowRight = (
          <div className={theme.chamelToolbarRightArrow}>
            <IconButton onTap={(e) => { this._handleArrowClick(1); }}>
              <ChevronRightIcon />
            </IconButton>
          </div>
        );
      }

      // Modify the toolbar main container's style so we can properly display the toolbar icons
      let iconContainerStyle = {
        textAlign: 'left',
        display: 'inline-block'
      };

      return (
        <div ref="chamelToolbar" className={classes}>
          {displayArrowLeft}
          <div ref="chamelToolbar" className={this.toolbarGroup} style={iconContainerStyle}>
            {displayIcons}
          </div>
          {displayArrowRight}
        </div>
      );
    } else {

      // If the toolbar main container is wide enough to display all the icons, then just display the props.children
      return (
        <div ref="chamelToolbar" className={classes}>
          {this.props.children}
        </div>
      );
    }
  }

  /**
   * Callback used to handle the clicking of the navigation arrow icons
   *
   * @param {int} value The number that will be used to modify the div's left value (negative value = left key; positive value = right key)
   * @private
   */
  _handleArrowClick(value) {

    // Update the startIconIndex
    let startIconIndex = this.state.startIconIndex + value;
    this.setState({startIconIndex: startIconIndex});
  }

  /**
   * Function that will get the icon's width
   *
   * @param {DOMNode} element The icon element that we want to get the width
   * @returns {int} The icon's width
   * @private
   */
  _getIconWidth(element) {
    var style = element.currentStyle || window.getComputedStyle(element);

    let width = parseInt(style.width, 10)
      + parseInt(style.marginLeft, 10)
      + parseInt(style.marginRight, 10)
      + parseInt(style.paddingLeft, 10)
      + parseInt(style.paddingRight, 10);

    if (width == 0 || isNaN(width)) {
      width = element.offsetWidth;
    }

    return width;
  }

  /**
   * Function that will get all the toolbar icons
   *
   * @param {React.Children} children The children of the react component that contains the possible toolbar icons
   * @param {DOMNode} elementContainer The parent node of the elemeent
   * @param {int} level Determine how deep we have checked to look for toolbar icons
   * @private
   */
  _getToolbarIcons(children, elementContainer, level) {

    // Limitation: Currently, we can handle 1 level deep (which is the <ToolbarGroup> as the element container)
    if (level > 1) {

      // TODO: If level 2 or more, then we need to be able to check if the child element is an icon or not
      return;
    }

    for (var idx in children) {
      let child = children[idx];
      let element = elementContainer.childNodes[idx];

      // If we do not have an element, then we do not need to continue
      if (!element) {
        continue;
      }

      // If the current element is a div and has child nodes, then we will assume that it contains toolbar icons
      if (element.nodeType
        && element.tagName.toLowerCase() === 'div'
        && child.props.children) {
        this._getToolbarIcons(child.props.children, element, level + 1);
      } else if (element.nodeType) {

        toolbarIcons.push({
            icon: child,
            width: this._getIconWidth(element)
          }
        );
      }
    }
  }
}

export default Toolbar;
