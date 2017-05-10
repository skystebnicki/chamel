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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Show a divider (hr) in a list
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
var ListDivider = function ListDivider(props, context) {
  var theme = context.chamelTheme && context.chamelTheme.list ? context.chamelTheme.list : _ChamelThemeService2.default.defaultTheme.list;

  var classes = (0, _classnames3.default)(theme.listDivider, _defineProperty({}, theme.listDividerInset, props.inset));

  return _react2.default.createElement('div', { className: classes });
};

/**
 * Set accepted properties
 */
ListDivider.propTypes = {
  /**
   * Optional flag that can be set to indicate this item is selected
   */
  inset: _propTypes2.default.bool
};

/**
 * Set property defaults
 */
ListDivider.defaultProps = {
  inset: false
};

/**
 * An alternate theme may be passed down by a provider
 */
ListDivider.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

exports.default = ListDivider;
module.exports = exports['default'];