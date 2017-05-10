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

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Switch toggle
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
var Switch = function Switch(props, context) {
  var theme = context.chamelTheme && context.chamelTheme.toggle ? context.chamelTheme.toggle : _ChamelThemeService2.default.defaultTheme.toggle;

  var onTap = props.onChange && !props.disabled ? function (evt) {
    if (props.onChange) {
      props.onChange(evt, !props.checked);
    }
  } : false;

  var labelElement = null;
  if (props.label) {
    labelElement = _react2.default.createElement(
      'div',
      { className: theme.switchText },
      props.label
    );
  }

  var buttonClasses = theme.switchIconButton;
  if (props.checked) {
    buttonClasses += " " + theme.switchIconButtonOn;
  }

  var trackClasses = theme.switchIconTrack;
  if (props.checked) {
    trackClasses += " " + theme.switchIconTrackOn;
  }

  return _react2.default.createElement(
    'div',
    { onClick: onTap, className: theme.switch },
    _react2.default.createElement(
      'div',
      { className: theme.switchIcon },
      _react2.default.createElement('div', { className: trackClasses }),
      _react2.default.createElement(_Paper2.default, { className: buttonClasses, zDepth: 1 })
    ),
    labelElement
  );
};

/**
 * Set accepted properties
 */
Switch.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.string,

  /**
   * This is the function calling components should use to check status
   */
  onChange: _propTypes2.default.func,

  /**
   * Flag indicates whether or not the input box is checked
   */
  checked: _propTypes2.default.bool
};

/**
 * Set property defaults
 */
Switch.defaultProps = {
  className: '',
  checked: false
};

/**
 * An alternate theme may be passed down by a provider
 */
Switch.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

exports.default = Switch;
module.exports = exports['default'];