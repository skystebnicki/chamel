'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FontIcon = require('../../FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _ChamelThemeService = require('../../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MoreVertIcon = function MoreVertIcon(props, context) {
  var theme = context.chamelTheme && context.chamelTheme.fontIcon ? context.chamelTheme.fontIcon : _ChamelThemeService2.default.defaultTheme.fontIcon;

  return _react2.default.createElement(
    _FontIcon2.default,
    _extends({}, props, { className: theme.iconMoreVert }),
    "more_vert"
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
MoreVertIcon.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};

exports.default = MoreVertIcon;
module.exports = exports['default'];