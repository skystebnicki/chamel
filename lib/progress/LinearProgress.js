'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');

var LinearProgress = React.createClass({
  displayName: 'LinearProgress',


  /**
   * Expected props
   */
  propTypes: {
    mode: React.PropTypes.oneOf(["determinate", "indeterminate"]),
    value: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number
  },

  /**
   * Get percentage relative to min and max
   *
   * @return {int} 0-100
   */
  _getRelativeValue: function _getRelativeValue() {
    var value = this.props.value;
    var min = this.props.min;
    var max = this.props.max;

    var clampedValue = Math.min(Math.max(min, value), max);
    var rangeValue = max - min;
    var relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
    return relValue * 100;
  },


  /**
   * Triggered when the component enters the dom for the first time
   */
  componentDidMount: function componentDidMount() {
    var _this = this;

    var bar1 = ReactDOM.findDOMNode(this.refs.bar1);
    var bar2 = ReactDOM.findDOMNode(this.refs.bar2);

    this._barUpdate(0, bar1, [[-35, 100], [100, -90]]);

    setTimeout(function () {
      _this._barUpdate(0, bar2, [[-200, 100], [107, -8]]);
    }, 850);
  },
  _barUpdate: function _barUpdate(step, barElement, stepValues) {
    step = step || 0;
    step %= 4;
    setTimeout(this._barUpdate.bind(this, step + 1, barElement, stepValues), 420);
    if (!this.isMounted()) return;
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
  },
  getDefaultProps: function getDefaultProps() {
    return {
      mode: "indeterminate",
      value: 0,
      min: 0,
      max: 100
    };
  },
  render: function render() {
    var _props = this.props;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['style']);

    var barStyle = {};

    var barClasses = "chamel-progress-bar ";
    if (this.props.mode === "determinate") {
      barClasses += "chamel-progress-bar-determinate";
      barStyle.width = this._getRelativeValue() + "%";
    } else {
      barClasses += "chamel-progress-bar-indeterminate";
    }

    return React.createElement(
      'div',
      _extends({}, other, { className: 'chamel-progress' }),
      React.createElement(
        'div',
        { className: barClasses, style: barStyle },
        React.createElement('div', { ref: 'bar1', className: 'chamel-progress-bar-left' }),
        React.createElement('div', { ref: 'bar2', className: 'chamel-progress-bar-right' })
      )
    );
  }
});

module.exports = LinearProgress;