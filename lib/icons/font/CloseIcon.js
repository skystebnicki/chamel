'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FontIcon = require('../../FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
var CloseIcon = function CloseIcon(props, context) {
    var theme = context.chamelTheme && context.chamelTheme.fontIcons ? context.chamelTheme.fontIcons : {};

    return _react2.default.createElement(_FontIcon2.default, _extends({}, props, { className: theme.iconClose }));
};

/**
 * An alternate theme may be passed down by a provider
 */
CloseIcon.contextTypes = {
    chamelTheme: _react2.default.PropTypes.object
};

exports.default = CloseIcon;
module.exports = exports['default'];