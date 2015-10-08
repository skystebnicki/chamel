var React = require('react');
var KeyCode = require('./utils/KeyCode.jsx');
var Classable = require('./mixins/classable.jsx');
var WindowListenable = require('./mixins/WindowListenable.jsx');
var FocusRipple = require('./ripples/FocusRipple.jsx');
var TouchRipple = require('./ripples/TouchRipple.jsx');

var EnhancedButton = React.createClass({

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

  getInitialState: function() {
    return {
      isKeyboardFocused: false 
    };
  },

  render: function() {

    var centerRipple = this.props.centerRipple;
    var disabled = this.props.disabled;
    var disableFocusRipple = this.props.disableFocusRipple;
    var disableTouchRipple = this.props.disableTouchRipple;
    var linkButton = this.props.linkButton;
    var onBlur = this.props.onBlur;
    var onFocus = this.props.onFocus;
    var onClick = this.props.onClick;

    var classes = this.getClasses('chamel-enhanced-button', {
      'is-disabled': disabled,
      'is-keyboard-focused': this.state.isKeyboardFocused,
      'is-link-button': linkButton
    });
    var touchRipple = (
      <TouchRipple
        ref="touchRipple"
        key="touchRipple"
        centerRipple={centerRipple}>
        {this.props.children}
        </TouchRipple>
    );
    var focusRipple = (
      <FocusRipple
        key="focusRipple"
        show={this.state.isKeyboardFocused} />
    );
    var buttonProps = {
      className: classes,
      disabled: disabled,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
        onClick: this._handleTouchTap
    };
    var buttonChildren = [
      disabled || disableTouchRipple ? this.props.children : touchRipple,
      disabled || disableFocusRipple ? null : focusRipple
    ];

    if (disabled && linkButton) {
      return (
        <span {...this.props} 
          className={classes} 
          disabled={disabled}>
          {this.props.children}
        </span>
      );
    }

    return linkButton ? (
      <a {...this.props} {...buttonProps}>
        {buttonChildren}
      </a>
    ) : (
      <button {...this.props} {...buttonProps}>
        {buttonChildren}
      </button>
    );
  },

  isKeyboardFocused: function() {
    return this.state.isKeyboardFocused;
  },

  _handleWindowKeydown: function(e) {
    if (e.keyCode == KeyCode.TAB) this._tabPressed = true;
    if (e.keyCode == KeyCode.ENTER && this.state.isKeyboardFocused) {
      this._handleTouchTap(e);
    }
  },

  _handleWindowKeyup: function(e) {
    if (e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleTouchTap(e);
    }
  },

  _handleBlur: function(e) {
    this.setState({
      isKeyboardFocused: false
    });

    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function(e) {
    //setTimeout is needed becuase the focus event fires first
    //Wait so that we can capture if this was a keyboard focus
    //or touch focus
    setTimeout(function() {
      if (this._tabPressed) {
        this.setState({
          isKeyboardFocused: true
        });
      }
    }.bind(this), 150);
    
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleTouchTap: function(e) {
    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false
    });
    if (this.props.onClick) this.props.onClick(e);
  }

});

module.exports = EnhancedButton;