'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Functional component for any flat button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
var FlatButton = function FlatButton(props, context) {
  return _react2.default.createElement(
    _Button2.default,
    _extends({ type: 'flat' }, props),
    props.children
  );
};

/**
 * Set accepted properties
 */
FlatButton.propTypes = {
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  href: _react.PropTypes.string,
  icon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  inverse: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  onMouseLeave: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onTap: _react.PropTypes.func,
  /**
   * Alias for onTap for backwards compatibility
   */
  onClick: _react.PropTypes.func
};

/**
 * Set property defaults
 */
FlatButton.defaultProps = {
  className: ''
};

/**
 * An alternate theme may be passed down by a provider
 */
FlatButton.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};

exports.default = FlatButton;
module.exports = exports['default'];