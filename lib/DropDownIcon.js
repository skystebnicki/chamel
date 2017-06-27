'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _KeyLine = require('./utils/KeyLine');

var _KeyLine2 = _interopRequireDefault(_KeyLine);

var _Paper = require('./Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _FontIcon = require('./FontIcon/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Menu = require('./Menu/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Popover = require('./Popover/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _ChamelThemeService = require('./styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Component for displaying dropdowns from an icon
 */
var DropDownIcon = function (_Component) {
  _inherits(DropDownIcon, _Component);

  /**
   * Class constructor takes properties and passes them to the parent/super
   */
  function DropDownIcon(props) {
    _classCallCheck(this, DropDownIcon);

    var _this = _possibleConstructorReturn(this, (DropDownIcon.__proto__ || Object.getPrototypeOf(DropDownIcon)).call(this, props));

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


  /**
   * An alternate theme may be passed down by a provider
   */


  _createClass(DropDownIcon, [{
    key: 'render',
    value: function render() {
      // Determine which theme to use
      var theme = _ChamelThemeService2.default.defaultTheme.dropDownIcon;

      var classes = theme['chamel-drop-down-icon'];
      if (this.state.open) {
        classes += " " + theme['chamel-open'];
      }

      var icon = void 0;
      if (this.props.iconClassName) {
        icon = _react2.default.createElement(_FontIcon2.default, { className: this.props.iconClassName });
      }

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          'div',
          { className: theme['chamel-menu-control'], onClick: this._onControlClick },
          icon,
          this.props.children
        ),
        _react2.default.createElement(
          _Popover2.default,
          {
            open: this.state.open,
            anchorEl: this.state.anchorEl,
            anchorOrigin: { horizontal: 'left', vertical: 'top' },
            onRequestClose: this._handleRequestClose,
            pushToLeft: this.props.pushToLeft,
            relative: true
          },
          _react2.default.createElement(_Menu2.default, {
            ref: 'menuItems',
            menuItems: this.props.menuItems,
            onItemClick: this._onMenuItemClick })
        )
      );
    }
  }]);

  return DropDownIcon;
}(_react.Component);

/**
 * Set accepted properties
 */


DropDownIcon.contextTypes = {
  chamelTheme: _propTypes2.default.object
};
DropDownIcon.propTypes = {
  autoWidth: _propTypes2.default.bool,
  selectedIndex: _propTypes2.default.number,
  onChange: _propTypes2.default.func,
  menuItems: _propTypes2.default.array.isRequired,
  closeOnMenuItemClick: _propTypes2.default.bool,
  pushToLeft: _propTypes2.default.bool
};

/**
 * Set property defaults
 */
DropDownIcon.defaultProps = {
  autoWidth: true,
  closeOnMenuItemClick: true,
  pushToLeft: false
};

exports.default = DropDownIcon;
module.exports = exports['default'];