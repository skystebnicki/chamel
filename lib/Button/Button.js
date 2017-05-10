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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
var Button = function Button(props, context) {
  var _classnames;

  var theme = context.chamelTheme && context.chamelTheme.button ? context.chamelTheme.button : _ChamelThemeService2.default.defaultTheme.button;

  // Setup classes
  var className = props.className || null;
  var type = props.type;
  var classes = (0, _classnames3.default)(theme[type], (_classnames = {}, _defineProperty(_classnames, theme[type + "primary"], props.primary), _defineProperty(_classnames, theme[type + "accent"], props.accent), _defineProperty(_classnames, theme[type + "disabled"], props.disabled), _defineProperty(_classnames, theme[type + "depressed"], props.depressed), _defineProperty(_classnames, theme[type + "mini"], props.mini), _classnames), className);

  // Determine if the selected type of button is a centered ripple
  var centerRipple = type == 'floating' || type == 'icon';
  var label = props.label ? props.label : props.children;

  var onClickHandler = props.onTap || props.onClick;

  if (onClickHandler && !props.disabled) {
    return _react2.default.createElement(
      'button',
      {
        className: classes,
        onClick: onClickHandler },
      _react2.default.createElement(_FocusRipple2.default, null),
      _react2.default.createElement(
        _TouchRipple2.default,
        { centerRipple: centerRipple },
        label
      )
    );
  } else {
    return _react2.default.createElement(
      'button',
      { disabled: props.disabled, className: classes },
      label
    );
  }
};

/**
 * Set accepted properties
 */
Button.propTypes = {
  /**
   * Secondary accent color
   */
  accent: _propTypes2.default.bool,

  /**
   * Primary button color and behavior
   */
  primary: _propTypes2.default.bool,

  /**
   * Child elements (text and icon)
   */
  children: _propTypes2.default.node,

  /**
   * Optional classname override
   */
  className: _propTypes2.default.string,

  /**
   * Disabled flag - cannot be interacted with
   */
  disabled: _propTypes2.default.bool,

  /**
   * Flat style (looks like a link almost)
   */
  flat: _propTypes2.default.bool,

  /**
   * Floating button like floating action buttons (FAB) in material
   */
  floating: _propTypes2.default.bool,

  /**
   * Link reference to go to
   */
  href: _propTypes2.default.string,

  /**
   * ?
   */
  inverse: _propTypes2.default.bool,

  /**
   * Optional icon to display to the left of the text
   */
  icon: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),

  /**
   * Optional property in place of child text
   */
  label: _propTypes2.default.string,

  /**
   * Small button
   */
  mini: _propTypes2.default.bool,

  /**
   * If true the button should appear pressed or down (think toggle)
   */
  depressed: _propTypes2.default.bool,
  neutral: _propTypes2.default.bool,
  onMouseLeave: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,

  /**
   * Event triggered when the user taps/clicks on the button
   */
  onTape: _propTypes2.default.func,

  /**
   * Alias for onTap for backwards compatibility
   */
  onClick: _propTypes2.default.func,

  raised: _propTypes2.default.bool,
  type: _propTypes2.default.oneOf(['raised', 'flat', 'floating', 'icon'])
};

/**
 * Set property defaults
 */
Button.defaultProps = {
  accent: false,
  className: '',
  flat: false,
  floating: false,
  mini: false,
  neutral: true,
  primary: false,
  raised: false,
  type: "raised"
};

/**
 * An alternate theme may be passed down by a provider
 */
Button.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

exports.default = Button;
module.exports = exports['default'];