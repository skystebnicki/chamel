'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _human = require('./human/human.scss');

var _human2 = _interopRequireDefault(_human);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is where we would import every single component as a key here
exports.default = {
    button: require('../../Button/theme-human.scss')
};
module.exports = exports['default'];