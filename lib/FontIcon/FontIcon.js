'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FontIcon = _react2.default.createClass({
  displayName: 'FontIcon',


  mixins: [_classable2.default],

  render: function render() {

    var className = this.props.className;
    var classes = this.getClasses('chamel-font-icon');

    return _react2.default.createElement('span', _extends({}, this.props, { className: classes }));
  }

});

// Check for commonjs
if (module) {
  module.exports = FontIcon;
}

exports.default = FontIcon;
module.exports = exports['default'];