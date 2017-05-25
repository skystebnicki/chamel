'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TouchRipple = require('../ripples/TouchRipple');

var _TouchRipple2 = _interopRequireDefault(_TouchRipple);

var _FocusRipple = require('../ripples/FocusRipple');

var _FocusRipple2 = _interopRequireDefault(_FocusRipple);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
var RadioButton = function RadioButton(props, context) {
  var theme = context.chamelTheme && context.chamelTheme.picker ? context.chamelTheme.picker : _ChamelThemeService2.default.defaultTheme.picker;

  return _react2.default.createElement(
    'label',
    { className: theme.radioButton },
    _react2.default.createElement('input', {
      type: "radio",
      className: theme.radioButtonInput,
      name: props.name,
      value: props.value,
      checked: props.checked,
      onChange: function onChange(e) {
        if (props.onSelect) {
          props.onSelect(props.value);
        }
      }
    }),
    props.label
  );
};

/**
 * Set accepted properties
 */
RadioButton.propTypes = {
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  onSelect: _propTypes2.default.func,
  checked: _propTypes2.default.bool,

  /**
   * The value of the radio button
   */
  value: _propTypes2.default.string,

  /**
   * Radio group name
   */
  name: _propTypes2.default.string
};

/**
 * Set property defaults
 */
RadioButton.defaultProps = {
  className: '',
  checked: false
};

/**
 * An alternate theme may be passed down by a provider
 */
RadioButton.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

exports.default = RadioButton;
module.exports = exports['default'];