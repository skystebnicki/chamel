'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _svgIcon = require('./svg-icon');

var _svgIcon2 = _interopRequireDefault(_svgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavigationChevronLeft = function NavigationChevronLeft(props) {

  return _react2.default.createElement(
    _svgIcon2.default,
    undefined.props,
    _react2.default.createElement('path', { d: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' })
  );
};

exports.default = NavigationChevronLeft;
module.exports = exports['default'];