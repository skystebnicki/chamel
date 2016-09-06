'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _material = require('./material/material.scss');

var _material2 = _interopRequireDefault(_material);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is where we would import every single component as a key here
// Only use this when not using identified modules - otherwise comment out
var themeStyles = (0, _simpleAssign2.default)({}, _base2.default);

// Override here
themeStyles.button = require('../../Button/theme-material.scss');
themeStyles.appBar = require('../../AppBar/theme-material.scss');
themeStyles.ripple = require('../../ripples/theme-material.scss');
themeStyles.menu = require('../../Menu/theme-material.scss');

exports.default = themeStyles;
module.exports = exports['default'];