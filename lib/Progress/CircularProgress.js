'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

var _prefixer = require('../utils/prefixer.js');

var _prefixer2 = _interopRequireDefault(_prefixer);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Progress = require('./Progress');

var _Progress2 = _interopRequireDefault(_Progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CircularProgress = function CircularProgress(props, context) {
  return _react2.default.createElement(_Progress2.default, _extends({ type: 'circular' }, props));
};

CircularProgress.PropTypes = {
  buffer: _react.PropTypes.number,
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  max: _react.PropTypes.number,
  min: _react.PropTypes.number,
  mode: _react.PropTypes.oneOf(['determinate', 'indeterminate']),
  multicolor: _react.PropTypes.bool,
  value: _react.PropTypes.number
};

exports.default = CircularProgress;
module.exports = exports['default'];