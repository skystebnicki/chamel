import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ThemeService from '../styles/ChamelThemeService';
import Paper from '../Paper/Paper'
import IconButton from '../Button/IconButton';
import Dom from '../utils/Dom';
import Events from '../utils/Events';

/**
 * AppBar - the main toolbar for the application
 */
class AppBar extends Component {
  /**
   * Set accepted properties
   */
  static propTypes = {
    onNavBtnClick: PropTypes.func,
    className: PropTypes.string,
    iconElementLeft: PropTypes.element,
    iconElementRight: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array
    ]),
    title: PropTypes.node,
    zDepth: PropTypes.number,
    fixed: PropTypes.bool
  };

  /**
   * Set property defaults
   */
  static defaultProps = {
    title: '',
    zDepth: 1,
    fixed: false
  };

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
    chamelTheme: PropTypes.object
  };

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call paprent constructor
    super(props);

    this.state = {
      startTopOffset: 0,
      startWidth: 0,
      curTopOffset: -1
    }
  }

  componentDidMount() {
    // If we are working with a device that supports status bar color, then set
    if (typeof cordova != "undefined" && typeof StatusBar != "undefined") {
      if (cordova.platformId == 'android') {
        // StatusBar.backgroundColorByHexString("#fff");
      }
    }

    // Save the original top position of the menu
    if (this.props.fixed) {
      let offset = Dom.offset(ReactDOM.findDOMNode(this.refs.appBarInnerCon));
      this.setState({
        startTopOffset: offset.top,
        startWidth: offset.width,
        startHeight: offset.height
      });

      // Now listen for window scroll events
      Events.on(window, 'scroll', this._onWindowScroll);
    }
  }

  componentWillUnmount() {
    // Remove window scroll event
    if (this.props.fixed) {
      Events.off(window, 'scroll', this._onWindowScroll);
    }
  }

  render() {
    // Determine which theme to use
    let theme = (this.context.chamelTheme && this.context.chamelTheme.appBar)
      ? this.context.chamelTheme.appBar : ThemeService.defaultTheme.appBar;

    let classes = theme.appBarOuter, elementCenter, menuElementLeft, menuElementRight;

    if (this.props.className) {
      classes += " " + this.props.className;
    }

    // Set the left elements
    if (this.props.iconElementLeft) {
      // Add any appBar custom styles to the icon
      let iconElementLeft = this._addAppBarStyleToElements(
        this.props.iconElementLeft, theme
      );

      menuElementLeft = (
        <div className={theme.appBarLeft}>
          {iconElementLeft}
        </div>
      );
    }

    // Set the right elements
    let rightElements = (this.props.iconElementRight) ? this.props.iconElementRight : null;

    // If right elements exists, wrap in a toolbar
    if (rightElements) {
      // Add any appBar custom styles to the icon
      rightElements = this._addAppBarStyleToElements(
        rightElements, theme
      );

      menuElementRight = (
        <div className={theme.appBarRight}>{rightElements}</div>
      )
    }

    // Add main content which is normally the title
    if (this.props.title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      elementCenter = toString.call(this.props.title) === '[object String]' ?
        <h1 className={theme.appBarCenter}>{this.props.title}</h1> :
        this.props.title;
    } else if (this.props.children) {
      elementCenter = (
        <div className={theme.appBarCenter}>{this.props.children}</div>
      );
    }

    // Get the zDepth passed - we may increment if we are floating
    let zDepth = this.props.zDepth;

    // Handle offset when the document scrolls and the appbar is fixed
    let innerConStyle = null;
    let outerConStyle = null;
    if (this.props.fixed && this.state.curTopOffset !== -1) {
      innerConStyle = {
        top: this.state.curTopOffset + "px",
        width: this.state.startWidth + "px",
        position: "fixed",
        zIndex: 100
      };

      /*
       * Set the outer con style since a fixed element will cause it to shrink
       * which makes the UX pretty bad when elements suddenly jump
       */
      outerConStyle = {height: this.state.startHeight + "px"}

      // Increment zDepth to indicate floating
      zDepth++;
    }

    return (
      <div style={outerConStyle}>
        <div style={innerConStyle}>
          <Paper ref="appBarInnerCon" rounded={false} className={classes} zDepth={zDepth}>
            {menuElementLeft}
            {elementCenter}
            {menuElementRight}
          </Paper>
        </div>
      </div>
    );
  }

  /**
   * Handle when the document is scrolled while the
   * The starting top of this menu was not 0 so it means
   * the menu is a fixed position and docked. A menu can be docked
   * below the top of the page (like below an AppBar) so we
   * want to be able to reposition the leftnav when the user scrolls
   * so it scrolls with the document until 0 (top)
   */
  _onWindowScroll = (e) => {

    // If the starting state was 0 then do nothing
    if (!this.props.fixed) {
      return;
    }

    // Get the scroll offset of the window
    let windowOffset = Dom.scrollOffset();

    /*
     * If we have scrolled, then follow the scroll.
     * Because the left nav div is position:fixed, then we
     * can move all the way to 0 to be at the top no matter how
     * far down the page they scroll
     */
    let newTop = this.state.startTopOffset - windowOffset.top;
    if (newTop < 0) {
      newTop = 0;
    }

    // Restore the original state if we are back in the viewport.
    if (windowOffset.top <= this.state.startTopOffset) {
      newTop = -1; // Reset
    }

    // Set state
    this.setState({curTopOffset: newTop})
  };

  /**
   * Add appBar specific styles to elements
   *
   * @param {ReactElement} element
   * @param {Object} theme
   * @private
   * @return {ReactElement} Cloned element plus appbar style
   */
  _addAppBarStyleToElements = (element, theme) => {
    // If an array, iterate over it for each element
    if (Array.isArray(element)) {
      for (let i in element) {
        // Apply any appBar custom styles to the elements
        element[i] = this._addAppBarStyleToElements(
          element[i], theme
        );
      }
      return element;
    } else {
      // If this is not a react element, just return whatever we got
      if (!element.type) {
        return element;
      }

      // Get existing className
      let className = (element.props.className) ? element.props.className : "";

      /*
       * If the element is supported, then clone a new element and
       * append appBar special class to the className
       */
      switch (element.type.name) {
        case 'IconButton':
        case 'SelectButton':
          return React.cloneElement(element, {
            className: className + " " + theme.appBarIconButton
          });
        case 'Button':
        default:
          return React.cloneElement(element, {
            className: className + " " + theme.button
          })
      }
    }
  }
}

export default AppBar;
