'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvgIcon = function SvgIcon(props) {

  return _react2.default.createElement(
    'svg',
    _extends({}, props, {
      className: 'chamel-svg-icon',
      viewBox: '0 0 24 24' }),
    props.children
  );
};

module.exports = SvgIcon;