'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _EnhancedButton = require('../EnhancedButton/EnhancedButton');

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FlatButton = _react2.default.createClass({
  displayName: 'FlatButton',


  mixins: [_classable2.default],

  propTypes: {
    className: _react2.default.PropTypes.string,
    label: function label(props, propName, componentName) {
      if (!props.children && !props.label) {
        return new Error('Warning: Required prop `label` or `children` was not specified in `' + componentName + '`.');
      }
    },
    primary: _react2.default.PropTypes.bool,
    secondary: _react2.default.PropTypes.bool
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

    if (label) children = _react2.default.createElement(
      'span',
      { className: 'chamel-flat-button-label' },
      label
    );else children = this.props.children;

    return _react2.default.createElement(
      _EnhancedButton2.default,
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