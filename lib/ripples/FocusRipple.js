'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FocusRipple = function (_Component) {
  _inherits(FocusRipple, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function FocusRipple(props) {
    _classCallCheck(this, FocusRipple);

    // Call paprent constructor
    return _possibleConstructorReturn(this, (FocusRipple.__proto__ || Object.getPrototypeOf(FocusRipple)).call(this, props));
  }

  _createClass(FocusRipple, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setRippleSize();
    }
  }, {
    key: 'render',
    value: function render() {
      var theme = this.context.chamelTheme && this.context.chamelTheme.ripple ? this.context.chamelTheme.ripple : _ChamelThemeService2.default.defaultTheme.ripple;

      var classes = (0, _classnames3.default)(theme.rippleFocus, _defineProperty({}, theme.rippleShown, this.props.show));

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement('div', { className: theme.rippleFocusInner })
      );
    }

    /**
     * Try and determine the size of the ripple based on the size of this dom element
     */

  }, {
    key: 'setRippleSize',
    value: function setRippleSize() {
      var el = _reactDom2.default.findDOMNode(this);
      var height = el.offsetHeight;
      var width = el.offsetWidth;
      var size = Math.max(height, width);

      el.style.height = size + 'px';
      el.style.top = size / 2 * -1 + height / 2 + 'px';
    }
  }]);

  return FocusRipple;
}(_react.Component);

;

/**
 * Set accepted properties
 */
FocusRipple.propTypes = {
  show: _propTypes2.default.bool

  /**
   * Set property defaults
   */
};FocusRipple.defaultProps = {
  show: false

  /**
   * An alternate theme may be passed down by a provider
   */
};FocusRipple.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

// ES6
exports.default = FocusRipple;
module.exports = exports['default'];