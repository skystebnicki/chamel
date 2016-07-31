'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Classable = require('./mixins/classable');
var ClickAwayable = require('./mixins/ClickAwayable');
var KeyLine = require('./utils/KeyLine');
var Paper = require('./Paper');
var FontIcon = require('./FontIcon');
var Menu = require('./menu/Menu');


/**
 * Component for displaying dropdowns from an icon
 */

var DropDownIcon = function (_React$Component) {
  _inherits(DropDownIcon, _React$Component);

  /**
   * Class constructor takes properties and passes them to the parent/super
   */

  function DropDownIcon(props) {
    _classCallCheck(this, DropDownIcon);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DropDownIcon).call(this, props));

    _this._onControlClick = function (e) {
      e.preventDefault();

      _this.setState({
        open: _this.state.open ? false : true,
        anchorEl: e.currentTarget
      });
    };

    _this._onMenuItemClick = function (e, key, payload) {
      if (_this.props.onChange) _this.props.onChange(e, key, payload);

      if (_this.props.closeOnMenuItemClick) {
        _this.setState({ open: false });
      }
    };

    _this._handleRequestClose = function (e) {
      _this.setState({
        open: false
      });
    };

    _this.state = {
      open: false,
      anchorEl: null,
      selectedIndex: props.selectedIndex || 0
    };
    return _this;
  }

  /**
   * Render Componenent
   */


  _createClass(DropDownIcon, [{
    key: 'render',
    value: function render() {
      var classes = 'chamel-drop-down-icon';
      if (this.state.open) {
        classes += " chamel-open";
      }

      var icon;
      if (this.props.iconClassName) {
        icon = _react2.default.createElement(FontIcon, { className: this.props.iconClassName });
      }

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          'div',
          { className: 'chamel-menu-control', onClick: this._onControlClick },
          icon,
          this.props.children
        ),
        _react2.default.createElement(
          _Popover2.default,
          {
            open: this.state.open,
            anchorEl: this.state.anchorEl,
            anchorOrigin: { horizontal: 'left', vertical: 'top' },
            onRequestClose: this._handleRequestClose
          },
          _react2.default.createElement(Menu, {
            ref: 'menuItems',
            menuItems: this.props.menuItems,
            onItemClick: this._onMenuItemClick })
        )
      );
    }
  }]);

  return DropDownIcon;
}(_react2.default.Component);

;

/**
 * Set accepted properties
 */
DropDownIcon.propTypes = {
  autoWidth: _react2.default.PropTypes.bool,
  selectedIndex: _react2.default.PropTypes.number,
  onChange: _react2.default.PropTypes.func,
  menuItems: _react2.default.PropTypes.array.isRequired,
  closeOnMenuItemClick: _react2.default.PropTypes.bool
};

/**
 * Set property defaults
 */
DropDownIcon.defaultProps = {
  autoWidth: true,
  closeOnMenuItemClick: true
};

// Check for commonjs
if (module) {
  module.exports = DropDownIcon;
}

exports.default = DropDownIcon;
module.exports = exports['default'];