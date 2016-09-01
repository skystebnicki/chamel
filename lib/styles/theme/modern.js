'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _modern = require('./modern/modern.scss');

var _modern2 = _interopRequireDefault(_modern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is where we would import every single component as a key here
exports.default = {
    button: require('../../Button/theme-modern.scss')
};
module.exports = exports['default'];