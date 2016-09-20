'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Linear progress bar
 */
var LinearProgress = function (_React$Component) {
  _inherits(LinearProgress, _React$Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */


  /**
   * Set propery defaults
   */
  function LinearProgress(props) {
    _classCallCheck(this, LinearProgress);

    var _this = _possibleConstructorReturn(this, (LinearProgress.__proto__ || Object.getPrototypeOf(LinearProgress)).call(this, props));
    // Call parent constructor


    _this.state = {
      timer: null
    };
    return _this;
  }

  /**
   * Get percentage relative to min and max
   *
   * @return {int} 0-100
   */


  /**
   * An alternate theme may be passed down by a provider
   */


  /**
   * Expected props
   */


  _createClass(LinearProgress, [{
    key: '_getRelativeValue',
    value: function _getRelativeValue() {
      var value = this.props.value;
      var min = this.props.min;
      var max = this.props.max;

      var clampedValue = Math.min(Math.max(min, value), max);
      var rangeValue = max - min;
      var relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
      return relValue * 100;
    }

    /**
     * Triggered when the component enters the dom for the first time
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var bar1 = _reactDom2.default.findDOMNode(this.refs.bar1);
      var bar2 = _reactDom2.default.findDOMNode(this.refs.bar2);

      this._barUpdate(0, bar1, [[-35, 100], [100, -90]]);

      /*
      let timer = setTimeout(() => {
        this._barUpdate(0, bar2, [
          [-200, 100],
          [107, -8],
        ]);
      }, 850);
       // Save the timer state so we can cancel it later
      this.setState({timer: timer});*/
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.state.timer) {
        clearTimeout(this.state.timer);
      }
    }
  }, {
    key: '_barUpdate',
    value: function _barUpdate(step, barElement, stepValues) {
      var _this2 = this;

      step = step || 0;
      step %= 4;
      var newTimer = setTimeout(function () {
        _this2._barUpdate(step + 1, barElement, stepValues);
      }, 420);

      if (this.props.mode !== "indeterminate") return;

      var right = 'right';
      var left = 'left';

      if (step === 0) {
        barElement.style[left] = stepValues[0][0] + "%";
        barElement.style[right] = stepValues[0][1] + "%";
      } else if (step === 1) {
        barElement.style.transitionDuration = "840ms";
      } else if (step === 2) {
        barElement.style[left] = stepValues[1][0] + "%";
        barElement.style[right] = stepValues[1][1] + "%";
      } else if (step === 3) {
        barElement.style.transitionDuration = "0ms";
      }

      this.setState({ timer: newTimer });
    }
  }, {
    key: 'render',
    value: function render() {
      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.progress ? this.context.chamelTheme.progress : _ChamelThemeService2.default.defaultTheme.progress;

      var _props = this.props;
      var style = _props.style;

      var other = _objectWithoutProperties(_props, ['style']);

      var barStyle = {};

      var barClasses = theme.progressBar + " ";
      if (this.props.mode === "determinate") {
        barClasses += theme.progressBarDeterminate;
        barStyle.width = this._getRelativeValue() + "%";
      } else {
        barClasses += theme.progressBarIndeterminate;
      }

      return _react2.default.createElement(
        'div',
        _extends({}, other, { className: theme.progress }),
        _react2.default.createElement(
          'div',
          { className: barClasses, style: barStyle },
          _react2.default.createElement('div', { ref: 'bar1', className: theme.progressBarLeft }),
          _react2.default.createElement('div', { ref: 'bar2', className: theme.progressBarRight })
        )
      );
    }
  }]);

  return LinearProgress;
}(_react2.default.Component);

LinearProgress.propTypes = {
  mode: _react2.default.PropTypes.oneOf(["determinate", "indeterminate"]),
  value: _react2.default.PropTypes.number,
  min: _react2.default.PropTypes.number,
  max: _react2.default.PropTypes.number
};
LinearProgress.defaultProps = {
  mode: "indeterminate",
  value: 0,
  min: 0,
  max: 100
};
LinearProgress.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};
exports.default = LinearProgress;
module.exports = exports['default'];