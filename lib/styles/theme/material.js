'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _material = require('./material/material.scss');

var _material2 = _interopRequireDefault(_material);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is where we would import every single component as a key here
exports.default = {
    button: require('../../Button/theme-material.scss')
};
module.exports = exports['default'];