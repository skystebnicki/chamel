'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Classable = require('../mixins/classable');
var EnhancedButton = require('../EnhancedButton');
var Paper = require('../Paper');

var RaisedButton = React.createClass({
  displayName: 'RaisedButton',


  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    label: function label(props, propName, componentName) {
      if (!props.children && !props.label) {
        return new Error('Warning: Required prop `label` or `children` was not specified in `' + componentName + '`.');
      }
    },
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool
  },

  getInitialState: function getInitialState() {
    var zDepth = this.props.disabled ? 0 : 1;
    return {
      zDepth: zDepth,
      initialZDepth: zDepth
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var zDepth = nextProps.disabled ? 0 : 1;
    this.setState({
      zDepth: zDepth,
      initialZDepth: zDepth
    });
  },

  render: function render() {
    var _props = this.props;
    var label = _props.label;
    var primary = _props.primary;
    var secondary = _props.secondary;

    var other = _objectWithoutProperties(_props, ['label', 'primary', 'secondary']);

    var classes = this.getClasses('chamel-raised-button', {
      'chamel-is-primary': !this.props.disabled && primary,
      'chamel-is-secondary': !this.props.disabled && !primary && secondary
    });
    var children;

    if (label) {
      children = label;
    } else {
      children = this.props.children;
    }

    return React.createElement(
      Paper,
      { className: classes, zDepth: this.state.zDepth },
      React.createElement(
        EnhancedButton,
        _extends({}, other, {
          className: 'chamel-raised-button-container',
          onMouseUp: this._handleMouseUp,
          onMouseDown: this._handleMouseDown,
          onMouseOut: this._handleMouseOut,
          onTouchStart: this._handleTouchStart,
          onTouchEnd: this._handleTouchEnd }),
        React.createElement(
          'span',
          { className: 'chamel-raised-button-label' },
          children
        )
      )
    );
  },

  _handleMouseDown: function _handleMouseDown(e) {
    //only listen to left clicks
    if (e.button === 0) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
    }
    if (this.props.onMouseDown) this.props.onMouseDown(e);
  },

  _handleMouseUp: function _handleMouseUp(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onMouseUp) this.props.onMouseUp(e);
  },

  _handleMouseOut: function _handleMouseOut(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleTouchStart: function _handleTouchStart(e) {
    this.setState({ zDepth: this.state.initialZDepth + 1 });
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  _handleTouchEnd: function _handleTouchEnd(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  }

});

// Check for commonjs
if (module) {
  module.exports = RaisedButton;
}

exports.default = RaisedButton;
module.exports = exports['default'];