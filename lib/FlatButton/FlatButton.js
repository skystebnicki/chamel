'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Classable = require('../mixins/classable');
var EnhancedButton = require('../EnhancedButton');

var FlatButton = React.createClass({
  displayName: 'FlatButton',


  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    label: function label(props, propName, componentName) {
      if (!props.children && !props.label) {
        return new Error('Warning: Required prop `label` or `children` was not specified in `' + componentName + '`.');
      }
    },
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool
  },

  render: function render() {
    var _props = this.props;
    var label = _props.label;
    var primary = _props.primary;
    var secondary = _props.secondary;

    var other = _objectWithoutProperties(_props, ['label', 'primary', 'secondary']);

    var classes = this.getClasses('chamel-flat-button', {
      'chamel-is-primary': !this.props.disabled && primary,
      'chamel-is-secondary': !this.props.disabled && !primary && secondary
    });
    var children;

    if (label) children = React.createElement(
      'span',
      { className: 'chamel-flat-button-label' },
      label
    );else children = this.props.children;

    return React.createElement(
      EnhancedButton,
      _extends({}, other, {
        className: classes }),
      children
    );
  }

});

// Check for commonjs
if (module) {
  module.exports = FlatButton;
}

exports.default = FlatButton;
module.exports = exports['default'];