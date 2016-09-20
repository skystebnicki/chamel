'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Paper = require('../Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Overlay = require('../Overlay/Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _Dom = require('../utils/Dom');

var _Dom2 = _interopRequireDefault(_Dom);

var _Events = require('../utils/Events');

var _Events2 = _interopRequireDefault(_Events);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Navigation drawer component
 */
var Drawer = function (_React$Component) {
  _inherits(Drawer, _React$Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */


  /**
   * Set property defaults
   */
  function Drawer(props) {
    _classCallCheck(this, Drawer);

    var _this = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, props));
    // Call parent constructor


    _this._onOverlayTouchTap = function () {
      if (_this.props.onClose) _this.props.onClose();
    };

    _this._onWindowKeyUp = function (e) {
      if (e.keyCode == KeyCode.ESC && !_this.props.permanent && _this.state.open) {
        _this.close();
      }
    };

    _this._onWindowScroll = function (e) {

      // If the starting state was 0 then do nothing
      if (_this.state.startTopOffset == 0) {
        return;
      }

      // Get the scroll offset of the window
      var windowOffset = _Dom2.default.scrollOffset();

      var drawerStartTop = _this.state.startTopOffset;

      // Get startTopOffset if this is the first run
      if (_this.state.curTopOffset == -1) {
        var drawerOffset = _Dom2.default.offset(_reactDom2.default.findDOMNode(_this.refs.clickAwayableElement));
        drawerStartTop = drawerOffset.top;
      }

      /*
       * If we have scrolled, then follow the scroll.
       * Because the left nav div is position:fixed, then we
       * can move all the way to 0 to be at the top no matter how
       * far down the page they scroll
       */
      var newTop = drawerStartTop - windowOffset.top;
      if (newTop < 0) {
        newTop = 0;
      }

      // It should never ever be less than the original offset
      if (windowOffset.top === 0 && newTop < drawerStartTop) {
        newTop = -1; // Reset
      }

      // Recalculate height
      var height = newTop > 0 ? window.innerHeight - newTop : null;

      // Set state without transition to make the scroll faster
      _Dom2.default.withoutTransition(_reactDom2.default.findDOMNode(_this.refs.clickAwayableElement), function setOffsetTopState() {
        this.setState({
          curTopOffset: newTop,
          startTopOffset: drawerStartTop,
          height: height
        });
      }.bind(_this));
    };

    _this.state = {
      open: _this.props.permanent,
      selected: "",
      startTopOffset: 0,
      curTopOffset: -1,
      height: null
    };
    return _this;
  }

  /**
   * An alternate theme may be passed down by a provider
   */


  /**
   * Set accepted properties
   */


  _createClass(Drawer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      // Save the original top position of the menu
      if (this.state.open) {
        var offset = _Dom2.default.offset(_reactDom2.default.findDOMNode(this.refs.clickAwayableElement));
        if (offset.top > 0) {
          this.setState({
            startTopOffset: offset.top,
            height: window.innerHeight - offset.top
          });

          // Now listen for window scroll events
          _Events2.default.on(window, 'scroll', this._onWindowScroll);
        }
      }
    }
  }, {
    key: 'componentWillUnmout',
    value: function componentWillUnmout() {
      if (this.state.startTopOffset > 0) {
        _Events2.default.off(window, 'scroll', this._onWindowScroll);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.drawer ? this.context.chamelTheme.drawer : _ChamelThemeService2.default.defaultTheme.drawer;

      // Set the classes
      var classes = (0, _classnames3.default)(theme.drawer, (_classnames = {}, _defineProperty(_classnames, theme.drawerClosed, !this.props.open && !this.state.open), _defineProperty(_classnames, theme.drawerClipped, this.props.clipped), _defineProperty(_classnames, theme.drawerPermanent, this.props.permanent), _defineProperty(_classnames, theme.drawerFloating, !this.props.permanent), _defineProperty(_classnames, theme.drawerTransparent, this.props.zIndex == 0), _classnames), this.props.className);

      var overlay = void 0;

      if (!this.props.permanent) overlay = _react2.default.createElement(_Overlay2.default, { show: this.props.open || this.state.open, onClick: this._onOverlayTouchTap });

      // Determine the depth of the background
      var zDept = this.props.permanent ? 0 : 2;

      // Handle offset when the document scrolls and the menu is not already at the top
      var topStyle = {};
      if (this.state.startTopOffset > 0 && this.state.curTopOffset !== -1) {
        topStyle.top = this.state.curTopOffset + "px";
      }

      // Manually set the height
      if (this.state.height) {
        topStyle.height = this.state.height + "px";
      }

      return _react2.default.createElement(
        'div',
        null,
        overlay,
        _react2.default.createElement(
          _Paper2.default,
          {
            style: topStyle,
            ref: 'clickAwayableElement',
            className: classes,
            zDepth: zDept,
            rounded: false },
          this.props.children
        )
      );
    }

    /**
     * Handle when the document is scrolled while the 
     * The starting top of this menu was not 0 so it means
     * the menu is a fixed position and permanent. A menu can be permanent
     * below the top of the page (like below an AppBar) so we
     * want to be able to reposition the leftnav when the user scrolls
     * so it scrolls with the document until 0 (top)
     */

  }, {
    key: 'toggle',


    /**
     * Toggle this opened and closed
     */
    value: function toggle() {
      this.setState({ open: !this.state.open });
    }
  }]);

  return Drawer;
}(_react2.default.Component);

Drawer.propTypes = {
  /**
   * Flag to indicate if the drawer is open
   */
  open: _react2.default.PropTypes.bool,

  /**
   * If permanent we cannot close the drawer
   */
  permanent: _react2.default.PropTypes.bool,

  /**
   * If permanent and clipped then the drawer will show up under the appBar
   */
  clipped: _react2.default.PropTypes.bool,

  /**
   * A permanent and floating permanent menu will show up on the 
   * left without a background color
   */
  floating: _react2.default.PropTypes.bool,

  /**
   * Optional element to anchor the meny to
   */
  anchorEl: _react2.default.PropTypes.object,

  /**
   * Callback any time the menu should close
   */
  onClose: _react2.default.PropTypes.func,

  /**
   * Which side to display the drawer on
   * 
   * Options
   * left: primary and default navigation
   * right: secondary right side navigation
   */
  side: _react2.default.PropTypes.oneOf(['left', 'right'])
};
Drawer.defaultProps = {
  open: false,
  permanent: false,
  clipped: false,
  anchorEl: null,
  floating: false,
  side: 'left'
};
Drawer.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};
exports.default = Drawer;
module.exports = exports['default'];