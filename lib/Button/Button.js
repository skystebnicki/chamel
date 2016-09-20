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

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

var _reactTappable = require('react-tappable');

var _reactTappable2 = _interopRequireDefault(_reactTappable);

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
  var tapHandler = props.onTap || props.onClick;

  if (tapHandler && !props.disabled) {
    return _react2.default.createElement(
      _reactTappable2.default,
      { onTap: tapHandler },
      _react2.default.createElement(
        'button',
        { className: classes },
        _react2.default.createElement(_TouchRipple2.default, { centerRipple: centerRipple }),
        _react2.default.createElement(_FocusRipple2.default, null),
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
  accent: _react.PropTypes.bool,

  /**
   * Primary button color and behavior
   */
  primary: _react.PropTypes.bool,

  /**
   * Child elements (text and icon)
   */
  children: _react.PropTypes.node,

  /**
   * Optional classname override
   */
  className: _react.PropTypes.string,

  /**
   * Disabled flag - cannot be interacted with
   */
  disabled: _react.PropTypes.bool,

  /**
   * Flat style (looks like a link almost)
   */
  flat: _react.PropTypes.bool,

  /**
   * Floating button like floating action buttons (FAB) in material
   */
  floating: _react.PropTypes.bool,

  /**
   * Link reference to go to
   */
  href: _react.PropTypes.string,

  /**
   * ?
   */
  inverse: _react.PropTypes.bool,

  /**
   * Optional icon to display to the left of the text
   */
  icon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),

  /**
   * Optional property in place of child text
   */
  label: _react.PropTypes.string,

  /**
   * Small button
   */
  mini: _react.PropTypes.bool,

  /**
   * If true the button should appear pressed or down (think toggle)
   */
  depressed: _react.PropTypes.bool,
  neutral: _react.PropTypes.bool,
  onMouseLeave: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,

  /**
   * Event triggered when the user taps/clicks on the button
   */
  onTape: _react.PropTypes.func,

  /**
   * Alias for onTap for backwards compatibility
   */
  onClick: _react.PropTypes.func,

  raised: _react.PropTypes.bool,
  type: _react.PropTypes.oneOf(['raised', 'flat', 'floating', 'icon'])
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
  chamelTheme: _react2.default.PropTypes.object
};

exports.default = Button;
module.exports = exports['default'];