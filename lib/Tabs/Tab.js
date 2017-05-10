'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Render a tab
 */
var Tab = function (_Component) {
  _inherits(Tab, _Component);

  function Tab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref, [this].concat(args))), _this), _this.handleTouchTap = function (e) {
      _this.props.handleTouchTap(_this.props.tabIndex, _this);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Define the types of properties the component will receive
   */


  /**
   * An alternate theme may be passed down by a provider
   */


  _createClass(Tab, [{
    key: 'render',
    value: function render() {
      var _classnames;

      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.tabs ? this.context.chamelTheme.tabs : _ChamelThemeService2.default.defaultTheme.tabs;

      var styles = {
        width: this.props.width
      };

      var classes = (0, _classnames3.default)(theme.tabItem, (_classnames = {}, _defineProperty(_classnames, theme.tabIsActive, this.props.selected), _defineProperty(_classnames, theme.tabItemSecondary, this.props.secondary), _defineProperty(_classnames, theme.tabItemSecondaryIsActive, this.props.selected && this.props.secondary), _classnames));

      return _react2.default.createElement(
        'div',
        {
          className: classes,
          style: styles,
          onClick: this.handleTouchTap
        },
        this.props.label
      );
    }
  }]);

  return Tab;
}(_react.Component);

Tab.propTypes = {
  handleTouchTap: _propTypes2.default.func,
  selected: _propTypes2.default.bool,

  /**
   * Secondary or inline tab
   */
  secondary: _propTypes2.default.bool
};
Tab.contextTypes = {
  chamelTheme: _propTypes2.default.object
};
exports.default = Tab;
module.exports = exports['default'];