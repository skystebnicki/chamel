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

var _Menu = require('../Menu/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Dom = require('../utils/Dom');

var _Dom2 = _interopRequireDefault(_Dom);

var _Events = require('../utils/Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Navigation drawer component
 */
var Drawer = function (_React$Component) {
  _inherits(Drawer, _React$Component);

  function Drawer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Drawer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call.apply(_ref, [this].concat(args))), _this), _this._sendClick = function (i) {
      _this._onMenuItemClick(null, i, _this.props.menuItems[i]);
    }, _this._onMenuItemClick = function (e, key, payload) {
      if (!_this.props.docked) _this.close();
      if (_this.props.onChange && _this.props.selectedIndex !== key) {
        _this.props.onChange(e, key, payload);
      }
    }, _this._onOverlayTouchTap = function () {
      _this.close();
    }, _this._onWindowKeyUp = function (e) {
      if (e.keyCode == KeyCode.ESC && !_this.props.docked && _this.state.open) {
        _this.close();
      }
    }, _this._onWindowScroll = function (e) {

      // If the starting state was 0 then do nothing
      if (_this.state.startTopOffset == 0) {
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
      var newTop = _this.state.startTopOffset - windowOffset.top;
      if (newTop < 0) {
        newTop = 0;
      }

      // It should never ever be less than the original offset
      if (windowOffset.top === 0 && newTop < _this.state.startTopOffset) {
        newTop = -1; // Reset
      }

      // Set state without transition to make the scroll faster
      _Dom2.default.withoutTransition(_reactDom2.default.findDOMNode(_this.refs.clickAwayableElement), function setOffsetTopState() {
        this.setState({ curTopOffset: newTop });
      }.bind(_this));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Drawer, [{
    key: 'getInitialState',
    value: function getInitialState() {
      return {
        open: this.props.docked,
        selected: "",
        startTopOffset: 0,
        curTopOffset: -1
      };
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.setState({ open: !this.state.open });
      return this;
    }
  }, {
    key: 'close',
    value: function close() {
      this.setState({ open: false });
      return this;
    }
  }, {
    key: 'open',
    value: function open() {
      this.setState({ open: true });
      return this;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      // Save the original top position of the menu
      if (this.state.open) {
        var offset = _Dom2.default.offset(_reactDom2.default.findDOMNode(this.refs.clickAwayableElement));
        if (offset.top > 0) {
          this.setState({ startTopOffset: offset.top });

          // Now listen for window scroll events
          _Events2.default.on(window, 'scroll', this._onWindowScroll);
        }
      }
    }
  }, {
    key: 'componentWillUnmout',
    value: function componentWillUnmout() {
      if (this.sate.startTopOffset > 0) {
        _Events2.default.off(window, 'scroll', this._onWindowScroll);
      }
    }
  }, {
    key: 'render',
    value: function render() {
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
    }

    /**
     * Temp click sender to this.onMenuItemClick
     */


    /** 
     * When the menu fires onItemClick it will pass the index and the item data as payload
     *
     * @param {Event} e
     * @param {int} key The index or unique key of the menu entry
     * @param {Object} payload the meny item object
     */


    /**
     * Handle when the document is scrolled while the 
     * The starting top of this menu was not 0 so it means
     * the menu is a fixed position and docked. A menu can be docked
     * below the top of the page (like below an AppBar) so we
     * want to be able to reposition the leftnav when the user scrolls
     * so it scrolls with the document until 0 (top)
     */

  }]);

  return Drawer;
}(_react2.default.Component);

/**
 * Set accepted properties
 */


Drawer.propTypes = {
  open: _react2.default.PropTypes.bool,
  docked: _react2.default.PropTypes.bool,
  anchorEl: _react2.default.PropTypes.object,
  header: _react2.default.PropTypes.element,
  onChange: _react2.default.PropTypes.func,

  /**
   * This is the point on the anchor where the popover
   * targetOrigin will stick to.
   * Options:
   * vertical: [top, middle, bottom]
   * horizontal: [left, center, right]
   */
  type: _react2.default.PropTypes.shape({
    side: _react2.default.PropTypes.oneOf(['left', 'right']),
    style: _react2.default.PropTypes.oneOf(['left', 'center', 'right'])
  }),

  /**
   * This is the point on the popover which will stick to
   * the anchors origin.
   * Options:
   * vertical: [top, middle, bottom]
   * horizontal: [left, center, right]
   */
  targetOrigin: _react2.default.PropTypes.shape({
    vertical: _react2.default.PropTypes.oneOf(['top', 'middle', 'bottom']),
    horizontal: _react2.default.PropTypes.oneOf(['left', 'center', 'right'])
  })
};

/**
 * Set property defaults
 */
Drawer.defaultProps = {
  open: false,
  anchorEl: null,
  docked: false,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left'
  }
};

// Check for commonjs
if (module) {
  module.exports = Drawer;
}

exports.default = Drawer;
module.exports = exports['default'];