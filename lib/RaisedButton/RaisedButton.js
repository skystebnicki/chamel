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

var _Paper = require('../Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var RaisedButton = _react2.default.createClass({
  displayName: 'RaisedButton',


  mixins: [_classable2.default],

  propTypes: {
    className: _react2.default.PropTypes.string,
    label: function label(props, propName, componentName) {
      if (!props.children && !props.label) {
        return new Error('Warning: Required prop `label` or `children` was not specified in `' + componentName + '`.');
      }
    },
    onMouseDown: _react2.default.PropTypes.func,
    onMouseUp: _react2.default.PropTypes.func,
    onMouseOut: _react2.default.PropTypes.func,
    onTouchEnd: _react2.default.PropTypes.func,
    onTouchStart: _react2.default.PropTypes.func,
    primary: _react2.default.PropTypes.bool,
    secondary: _react2.default.PropTypes.bool
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

    return _react2.default.createElement(
      _Paper2.default,
      { className: classes, zDepth: this.state.zDepth },
      _react2.default.createElement(
        _EnhancedButton2.default,
        _extends({}, other, {
          className: 'chamel-raised-button-container',
          onMouseUp: this._handleMouseUp,
          onMouseDown: this._handleMouseDown,
          onMouseOut: this._handleMouseOut,
          onTouchStart: this._handleTouchStart,
          onTouchEnd: this._handleTouchEnd }),
        _react2.default.createElement(
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