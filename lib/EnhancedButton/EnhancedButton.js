'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _KeyCode = require('../utils/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _WindowListenable = require('../mixins/WindowListenable');

var _WindowListenable2 = _interopRequireDefault(_WindowListenable);

var _FocusRipple = require('../ripples/FocusRipple');

var _FocusRipple2 = _interopRequireDefault(_FocusRipple);

var _TouchRipple = require('../ripples/TouchRipple');

var _TouchRipple2 = _interopRequireDefault(_TouchRipple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EnhancedButton = _react2.default.createClass({
  displayName: 'EnhancedButton',


  mixins: [_classable2.default, _WindowListenable2.default],

  propTypes: {
    centerRipple: _react2.default.PropTypes.bool,
    className: _react2.default.PropTypes.string,
    disabled: _react2.default.PropTypes.bool,
    disableFocusRipple: _react2.default.PropTypes.bool,
    disableTouchRipple: _react2.default.PropTypes.bool,
    linkButton: _react2.default.PropTypes.bool,
    onBlur: _react2.default.PropTypes.func,
    onFocus: _react2.default.PropTypes.func,
    onClick: _react2.default.PropTypes.func
  },

  windowListeners: {
    'keydown': '_handleWindowKeydown',
    'keyup': '_handleWindowKeyup'
  },

  getInitialState: function getInitialState() {
    return {
      isKeyboardFocused: false
    };
  },

  render: function render() {

    var centerRipple = this.props.centerRipple;
    var disabled = this.props.disabled;
    var disableFocusRipple = this.props.disableFocusRipple;
    var disableTouchRipple = this.props.disableTouchRipple;
    var linkButton = this.props.linkButton;
    var onBlur = this.props.onBlur;
    var onFocus = this.props.onFocus;
    var onClick = this.props.onClick;

    var classes = this.getClasses('chamel-enhanced-button', {
      'chamel-is-disabled': disabled,
      'chamel-is-keyboard-focused': this.state.isKeyboardFocused,
      'chamel-is-link-button': linkButton
    });
    var touchRipple = _react2.default.createElement(
      _TouchRipple2.default,
      {
        ref: 'touchRipple',
        key: 'touchRipple',
        centerRipple: centerRipple },
      this.props.children
    );
    var focusRipple = _react2.default.createElement(_FocusRipple2.default, {
      key: 'focusRipple',
      show: this.state.isKeyboardFocused });
    var buttonProps = {
      className: classes,
      disabled: disabled,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
      onClick: this._handleTouchTap
    };
    var buttonChildren = [disabled || disableTouchRipple ? this.props.children : touchRipple, disabled || disableFocusRipple ? null : focusRipple];

    if (disabled && linkButton) {
      return _react2.default.createElement(
        'span',
        _extends({}, this.props, {
          className: classes,
          disabled: disabled }),
        this.props.children
      );
    }

    return linkButton ? _react2.default.createElement(
      'a',
      buttonProps,
      buttonChildren
    ) : _react2.default.createElement(
      'button',
      buttonProps,
      buttonChildren
    );
  },

  isKeyboardFocused: function isKeyboardFocused() {
    return this.state.isKeyboardFocused;
  },

  _handleWindowKeydown: function _handleWindowKeydown(e) {
    if (e.keyCode == _KeyCode2.default.TAB) this._tabPressed = true;
    if (e.keyCode == _KeyCode2.default.ENTER && this.state.isKeyboardFocused) {
      this._handleTouchTap(e);
    }
  },

  _handleWindowKeyup: function _handleWindowKeyup(e) {
    if (e.keyCode == _KeyCode2.default.SPACE && this.state.isKeyboardFocused) {
      this._handleTouchTap(e);
    }
  },

  _handleBlur: function _handleBlur(e) {
    this.setState({
      isKeyboardFocused: false
    });

    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function _handleFocus(e) {
    //setTimeout is needed becuase the focus event fires first
    //Wait so that we can capture if this was a keyboard focus
    //or touch focus
    setTimeout(function () {
      if (this._tabPressed) {
        this.setState({
          isKeyboardFocused: true
        });
      }
    }.bind(this), 150);

    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleTouchTap: function _handleTouchTap(e) {
    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false
    });
    if (this.props.onClick) this.props.onClick(e);
  }

});

// Check for commonjs
if (module) {
  module.exports = EnhancedButton;
}

exports.default = EnhancedButton;
module.exports = exports['default'];