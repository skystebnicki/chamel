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
var Checkbox = function Checkbox(props, context) {
  var theme = context.chamelTheme && context.chamelTheme.toggle ? context.chamelTheme.toggle : _ChamelThemeService2.default.defaultTheme.toggle;

  var onTap = props.onChange && !props.disabled ? function (evt) {
    props.onChange(evt, !props.checked);
  } : false;

  return _react2.default.createElement(
    'label',
    null,
    _react2.default.createElement('input', { type: 'checkbox', checked: props.checked, className: theme.checkbox, onChange: onTap }),
    _react2.default.createElement(
      'span',
      { 'class': theme.checkboxText },
      props.label
    )
  );
};

/**
 * Set accepted properties
 */
Checkbox.propTypes = {
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  onTape: _react.PropTypes.func,
  onChange: _react.PropTypes.func,
  checked: _react.PropTypes.bool
};

/**
 * Set property defaults
 */
Checkbox.defaultProps = {
  className: '',
  checked: false
};

/**
 * An alternate theme may be passed down by a provider
 */
Checkbox.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};

exports.default = Checkbox;
module.exports = exports['default'];