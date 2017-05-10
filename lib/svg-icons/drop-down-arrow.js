'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _svgIcon = require('./svg-icon');

var _svgIcon2 = _interopRequireDefault(_svgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropDownArrow = function DropDownArrow(props) {

  return _react2.default.createElement(
    _svgIcon2.default,
    props,
    _react2.default.createElement('polygon', { points: '7,9.5 12,14.5 17,9.5 ' })
  );
};

exports.default = DropDownArrow;
module.exports = exports['default'];