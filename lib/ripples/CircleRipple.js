'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CircleRipple = function (_React$Component) {
  _inherits(CircleRipple, _React$Component);

  function CircleRipple() {
    _classCallCheck(this, CircleRipple);

    return _possibleConstructorReturn(this, (CircleRipple.__proto__ || Object.getPrototypeOf(CircleRipple)).apply(this, arguments));
  }

  _createClass(CircleRipple, [{
    key: 'render',


    /**
     * Set accepted properties
     */
    value: function render() {
      var _classnames;

      var theme = this.context.chamelTheme && this.context.chamelTheme.ripple ? this.context.chamelTheme.ripple : {};

      var classes = (0, _classnames4.default)(theme.rippleCircle, (_classnames = {}, _defineProperty(_classnames, theme.rippleCircleIsStarted, this.props.started), _defineProperty(_classnames, theme.rippleCircleIsEnding, this.props.ending), _classnames));

      var innerClasses = (0, _classnames4.default)(theme.rippleCircleInner, _defineProperty({}, theme.rippleCircleIsStartedInner, this.props.started));

      return _react2.default.createElement(
        'div',
        { className: classes, style: this.props.style },
        _react2.default.createElement('div', { className: innerClasses })
      );
    }

    /**
     * An alternate theme may be passed down by a provider
     */

  }]);

  return CircleRipple;
}(_react2.default.Component);

CircleRipple.propTypes = {
  className: _react2.default.PropTypes.string,
  started: _react2.default.PropTypes.bool,
  ending: _react2.default.PropTypes.bool,
  style: _react2.default.PropTypes.object
};
CircleRipple.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};
exports.default = CircleRipple;
module.exports = exports['default'];