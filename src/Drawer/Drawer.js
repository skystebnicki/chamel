import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Paper from '../Paper/Paper';
import Overlay from '../Overlay/Overlay';
import Dom from '../utils/Dom';
import classnames from 'classnames';
import ThemeService from '../styles/ChamelThemeService';
import KeyCode from '../utils/KeyCode';

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

    /**
     * Optioanl class name override
     */
    className: PropTypes.string,

    /**
     * Optioanl zIndex to load for the drawer - defautls to 200 in CSS
     */
    zIndex: PropTypes.number,

    /**
     * Child elements to be rendered into the Drawer
     */
    children: PropTypes.node,
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
      curTopOffset: -1,
    };
  }

  /**
   * Called once the drawer enters the DOM
   */
  componentDidMount() {
    this.updateOffsetFromTop();
  }

  /**
   * Handle changes needed before changes to props are applied
   * 
   * @param {Object} nextProps 
   */
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

  /**
   * Component props changed
   */
  componentDidUpdate() {
    if (this.state.curTopOffset === -1) {
      this.updateOffsetFromTop();
    }
  }

  /**
   * Render the component
   */
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
   * Determine the height needed based on props
   */
  getHeight() {
    // Only adjust if mounted AND open
    if (!window || !this.state.open) {
      return 0;
    }

    let height = window.innerHeight;

    // Get the offset if the drawer is clipped
    if (this.props.clipped && this.state.curTopOffset) {
      height -= this.state.curTopOffset;
    }

    return height;
  }

  /**
   * Any time the offset of the drawer from the top of the page changed we should update it
   */
  updateOffsetFromTop() {
    // Only adjust if mounted, open, and clipped
    if (!window || !this.state.open || !this.props.clipped) {
      return;
    }

    const drawerOffset = Dom.offset(ReactDOM.findDOMNode(this.refs.clickAwayableElement));
    if (drawerOffset.top > 0) {
      this.setState({
        curTopOffset: drawerOffset.top,
      });
    }
  }

  /**
   * Toggle this opened and closed
   */
  toggle() {
    this.setState({ open: !this.state.open });
  }
}

export default Drawer;
