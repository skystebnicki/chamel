'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Classable = require('./mixins/classable');
var Paper = require('./Paper');
var EnhancedSwitch = require('./EnhancedSwitch');

var Toggle = React.createClass({
  displayName: 'Toggle',


  mixins: [Classable],

  propTypes: {
    onToggle: React.PropTypes.func,
    toggled: React.PropTypes.bool,
    defaultToggled: React.PropTypes.bool
  },

  render: function render() {
    var _props = this.props;
    var onToggle = _props.onToggle;

    var other = _objectWithoutProperties(_props, ['onToggle']);

    var toggleElement = React.createElement(
      'div',
      null,
      React.createElement('div', { className: 'chamel-toggle-track' }),
      React.createElement(Paper, { className: 'chamel-toggle-thumb', zDepth: 1 })
    );

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switchElement: toggleElement,
      className: "chamel-toggle",
      iconClassName: "chamel-toggle-icon",
      onSwitch: this._handleToggle,
      defaultSwitched: this.props.defaultToggled,
      labelPosition: this.props.labelPosition ? this.props.labelPosition : "left"
    };

    if (this.props.hasOwnProperty('toggled')) enhancedSwitchProps.checked = this.props.toggled;

    return React.createElement(EnhancedSwitch, _extends({}, other, enhancedSwitchProps));
  },

  isToggled: function isToggled() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setToggled: function setToggled(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  },

  _handleToggle: function _handleToggle(e, isInputChecked) {
    if (this.props.onToggle) this.props.onToggle(e, isInputChecked);
  }
});

module.exports = Toggle;