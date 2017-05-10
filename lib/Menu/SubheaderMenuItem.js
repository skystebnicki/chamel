'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubheaderMenuItem = function SubheaderMenuItem(props, context) {
  var theme = context.chamelTheme && context.chamelTheme.menu ? context.chamelTheme.menu : _ChamelThemeService2.default.defaultTheme.menu;

  return _react2.default.createElement(
    'div',
    { key: props.index, className: theme.menuSubheader },
    props.text
  );
};

SubheaderMenuItem.propTypes = {
  index: _propTypes2.default.number.isRequired,
  text: _propTypes2.default.string.isRequired
};

exports.default = SubheaderMenuItem;
module.exports = exports['default'];