'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Functional component for any raised button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
var RaisedButton = function RaisedButton(props, context) {
  return _react2.default.createElement(
    _Button2.default,
    _extends({ type: 'raised' }, props),
    props.children
  );
};

/**
 * Set accepted properties
 */
RaisedButton.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  href: _propTypes2.default.string,
  icon: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  inverse: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  onMouseLeave: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,
  onTap: _propTypes2.default.func
};

/**
 * Set property defaults
 */
RaisedButton.defaultProps = {
  className: ''
};

/**
 * An alternate theme may be passed down by a provider
 */
RaisedButton.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

exports.default = RaisedButton;
module.exports = exports['default'];