'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Classable = require('../mixins/classable');
var EnhancedSwitch = require('../EnhancedSwitch');
var RadioButtonOff = require('../svg-icons/toggle-radio-button-off');
var RadioButtonOn = require('../svg-icons/toggle-radio-button-on');

/**
 * Radio button switch
 */
var RadioButton = React.createClass({
  displayName: 'RadioButton',


  mixins: [Classable],

  propTypes: {
    /**
     * Callback to call when a radiobutton is selected
     *
     * @type {function}
     */
    onCheck: React.PropTypes.func,

    /**
     * Inline is used to determine if the radio buttons s are printed side-by-side
     *
     * Defaults to false since it is almost never used for mobile
     *
     * @type {bool}
     */
    inline: React.PropTypes.bool
  },

  /**
   * Set default properties if not set by the calling component
   */
  getDefaultProps: function getDefaultProps() {
    return { inline: false };
  },

  render: function render() {
    var _props = this.props;
    var onCheck = _props.onCheck;

    var other = _objectWithoutProperties(_props, ['onCheck']);

    var radioButtonElement = React.createElement(
      'div',
      null,
      React.createElement(RadioButtonOff, { className: 'chamel-radio-button-target' }),
      React.createElement(RadioButtonOn, { className: 'chamel-radio-button-fill' })
    );

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "radio",
      switchElement: radioButtonElement,
      className: "chamel-radio-button",
      iconClassName: "chamel-radio-button-icon",
      onSwitch: this._handleCheck,
      labelPosition: this.props.labelPosition ? this.props.labelPosition : "right"
    };

    return React.createElement(EnhancedSwitch, _extends({}, other, enhancedSwitchProps));
  },

  // Only called when selected, not when unselected.
  _handleCheck: function _handleCheck(e) {
    if (this.props.onCheck) this.props.onCheck(e, this.props.value);
  },

  isChecked: function isChecked() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked: function setChecked(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
    this.setState({ switched: newCheckedValue });
  },

  getValue: function getValue() {
    return this.refs.enhancedSwitch.getValue();
  }
});

// Check for commonjs
if (module) {
  module.exports = RadioButton;
}

exports.default = RadioButton;
module.exports = exports['default'];