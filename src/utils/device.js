/**
 * Device is an object that is used to represent a physical device and browser
 */
 var modernizr = require('./modernizr.custom');

 var device = {}

/**
 * Setup device tests
 */
 if (modernizr) {
 	device.test = modernizr;
 } else {
 	// Modernizr can't load so make empty props or set defaults here
 	device.test = {
 		inputtypes: {}
 	}
 }


 module.exports = device;