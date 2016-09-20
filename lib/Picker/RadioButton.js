'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TouchRipple = require('../ripples/TouchRipple');

var _TouchRipple2 = _interopRequireDefault(_TouchRipple);

var _FocusRipple = require('../ripples/FocusRipple');

var _FocusRipple2 = _interopRequireDefault(_FocusRipple);

var _reactTappable = require('react-tappable');

var _reactTappable2 = _interopRequireDefault(_reactTappable);

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
      onClick: function onClick(e) {
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
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  onSelect: _react.PropTypes.func,
  checked: _react.PropTypes.bool,

  /**
   * The value of the radio button
   */
  value: _react.PropTypes.string,

  /**
   * Radio group name
   */
  name: _react.PropTypes.string
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
  chamelTheme: _react2.default.PropTypes.object
};

exports.default = RadioButton;
module.exports = exports['default'];