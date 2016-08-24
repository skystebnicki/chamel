'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Classable = require('../mixins/classable');

var FontIcon = React.createClass({
  displayName: 'FontIcon',


  mixins: [Classable],

  render: function render() {

    var className = this.props.className;
    var classes = this.getClasses('chamel-font-icon');

    return React.createElement('span', _extends({}, this.props, { className: classes }));
  }

});

// Check for commonjs
if (module) {
  module.exports = FontIcon;
}

exports.default = FontIcon;
module.exports = exports['default'];