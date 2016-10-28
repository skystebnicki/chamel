'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _EnhancedSwitch = require('../EnhancedSwitch/EnhancedSwitch');

var _EnhancedSwitch2 = _interopRequireDefault(_EnhancedSwitch);

var _toggleRadioButtonOff = require('../svg-icons/toggle-radio-button-off');

var _toggleRadioButtonOff2 = _interopRequireDefault(_toggleRadioButtonOff);

var _toggleRadioButtonOn = require('../svg-icons/toggle-radio-button-on');

var _toggleRadioButtonOn2 = _interopRequireDefault(_toggleRadioButtonOn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Radio button switch
 */
var RadioButton = _react2.default.createClass({
  displayName: 'RadioButton',


  mixins: [_classable2.default],

  propTypes: {
    /**
     * Callback to call when a radiobutton is selected
     *
     * @type {function}
     */
    onCheck: _react2.default.PropTypes.func,

    /**
     * Inline is used to determine if the radio buttons s are printed side-by-side
     *
     * Defaults to false since it is almost never used for mobile
     *
     * @type {bool}
     */
    inline: _react2.default.PropTypes.bool
  },

  /**
   * Set default properties if not set by the calling component
   */
  getDefaultProps: function getDefaultProps() {
    return { inline: false };
  },

  render: function render() {
    var _props = this.props,
        onCheck = _props.onCheck,
        other = _objectWithoutProperties(_props, ['onCheck']);

    var radioButtonElement = _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_toggleRadioButtonOff2.default, { className: 'chamel-radio-button-target' }),
      _react2.default.createElement(_toggleRadioButtonOn2.default, { className: 'chamel-radio-button-fill' })
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

    return _react2.default.createElement(_EnhancedSwitch2.default, _extends({}, other, enhancedSwitchProps));
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