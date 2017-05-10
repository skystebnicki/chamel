'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _toggleRadioButtonOff = require('../svg-icons/toggle-radio-button-off');

var _toggleRadioButtonOff2 = _interopRequireDefault(_toggleRadioButtonOff);

var _toggleRadioButtonOn = require('../svg-icons/toggle-radio-button-on');

var _toggleRadioButtonOn2 = _interopRequireDefault(_toggleRadioButtonOn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Radio button switch
 */
var RadioButton = function RadioButton(props) {
  var _props = undefined.props,
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
    onSwitch: undefined._handleCheck,
    labelPosition: undefined.props.labelPosition ? undefined.props.labelPosition : "right"
  };

  return _react2.default.createElement(EnhancedSwitch, _extends({}, other, enhancedSwitchProps));

  // Only called when selected, not when unselected.
  _handleCheck = function _handleCheck(e) {
    if (undefined.props.onCheck) undefined.props.onCheck(e, undefined.props.value);
  };

  isChecked = function isChecked() {
    return undefined.refs.enhancedSwitch.isSwitched();
  };

  setChecked = function setChecked(newCheckedValue) {
    undefined.refs.enhancedSwitch.setSwitched(newCheckedValue);
    undefined.setState({ switched: newCheckedValue });
  };

  getValue = function getValue() {
    return undefined.refs.enhancedSwitch.getValue();
  };
};

RadioButton.propTypes = {
  /**
   * Callback to call when a radiobutton is selected
   *
   * @type {function}
   */
  onCheck: _propTypes2.default.func,

  /**
   * Inline is used to determine if the radio buttons s are printed side-by-side
   *
   * Defaults to false since it is almost never used for mobile
   *
   * @type {bool}
   */
  inline: _propTypes2.default.bool

};

/**
 * Set default properties if not set by the calling component
 */
RadioButton.defaultProps = {
  inline: false
};

exports.default = RadioButton;
module.exports = exports['default'];