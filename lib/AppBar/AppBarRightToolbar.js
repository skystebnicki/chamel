'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The right toolbar for an AppBar
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
var AppBarRightToolbar = function AppBarRightToolbar(props, context) {
  var theme = context.chamelTheme && context.chamelTheme.appBar ? context.chamelTheme.appBar : _ChamelThemeService2.default.defaultTheme.appBar;

  return _react2.default.createElement(
    'div',
    { className: props.className },
    props.children
  );
};

/**
 * Set accepted properties
 */
AppBarRightToolbar.propTypes = {
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
AppBarRightToolbar.defaultProps = {
  className: null
};

/**
 * An alternate theme may be passed down by a provider
 */
AppBarRightToolbar.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

exports.default = AppBarRightToolbar;
module.exports = exports['default'];