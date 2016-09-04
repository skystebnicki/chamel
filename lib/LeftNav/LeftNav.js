'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Paper = require('../Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Overlay = require('../Overlay/Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _Menu = require('../Menu/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Dom = require('../utils/Dom');

var _Dom2 = _interopRequireDefault(_Dom);

var _Events = require('../utils/Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Small application component
 */
var LeftNav = _react2.default.createClass({
  displayName: 'LeftNav',


  //mixins: [Classable, WindowListenable],

  propTypes: {
    docked: _react2.default.PropTypes.bool,
    header: _react2.default.PropTypes.element,
    onChange: _react2.default.PropTypes.func,
    menuItems: _react2.default.PropTypes.array.isRequired,
    modules: _react2.default.PropTypes.array,
    selectedIndex: _react2.default.PropTypes.number
  },

  windowListeners: {
    'keyup': '_onWindowKeyUp'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      docked: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      open: this.props.docked,
      selected: "",
      startTopOffset: 0,
      curTopOffset: -1
    };
  },

  toggle: function toggle() {
    this.setState({ open: !this.state.open });
    return this;
  },

  close: function close() {
    this.setState({ open: false });
    return this;
  },

  open: function open() {
    this.setState({ open: true });
    return this;
  },

  componentDidMount: function componentDidMount() {

    // Save the original top position of the menu
    if (this.state.open) {
      var offset = _Dom2.default.offset(_reactDom2.default.findDOMNode(this.refs.clickAwayableElement));
      if (offset.top > 0) {
        this.setState({ startTopOffset: offset.top });

        // Now listen for window scroll events
        _Events2.default.on(window, 'scroll', this._onWindowScroll);
      }
    }
  },

  componentWillUnmout: function componentWillUnmout() {
    if (this.sate.startTopOffset > 0) {
      _Events2.default.off(window, 'scroll', this._onWindowScroll);
    }
  },

  render: function render() {
    // Set the classes
    var classes = "chamel-left-nav";
    if (!this.state.open) {
      classes += " chamel-closed";
    }

    classes += this.props.docked ? " chamel-docked" : " chamel-floating";

    var selectedIndex = this.props.selectedIndex,
        overlay;

    if (!this.props.docked) overlay = _react2.default.createElement(_Overlay2.default, { show: this.state.open, onClick: this._onOverlayTouchTap });

    // Set the index based on the selected route if the selectedIndex was not passed as prop
    if (this.state.selected && selectedIndex === undefined) {
      selectedIndex = null;
      for (var i = 0; i < this.props.menuItems.length; i++) {

        // Put in variables for readability
        var selected = this.state.selected;
        var route = this.props.menuItems[i].route;

        // Selected could extend beyond the route path since a route can be
        // multiple levels deep like /my/path/to/100
        if (selected.length >= route.length) {
          if (selected.substring(0, route.length) == route) {
            selectedIndex = i;
          }
        }

        //var sltd =  ? "*" : "";
        //items.push(<div onClick={this._sendClick.bind(null, i)}>{this.props.menuItems[i].name} {sltd}</div>);
      }
    }

    var zDept = this.props.docked ? 0 : 2;

    // Handle offset when the document scrolls and the menu is not already at the top
    var topStyle = null;
    if (this.state.startTopOffset > 0 && this.state.curTopOffset !== -1) {
      topStyle = { top: this.state.curTopOffset + "px" };
    }

    return _react2.default.createElement(
      'div',
      { className: classes },
      overlay,
      _react2.default.createElement(
        _Paper2.default,
        {
          style: topStyle,
          ref: 'clickAwayableElement',
          className: 'chamel-left-nav-menu',
          zDepth: zDept,
          rounded: false },
        this.props.header,
        _react2.default.createElement(_Menu2.default, {
          ref: 'menuItems',
          zDepth: 0,
          menuItems: this.props.menuItems,
          selectedIndex: selectedIndex,
          onItemClick: this._onMenuItemClick })
      )
    );
  },

  /**
   * Temp click sender to this.onMenuItemClick
   */
  _sendClick: function _sendClick(i) {
    this._onMenuItemClick(null, i, this.props.menuItems[i]);
  },

  /** 
   * When the menu fires onItemClick it will pass the index and the item data as payload
   *
   * @param {Event} e
   * @param {int} key The index or unique key of the menu entry
   * @param {Object} payload the meny item object
   */
  _onMenuItemClick: function _onMenuItemClick(e, key, payload) {
    if (!this.props.docked) this.close();
    if (this.props.onChange && this.props.selectedIndex !== key) {
      this.props.onChange(e, key, payload);
    }
  },

  _onOverlayTouchTap: function _onOverlayTouchTap() {
    this.close();
  },

  _onWindowKeyUp: function _onWindowKeyUp(e) {
    if (e.keyCode == KeyCode.ESC && !this.props.docked && this.state.open) {
      this.close();
    }
  },

  /**
   * Handle when the document is scrolled while the 
   * The starting top of this menu was not 0 so it means
   * the menu is a fixed position and docked. A menu can be docked
   * below the top of the page (like below an AppBar) so we
   * want to be able to reposition the leftnav when the user scrolls
   * so it scrolls with the document until 0 (top)
   */
  _onWindowScroll: function _onWindowScroll(e) {

    // If the starting state was 0 then do nothing
    if (this.state.startTopOffset == 0) {
      return;
    }

    // Get the scroll offset of the window
    var windowOffset = _Dom2.default.scrollOffset();

    /*
     * If we have scrolled, then follow the scroll.
     * Because the left nav div is position:fixed, then we
     * can move all the way to 0 to be at the top no matter how
     * far down the page they scroll
     */
    var newTop = this.state.startTopOffset - windowOffset.top;
    if (newTop < 0) {
      newTop = 0;
    }

    // It should never ever be less than the original offset
    if (windowOffset.top === 0 && newTop < this.state.startTopOffset) {
      newTop = -1; // Reset
    }

    // Set state without transition to make the scroll faster
    _Dom2.default.withoutTransition(_reactDom2.default.findDOMNode(this.refs.clickAwayableElement), function setOffsetTopState() {
      this.setState({ curTopOffset: newTop });
    }.bind(this));
  }

});

// Check for commonjs
/**
 * LeftNav componenet
 */
if (module) {
  module.exports = LeftNav;
}

exports.default = LeftNav;
module.exports = exports['default'];