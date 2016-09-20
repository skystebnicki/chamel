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
var RadioPicker = function RadioPicker(props, context) {
  var theme = context.chamelTheme && context.chamelTheme.toggle ? context.chamelTheme.toggle : _ChamelThemeService2.default.defaultTheme.toggle;

  var childElements = _react.Children.map(props.children, function (child) {
    return _react2.default.isValidElement(child) ? _react2.default.cloneElement(child, {
      name: "test",
      checked: props.value === child.props.value,
      onSelect: function onSelect(value) {
        if (props.onChange) {
          props.onChange(value);
        }
      }
    }) : child;
  });

  return _react2.default.createElement(
    'div',
    null,
    childElements
  );
};

/**
 * Set accepted properties
 */
RadioPicker.propTypes = {
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
RadioPicker.defaultProps = {
  className: '',
  checked: false
};

/**
 * An alternate theme may be passed down by a provider
 */
RadioPicker.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};

exports.default = RadioPicker;
module.exports = exports['default'];