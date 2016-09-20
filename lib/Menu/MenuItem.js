'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FontIcon = require('../FontIcon/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Toggle = require('../Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

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

var MenuItem = function (_React$Component) {
    _inherits(MenuItem, _React$Component);

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

            var theme = this.context.chamelTheme && this.context.chamelTheme.menu ? this.context.chamelTheme.menu : {};

            var classes = (0, _classnames3.default)(theme.menuItem, (_classnames = {}, _defineProperty(_classnames, theme.menuItemSelected, this.props.selected), _defineProperty(_classnames, theme.menuItemFocused, this.props.focused), _defineProperty(_classnames, theme.menuItemDisabled, this.props.disabled), _classnames));
            var icon;
            var data;
            var iconRight;
            var attribute;
            var number;
            var toggle;

            if (this.props.selected) console.log("Selected", theme);

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
                var _props = this.props;
                var toggle = _props.toggle;
                var onClick = _props.onClick;
                var onToggle = _props.onToggle;
                var children = _props.children;
                var label = _props.label;

                var other = _objectWithoutProperties(_props, ['toggle', 'onClick', 'onToggle', 'children', 'label']);

                toggle = _react2.default.createElement(_Toggle2.default, _extends({}, other, { onToggle: this._handleToggle }));
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
}(_react2.default.Component);

/**
 * Set accepted properties
 */


MenuItem.Types = Types;
MenuItem.propTypes = {
    index: _react2.default.PropTypes.number,
    iconClassName: _react2.default.PropTypes.string,
    iconRightClassName: _react2.default.PropTypes.string,
    attribute: _react2.default.PropTypes.string,
    number: _react2.default.PropTypes.string,
    data: _react2.default.PropTypes.string,
    toggle: _react2.default.PropTypes.bool,
    disabled: _react2.default.PropTypes.bool,
    onClick: _react2.default.PropTypes.func,
    onToggle: _react2.default.PropTypes.func,
    selected: _react2.default.PropTypes.bool,
    indent: _react2.default.PropTypes.number
};

/**
 * Set property defaults
 */
MenuItem.defaultProps = {
    toggle: false,
    disabled: false,
    index: -1
};

/**
 * An alternate theme may be passed down by a provider
 */
MenuItem.contextTypes = {
    chamelTheme: _react2.default.PropTypes.object
};

exports.default = MenuItem;
module.exports = exports['default'];