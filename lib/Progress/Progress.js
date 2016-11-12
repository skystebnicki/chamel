'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

var _prefixer = require('../utils/prefixer.js');

var _prefixer2 = _interopRequireDefault(_prefixer);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Progress = function (_Component) {
  _inherits(Progress, _Component);

  function Progress() {
    _classCallCheck(this, Progress);

    return _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
  }

  _createClass(Progress, [{
    key: 'calculateRatio',
    value: function calculateRatio(value) {
      if (value < this.props.min) return 0;
      if (value > this.props.max) return 1;
      return (value - this.props.min) / (this.props.max - this.props.min);
    }
  }, {
    key: 'circularStyle',
    value: function circularStyle() {
      if (this.props.mode !== 'indeterminate') {
        return { strokeDasharray: 2 * Math.PI * 25 * this.calculateRatio(this.props.value) + ', 400' };
      }
    }
  }, {
    key: 'linearStyle',
    value: function linearStyle() {
      if (this.props.mode !== 'indeterminate') {
        return {
          buffer: (0, _prefixer2.default)({ transform: 'scaleX(' + this.calculateRatio(this.props.buffer) + ')' }),
          value: (0, _prefixer2.default)({ transform: 'scaleX(' + this.calculateRatio(this.props.value) + ')' })
        };
      } else {
        return {};
      }
    }
  }, {
    key: 'renderCircular',
    value: function renderCircular(theme) {
      return _react2.default.createElement(
        'svg',
        { className: theme.circle, viewBox: '0 0 60 60' },
        _react2.default.createElement('circle', { className: theme.path, style: this.circularStyle(), cx: '30', cy: '30', r: '25' })
      );
    }
  }, {
    key: 'renderLinear',
    value: function renderLinear(theme) {
      var _linearStyle = this.linearStyle(),
          buffer = _linearStyle.buffer,
          value = _linearStyle.value;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('span', { ref: 'buffer', 'data-ref': 'buffer', className: theme.buffer, style: buffer }),
        _react2.default.createElement('span', { ref: 'value', 'data-ref': 'value', className: theme.value, style: value })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.progress ? this.context.chamelTheme.progress : _ChamelThemeService2.default.defaultTheme.progress;

      var _props = this.props,
          className = _props.className,
          disabled = _props.disabled,
          max = _props.max,
          min = _props.min,
          mode = _props.mode,
          multicolor = _props.multicolor,
          type = _props.type,
          value = _props.value;

      var _className = (0, _classnames3.default)(theme[type], (_classnames = {}, _defineProperty(_classnames, theme[mode], mode), _defineProperty(_classnames, theme.multicolor, multicolor), _classnames), className);

      return _react2.default.createElement(
        'div',
        {
          disabled: disabled,
          'data-react-toolbox': 'progress-bar',
          'aria-valuenow': value,
          'aria-valuemin': min,
          'aria-valuemax': max,
          className: _className
        },
        type === 'circular' ? this.renderCircular(theme) : this.renderLinear(theme)
      );
    }
  }]);

  return Progress;
}(_react.Component);

Progress.propTypes = {
  buffer: _react.PropTypes.number,
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  max: _react.PropTypes.number,
  min: _react.PropTypes.number,
  mode: _react.PropTypes.oneOf(['determinate', 'indeterminate']),
  multicolor: _react.PropTypes.bool,
  type: _react.PropTypes.oneOf(['linear', 'circular']),
  value: _react.PropTypes.number
};
Progress.defaultProps = {
  buffer: 0,
  className: '',
  max: 100,
  min: 0,
  mode: 'indeterminate',
  multicolor: false,
  type: 'circular',
  value: 0
};
exports.default = Progress;
module.exports = exports['default'];