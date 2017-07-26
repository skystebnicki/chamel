'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FontIcon = require('../FontIcon/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Switch = require('../Toggle/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Types = {
  LINK: 'LINK',
  SUBHEADER: 'SUBHEADER',
  NESTED: 'NESTED'
};

var MenuItem = function (_Component) {
  _inherits(MenuItem, _Component);

  function MenuItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MenuItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call.apply(_ref, [this].concat(args))), _this), _this._handleTouchTap = function (e) {
      if (!_this.props.disabled && _this.props.onClick) {
        _this.props.onClick(e, _this.props.index);
      } else if (!_this.props.disabled && _this.props.onClick) {
        _this._handleOnClick(e);
      }
    }, _this._handleOnClick = function (e) {
      if (!_this.props.disabled && _this.props.onClick) _this.props.onClick(e, _this.props.index);
    }, _this._handleToggle = function (e, toggled) {
      if (!_this.props.disabled && _this.props.onToggle) _this.props.onToggle(e, _this.props.index, toggled);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MenuItem, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var theme = this.context.chamelTheme && this.context.chamelTheme.menu ? this.context.chamelTheme.menu : _ChamelThemeService2.default.defaultTheme.menu;

      var classes = (0, _classnames3.default)(theme.menuItem, (_classnames = {}, _defineProperty(_classnames, theme.menuItemSelected, this.props.selected), _defineProperty(_classnames, theme.menuItemFocused, this.props.focused), _defineProperty(_classnames, theme.menuItemDisabled, this.props.disabled), _classnames));
      var icon = void 0;
      var data = void 0;
      var iconRight = void 0;
      var attribute = void 0;
      var number = void 0;
      var toggle = void 0;

      if (this.props.iconClassName) {
        icon = _react2.default.createElement(_FontIcon2.default, { className: theme.menuItemIcon + ' ' + this.props.iconClassName });
      }
      if (this.props.iconRightClassName) {
        iconRight = _react2.default.createElement(_FontIcon2.default, { className: theme.menuItemIconRight + ' ' + this.props.iconRightClassName });
      }
      if (this.props.data) {
        data = _react2.default.createElement(
          'span',
          { className: theme.menuItemData },
          this.props.data
        );
      }
      if (this.props.number !== undefined) {
        number = _react2.default.createElement(
          'span',
          { className: theme.menuItemNumber },
          this.props.number
        );
      }
      if (this.props.attribute !== undefined) {
        attribute = _react2.default.createElement(
          'span',
          { className: theme.menuItemAttribute },
          this.props.attribute
        );
      }

      // Add indentations for hierarchical menus
      var numIndents = this.props.indent || 0;
      var indentItems = numIndents ? [] : null;
      for (var i = 0; i < numIndents; i++) {
        indentItems.push(_react2.default.createElement(
          'span',
          { className: theme.menuItemIndent, key: i },
          " "
        ));
      }

      if (this.props.toggle) {
        var _props = this.props,
            _toggle = _props.toggle,
            onClick = _props.onClick,
            onToggle = _props.onToggle,
            children = _props.children,
            label = _props.label,
            other = _objectWithoutProperties(_props, ['toggle', 'onClick', 'onToggle', 'children', 'label']);

        _toggle = _react2.default.createElement(_Switch2.default, _extends({}, other, { onChange: this._handleToggle }));
      }

      return _react2.default.createElement(
        'div',
        {
          key: this.props.index,
          className: classes,
          onClick: this._handleOnClick },
        indentItems,
        icon,
        this.props.children,
        data,
        attribute,
        number,
        toggle,
        iconRight
      );
    }
  }]);

  return MenuItem;
}(_react.Component);

/**
 * Set accepted properties
 */


MenuItem.Types = Types;
MenuItem.propTypes = {
  index: _propTypes2.default.number,
  iconClassName: _propTypes2.default.string,
  iconRightClassName: _propTypes2.default.string,
  attribute: _propTypes2.default.string,
  number: _propTypes2.default.string,
  data: _propTypes2.default.string,
  toggle: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  onToggle: _propTypes2.default.func,
  selected: _propTypes2.default.bool,
  indent: _propTypes2.default.number

  /**
   * Set property defaults
   */
};MenuItem.defaultProps = {
  toggle: false,
  disabled: false,
  index: -1

  /**
   * An alternate theme may be passed down by a provider
   */
};MenuItem.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

exports.default = MenuItem;
module.exports = exports['default'];