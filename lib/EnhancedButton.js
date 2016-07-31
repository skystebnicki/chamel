'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var KeyCode = require('./utils/KeyCode');
var Classable = require('./mixins/classable');
var WindowListenable = require('./mixins/WindowListenable');
var FocusRipple = require('./ripples/FocusRipple');
var TouchRipple = require('./ripples/TouchRipple');

var EnhancedButton = React.createClass({
  displayName: 'EnhancedButton',


  mixins: [Classable, WindowListenable],

  propTypes: {
    centerRipple: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    disableFocusRipple: React.PropTypes.bool,
    disableTouchRipple: React.PropTypes.bool,
    linkButton: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onClick: React.PropTypes.func
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
    var touchRipple = React.createElement(
      TouchRipple,
      {
        ref: 'touchRipple',
        key: 'touchRipple',
        centerRipple: centerRipple },
      this.props.children
    );
    var focusRipple = React.createElement(FocusRipple, {
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
      return React.createElement(
        'span',
        _extends({}, this.props, {
          className: classes,
          disabled: disabled }),
        this.props.children
      );
    }

    return linkButton ? React.createElement(
      'a',
      _extends({}, this.props, buttonProps),
      buttonChildren
    ) : React.createElement(
      'button',
      _extends({}, this.props, buttonProps),
      buttonChildren
    );
  },

  isKeyboardFocused: function isKeyboardFocused() {
    return this.state.isKeyboardFocused;
  },

  _handleWindowKeydown: function _handleWindowKeydown(e) {
    if (e.keyCode == KeyCode.TAB) this._tabPressed = true;
    if (e.keyCode == KeyCode.ENTER && this.state.isKeyboardFocused) {
      this._handleTouchTap(e);
    }
  },

  _handleWindowKeyup: function _handleWindowKeyup(e) {
    if (e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
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

module.exports = EnhancedButton;