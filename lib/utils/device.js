'use strict';

var _modernizr = require('./modernizr.custom');

var _modernizr2 = _interopRequireDefault(_modernizr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var device = {};

/**
 * Setup device tests
 */
/**
 * Device is an object that is used to represent a physical device and browser
 */
if (_modernizr2.default) {
  device.test = _modernizr2.default;
} else {
  // Modernizr can't load so make empty props or set defaults here
  device.test = {
    inputtypes: {}
  };
}

module.exports = device;