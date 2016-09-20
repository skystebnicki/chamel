'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Grid column
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
var Column = function Column(props, context) {
  var _classnames;

  var theme = context.chamelTheme && context.chamelTheme.grid ? context.chamelTheme.grid : _ChamelThemeService2.default.defaultTheme.grid;

  var classes = (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, theme["colXSmall" + props.xsmall], props.xsmall), _defineProperty(_classnames, theme["colSmall" + props.small], props.small), _defineProperty(_classnames, theme["colMedium" + props.medium], props.medium), _defineProperty(_classnames, theme["colLarge" + props.large], props.large), _defineProperty(_classnames, theme["colXLarge" + props.xlarge], props.xlarge), _classnames));

  return _react2.default.createElement(
    'div',
    { className: classes, style: props.style },
    props.children
  );
};

/**
 * Set accepted properties
 */
Column.propTypes = {
  xsmall: _react.PropTypes.number,
  small: _react.PropTypes.number,
  medium: _react.PropTypes.number,
  large: _react.PropTypes.number,
  xlarge: _react.PropTypes.number,
  children: _react.PropTypes.node,
  style: _react.PropTypes.object
};

/**
 * An alternate theme may be passed down by a provider
 */
Column.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};

exports.default = Column;
module.exports = exports['default'];