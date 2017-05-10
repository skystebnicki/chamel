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
 * Grid row
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
var Container = function Container(props, context) {
  var theme = context.chamelTheme && context.chamelTheme.grid ? context.chamelTheme.grid : _ChamelThemeService2.default.defaultTheme.grid;

  var classes = props.fluid ? theme.containerFluid : theme.container;

  return _react2.default.createElement(
    'div',
    { className: classes },
    props.children
  );
};

/**
 * Set accepted properties
 */
Container.propTypes = {
  children: _propTypes2.default.node
};

/**
 * An alternate theme may be passed down by a provider
 */
Container.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

exports.default = Container;
module.exports = exports['default'];