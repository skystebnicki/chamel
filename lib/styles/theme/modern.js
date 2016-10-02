'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is where we would import every single component as a key here
var themeStyles = (0, _simpleAssign2.default)({}, _base2.default);

// Override here
// Only use this when not using identified modules - otherwise comment out
themeStyles.button = require('../../Button/theme-modern.scss');

exports.default = themeStyles;
module.exports = exports['default'];