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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overlay = function (_React$Component) {
  _inherits(Overlay, _React$Component);

  function Overlay() {
    _classCallCheck(this, Overlay);

    return _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).apply(this, arguments));
  }

  _createClass(Overlay, [{
    key: 'componentDidUpdate',


    /**
     * Set property defaults
     */
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.autoLockScrolling) this.props.show ? this._preventScrolling() : this._allowScrolling();
    }

    /**
     * An alternate theme may be passed down by a provider
     */


    /**
     * Set accepted properties
     */

  }, {
    key: 'render',
    value: function render() {

      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.overlay ? this.context.chamelTheme.overlay : _ChamelThemeService2.default.defaultTheme.overlay;

      var _props = this.props;
      var className = _props.className;

      var other = _objectWithoutProperties(_props, ['className']);
      var classes = (0, _classnames3.default)(theme.overlay, _defineProperty({}, theme.overlayVisible, this.props.show));

      return _react2.default.createElement('div', { className: classes, onClick: this.props.onClick });
    }
  }, {
    key: 'preventScrolling',
    value: function preventScrolling() {
      if (!this.props.autoLockScrolling) this._preventScrolling();
    }
  }, {
    key: 'allowScrolling',
    value: function allowScrolling() {
      if (!this.props.autoLockScrolling) this._allowScrolling();
    }
  }, {
    key: '_preventScrolling',
    value: function _preventScrolling() {
      var body = document.getElementsByTagName('body')[0];
      body.style.overflow = 'hidden';
    }
  }, {
    key: '_allowScrolling',
    value: function _allowScrolling() {
      var body = document.getElementsByTagName('body')[0];
      body.style.overflow = '';
    }
  }]);

  return Overlay;
}(_react2.default.Component);

Overlay.propTypes = {
  show: _react2.default.PropTypes.bool,
  autoLockScrolling: _react2.default.PropTypes.bool,
  onClick: _react2.default.PropTypes.func
};
Overlay.defaultProps = {
  autoLockScrolling: true
};
Overlay.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};
;

// Check for commonjs
if (module) {
  module.exports = Overlay;
}

exports.default = Overlay;
module.exports = exports['default'];