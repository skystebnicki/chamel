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
    _reactTappable2.default,
    { onTap: onTap, component: "div", className: theme.checkbox },
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
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  onTape: _react.PropTypes.func,

  /**
   * This is the function calling components should use to check status
   */
  onChange: _react.PropTypes.func,

  /**
   * Legacy callback
   */
  onCheck: _react.PropTypes.func,

  /**
   * Flag indicates whether or not the input box is checked
   */
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