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

var _toggleCheckBoxOutlineBlank = require('../svg-icons/toggle-check-box-outline-blank');

var _toggleCheckBoxOutlineBlank2 = _interopRequireDefault(_toggleCheckBoxOutlineBlank);

var _toggleCheckBoxChecked = require('../svg-icons/toggle-check-box-checked');

var _toggleCheckBoxChecked2 = _interopRequireDefault(_toggleCheckBoxChecked);

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
    if (props.onChange) {
      props.onChange(evt, !props.checked);
    } else if (props.onCheck) {
      props.onCheck(evt, !props.checked);
    }
  } : false;

  var labelElement = null;
  if (props.label) {
    labelElement = _react2.default.createElement(
      'div',
      { className: theme.checkboxText },
      props.label
    );
  }

  var outlineClasses = theme.checkboxIconBox;
  if (props.checked) {
    outlineClasses += " " + theme.checkboxIconBoxOn;
  }

  var checkClasses = theme.checkboxIconCheck;
  if (props.checked) {
    checkClasses += " " + theme.checkboxIconCheckOn;
  }

  return _react2.default.createElement(
    'div',
    { onClick: onTap, className: theme.checkbox },
    _react2.default.createElement(
      'div',
      { className: theme.checkboxIcon },
      _react2.default.createElement(_toggleCheckBoxOutlineBlank2.default, { className: outlineClasses }),
      _react2.default.createElement(_toggleCheckBoxChecked2.default, { className: checkClasses })
    ),
    labelElement
  );
};

/**
 * Set accepted properties
 */
Checkbox.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.string,

  /**
   * This is the function calling components should use to check status
   */
  onChange: _propTypes2.default.func,

  /**
   * Legacy callback
   */
  onCheck: _propTypes2.default.func,

  /**
   * Flag indicates whether or not the input box is checked
   */
  checked: _propTypes2.default.bool
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
  chamelTheme: _propTypes2.default.object
};

exports.default = Checkbox;
module.exports = exports['default'];