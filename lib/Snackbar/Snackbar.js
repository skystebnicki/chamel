'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _FlatButton = require('../Button/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Create a snackbar notice
 */
var Snackbar = function (_React$Component) {
  _inherits(Snackbar, _React$Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function Snackbar(props) {
    _classCallCheck(this, Snackbar);

    var _this = _possibleConstructorReturn(this, (Snackbar.__proto__ || Object.getPrototypeOf(Snackbar)).call(this, props));
    // Call parent constructor


    _this.state = {
      open: _this.props.openOnMount || false
    };
    return _this;
  }

  /**
   * An alternate theme may be passed down by a provider
   */


  _createClass(Snackbar, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (prevState.open != this.state.open && this.props.timeout) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(function () {
          _this2.dismiss();
        }, this.props.timeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.snackbar ? this.context.chamelTheme.snackbar : _ChamelThemeService2.default.defaultTheme.snackbar;

      var classes = (0, _classnames3.default)(theme.snackbar, _defineProperty({}, theme.snackbarIsOpen, this.state.open));
      var action;

      if (this.props.action) {
        action = _react2.default.createElement(_FlatButton2.default, {
          className: theme.snackbarAction,
          label: this.props.action,
          onClick: this.props.onActionClick });
      }

      return _react2.default.createElement(
        'span',
        { className: classes },
        _react2.default.createElement(
          'span',
          { className: theme.snackbarMessage },
          this.props.message
        ),
        action
      );
    }
  }, {
    key: 'show',
    value: function show() {
      this.setState({ open: true });
    }
  }, {
    key: 'dismiss',
    value: function dismiss() {
      this.setState({ open: false });
    }
  }]);

  return Snackbar;
}(_react2.default.Component);

Snackbar.propTypes = {
  action: _react2.default.PropTypes.string,
  message: _react2.default.PropTypes.string.isRequired,
  openOnMount: _react2.default.PropTypes.bool,
  onActionClick: _react2.default.PropTypes.func,
  timeout: _react2.default.PropTypes.number
};
Snackbar.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};
exports.default = Snackbar;
module.exports = exports['default'];