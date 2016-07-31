'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('./mixins/classable');
var EnhancedButton = require('./EnhancedButton');
var FontIcon = require('./FontIcon');
var Tooltip = require('./Tooltip');

var IconButton = React.createClass({
  displayName: 'IconButton',


  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    iconClassName: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    tooltip: React.PropTypes.string,
    touch: React.PropTypes.bool
  },

  getInitialState: function getInitialState() {
    return {
      tooltipShown: false
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.tooltip) {
      this._positionTooltip();
    }
    if (process.NODE_ENV !== 'production') {
      if (this.props.iconClassName && this.props.children) {
        var warning = 'You have set both an iconClassName and a child icon. ' + 'It is recommended you use only one method when adding ' + 'icons to IconButtons.';
        console.warn(warning);
      }
    }
  },

  render: function render() {
    var classes = this.getClasses('chamel-icon-button');
    var tooltip = this.props.tooltip;
    var touch = this.props.touch;
    var fonticon;

    if (this.props.tooltip) {
      tooltip = React.createElement(Tooltip, {
        ref: 'tooltip',
        className: 'chamel-icon-button-tooltip',
        label: tooltip,
        show: this.state.tooltipShown,
        touch: touch });
    }

    if (this.props.iconClassName) {
      fonticon = React.createElement(FontIcon, { className: this.props.iconClassName });
    }

    return React.createElement(
      EnhancedButton,
      _extends({}, this.props, {
        ref: 'button',
        centerRipple: true,
        className: classes,
        onBlur: this._handleBlur,
        onFocus: this._handleFocus,
        onMouseOut: this._handleMouseOut,
        onMouseOver: this._handleMouseOver }),
      tooltip,
      fonticon,
      this.props.children
    );
  },

  _positionTooltip: function _positionTooltip() {
    var tooltip = ReactDOM.findDOMNode(this.refs.tooltip);
    var tooltipWidth = tooltip.offsetWidth;
    var buttonWidth = 48;

    tooltip.style.left = (tooltipWidth - buttonWidth) / 2 * -1 + 'px';
  },

  _showTooltip: function _showTooltip() {
    if (!this.props.disabled) this.setState({ tooltipShown: true });
  },

  _hideTooltip: function _hideTooltip() {
    this.setState({ tooltipShown: false });
  },

  _handleBlur: function _handleBlur(e) {
    this._hideTooltip();
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function _handleFocus(e) {
    this._showTooltip();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleMouseOut: function _handleMouseOut(e) {
    if (!this.refs.button.isKeyboardFocused()) this._hideTooltip();
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleMouseOver: function _handleMouseOver(e) {
    this._showTooltip();
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  }

});

module.exports = IconButton;