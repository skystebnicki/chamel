'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
var FontIcon = function FontIcon(props, context) {
  var _classnames;

  var theme = null,
      themeName = null;

  if (context.chamelTheme && context.chamelTheme.fontIcon) {
    theme = context.chamelTheme.fontIcon;
    themeName = context.chamelTheme.name;
  } else {
    theme = _ChamelThemeService2.default.defaultTheme.fontIcon;
    themeName = _ChamelThemeService2.default.defaultTheme.name;
  }

  var className = props.className,
      other = _objectWithoutProperties(props, ['className']);

  var classes = (0, _classnames3.default)(theme.fontIcon, (_classnames = {}, _defineProperty(_classnames, theme.iconSize18, props.size == 18), _defineProperty(_classnames, theme.iconSize24, props.size == 24), _defineProperty(_classnames, theme.iconSize36, props.size == 36), _defineProperty(_classnames, theme.iconSize48, props.size == 48), _classnames), className);

  var content = themeName === 'material' ? props.children : null;

  return _react2.default.createElement(
    'span',
    _extends({ className: classes }, other),
    content
  );
};

/**
 * Set accepted properties
 */
FontIcon.propTypes = {
  className: _propTypes2.default.string,
  size: _propTypes2.default.oneOf([18, 24, 36, 48])
};

/**
 * Set property defaults
 */
FontIcon.defaultProps = {
  className: '',
  size: 24
};

/**
 * An alternate theme may be passed down by a provider
 */
FontIcon.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

exports.default = FontIcon;
module.exports = exports['default'];