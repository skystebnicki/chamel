import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Paper from '../Paper/Paper';
import Overlay from '../Overlay/Overlay';
import Dom from '../utils/Dom';
import Events from '../utils/Events';
import classnames from 'classnames';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Navigation drawer component
 */
class Drawer extends Component {
  /**
   * Set accepted properties
   */
  static propTypes = {
    /**
     * Flag to indicate if the drawer is open
     */
    open: PropTypes.bool,

    /**
     * If permanent we cannot close the drawer
     */
    permanent: PropTypes.bool,

    /**
     * If permanent and clipped then the drawer will show up under the appBar
     */
    clipped: PropTypes.bool,

    /**
     * Optional element to anchor the meny to
     */
    anchorEl: PropTypes.object,

    /**
     * Callback any time the menu should close
     */
    onClose: PropTypes.func,

    /**
     * Which side to display the drawer on
     *
     * Options
     * left: primary and default navigation
     * right: secondary right side navigation
     */
    side: PropTypes.oneOf(['left', 'right']),
  };

  /**
   * Set property defaults
   */
  static defaultProps = {
    open: false,
    permanent: false,
    clipped: false,
    anchorEl: null,
    side: 'left',
  };

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
    chamelTheme: PropTypes.object,
  };

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call parent constructor
    super(props);

    this.state = {
      open: this.props.permanent,
      selected: '',
      startTopOffset: 0,
      curTopOffset: -1,
      height: null,
    };
  }

  componentDidMount() {
    // Save the original top position of the menu
    let offset = Dom.offset(ReactDOM.findDOMNode(this.refs.clickAwayableElement));
    if (offset.top > 0) {
      this.setState({
        startTopOffset: offset.top,
      });
    }

    // Listen for window scroll events
    Events.on(window, 'scroll', this.positionFixed);
  }

  componentWillUnmout() {
    Events.off(window, 'scroll', this.positionFixed);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open != this.props.open) {
      let isOpen = nextProps.open;
      // Ignore open if permanent is set
      if (nextProps.permanent) {
        isOpen = true;
      }
      this.setState({ open: isOpen });
    }
  }

  render() {
    // Determine which theme to use
    let theme =
      this.context.chamelTheme && this.context.chamelTheme.drawer
        ? this.context.chamelTheme.drawer
        : ThemeService.defaultTheme.drawer;

    // Set the classes
    const classes = classnames(
      theme.drawer,
      {
        [theme.drawerClosed]: !this.props.open && !this.state.open,
        [theme.drawerClipped]: this.props.clipped,
        [theme.drawerPermanent]: this.props.permanent,
        [theme.drawerFloating]: !this.props.permanent,
        [theme.drawerTransparent]: this.props.zIndex == 0,
      },
      this.props.className,
    );

    let overlay;

    if (!this.props.permanent)
      overlay = (
        <Overlay show={this.props.open || this.state.open} onClick={this._onOverlayTouchTap} />
      );

    // Determine the depth of the background
    let zDept = this.props.permanent ? 0 : 2;

    // Handle offset when the document scrolls and the menu is not already at the top
    let topStyle = {};
    if (this.state.startTopOffset > 0 && this.state.curTopOffset !== -1) {
      topStyle.top = this.state.curTopOffset + 'px';
    }

    // Manually set the height
    const heightToUse = this.getHeight();
    if (heightToUse > 0) {
      topStyle.height = heightToUse + 'px';
    }

    return (
      <div>
        {overlay}
        <Paper
          style={topStyle}
          ref="clickAwayableElement"
          className={classes}
          zDepth={zDept}
          rounded={false}
        >
          {this.props.children}
        </Paper>
      </div>
    );
  }

  _onOverlayTouchTap = () => {
    if (this.props.onClose) this.props.onClose();
  };

  _onWindowKeyUp = e => {
    if (e.keyCode == KeyCode.ESC && !this.props.permanent && this.state.open) {
      this.close();
    }
  };

  /**
   * Handle when the document is scrolled while the
   * The starting top of this menu was not 0 so it means
   * the menu is a fixed position and permanent. A menu can be permanent
   * below the top of the page (like below an AppBar) so we
   * want to be able to reposition the leftnav when the user scrolls
   * so it scrolls with the document until 0 (top)
   */
  positionFixed = e => {
    // Only adjust if mounted AND open
    if (!window || !this.state.open) {
      return 0;
    }

    // Get the scroll offset of the window
    let windowOffset = Dom.scrollOffset();
    let drawerStartTop = this.state.startTopOffset;

    // Get startTopOffset if this is the first run
    if (this.state.curTopOffset == -1) {
      const drawerOffset = Dom.offset(ReactDOM.findDOMNode(this.refs.clickAwayableElement));
      drawerStartTop = drawerOffset.top;
    }

    /*
     * If we have scrolled, then follow the scroll.
     * Because the left nav div is position:fixed, then we
     * can move all the way to 0 to be at the top no matter how
     * far down the page they scroll
     */
    let newTop = drawerStartTop - windowOffset.top;
    if (newTop < 0) {
      newTop = 0;
    }

    // It should never ever be less than the original offset
    if (windowOffset.top === 0 && newTop < drawerStartTop) {
      newTop = -1; // Reset
    }

    // Recalculate height
    const height = newTop > 0 ? window.innerHeight - newTop : null;

    // Set state without transition to make the scroll faster
    Dom.withoutTransition(
      ReactDOM.findDOMNode(this.refs.clickAwayableElement),
      function setOffsetTopState() {
        this.setState({
          curTopOffset: newTop,
          startTopOffset: drawerStartTop,
          height: height,
        });
      }.bind(this),
    );
  };

  /**
   * Determine the height needed based on props
   */
  getHeight() {
    // Only adjust if mounted AND open
    if (!window || !this.state.open) {
      return 0;
    }

    let height = window.innerHeight;
    if (this.state.curTopOffset > 0) {
      height -= this.state.curTopOffset;
    }

    return height;
  }

  /**
   * Toggle this opened and closed
   */
  toggle() {
    this.setState({ open: !this.state.open });
  }
}

export default Drawer;
