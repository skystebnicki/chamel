'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./theme/base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Global object for setting and getting a default theme
 */
var ChamelThemeService = {
  defaultTheme: _base2.default
};

exports.default = ChamelThemeService;
module.exports = exports['default'];