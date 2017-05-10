'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FontIcon = require('../../FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _ChamelThemeService = require('../../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SettingsApplication button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
var SettingsApplicationIcon = function SettingsApplicationIcon(props, context) {
    var theme = context.chamelTheme && context.chamelTheme.fontIcon ? context.chamelTheme.fontIcon : _ChamelThemeService2.default.defaultTheme.fontIcon;

    return _react2.default.createElement(
        _FontIcon2.default,
        _extends({}, props, { className: theme.iconSettingsApplication }),
        "settings_applications"
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
SettingsApplicationIcon.contextTypes = {
    chamelTheme: _propTypes2.default.object
};

exports.default = SettingsApplicationIcon;
module.exports = exports['default'];