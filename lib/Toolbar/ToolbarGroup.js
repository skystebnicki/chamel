'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Main popover class handles absolute positioning paper relative to an element
 */
var ToolbarGroup = function (_React$Component) {
  _inherits(ToolbarGroup, _React$Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function ToolbarGroup(props) {
    _classCallCheck(this, ToolbarGroup);

    // Call paprent constructor
    return _possibleConstructorReturn(this, (ToolbarGroup.__proto__ || Object.getPrototypeOf(ToolbarGroup)).call(this, props));
  }

  /**
   * Set accepted properties
   */


  /**
   * An alternate theme may be passed down by a provider
   */


  _createClass(ToolbarGroup, [{
    key: 'render',
    value: function render() {
      var _classnames;

      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.toolbar ? this.context.chamelTheme.toolbar : _ChamelThemeService2.default.defaultTheme.toolbar;

      var classes = (0, _classnames3.default)(theme.toolbarGroup, (_classnames = {}, _defineProperty(_classnames, theme.toolbarGroupLeft, this.props.align === 'left'), _defineProperty(_classnames, theme.toolbarGroupRight, this.props.align === 'right'), _classnames));

      return _react2.default.createElement(
        'div',
        { className: classes },
        this.props.children
      );
    }
  }]);

  return ToolbarGroup;
}(_react2.default.Component);

ToolbarGroup.propTypes = {
  align: _react2.default.PropTypes.string
};
ToolbarGroup.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};
exports.default = ToolbarGroup;
module.exports = exports['default'];