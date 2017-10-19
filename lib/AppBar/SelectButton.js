'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SelectButton = require('../Picker/SelectButton');

var _SelectButton2 = _interopRequireDefault(_SelectButton);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Wrapper for an SelectButton in the AppBar
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 */
var AppBarSelectButton = function AppBarSelectButton(props, context) {
  var theme = context.chamelTheme && context.chamelTheme.appBar ? context.chamelTheme.appBar : _ChamelThemeService2.default.defaultTheme.appBar;

  // Get className and children, and put the rest in other to forward below

  var className = props.className,
      children = props.children,
      other = _objectWithoutProperties(props, ['className', 'children']);

  if (className) {
    className += " ";
  }
  className += theme.appBarIconButton;

  return _react2.default.createElement(
    _SelectButton2.default,
    _extends({ className: className }, other),
    children
  );
};

/**
 * Set accepted properties
 */
AppBarSelectButton.propTypes = {
  /**
   * Optional class override
   */
  className: _propTypes2.default.string,

  /**
   * Child elements (text and icon)
   */
  children: _propTypes2.default.node
};

/**
 * Set property defaults
 */
AppBarSelectButton.defaultProps = {
  className: "",
  children: null
};

/**
 * An alternate theme may be passed down by a provider
 */
AppBarSelectButton.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

exports.default = AppBarSelectButton;
module.exports = exports['default'];