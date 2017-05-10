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
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  onTape: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  checked: _propTypes2.default.bool
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
  chamelTheme: _propTypes2.default.object
};

exports.default = RadioPicker;
module.exports = exports['default'];