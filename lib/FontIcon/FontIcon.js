'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var theme = context.chamelTheme && context.chamelTheme.fontIcon ? context.chamelTheme.fontIcon : {};

  var className = props.className;

  var other = _objectWithoutProperties(props, ['className']);

  var classes = (0, _classnames2.default)(theme.fontIcon, className);

  return _react2.default.createElement('span', _extends({ className: classes }, other));
};

/**
 * Set accepted properties
 */
FontIcon.propTypes = {
  className: _react.PropTypes.string
};

/**
 * Set property defaults
 */
FontIcon.defaultProps = {
  className: ''
};

/**
 * An alternate theme may be passed down by a provider
 */
FontIcon.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};

// Check for commonjs
if (module) {
  module.exports = FontIcon;
}

exports.default = FontIcon;
module.exports = exports['default'];