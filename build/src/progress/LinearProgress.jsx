var React = require('react');
var ReactDOM = require('react-dom');

var LinearProgress = React.createClass({

  /**
   * Expected props
   */
  propTypes: {
    mode: React.PropTypes.oneOf(["determinate", "indeterminate"]),
    value: React.PropTypes.number,
    min:  React.PropTypes.number,
    max:  React.PropTypes.number,
  },

  /**
   * Get percentage relative to min and max
   *
   * @return {int} 0-100
   */
  _getRelativeValue() {
    let value = this.props.value;
    let min = this.props.min;
    let max = this.props.max;

    let clampedValue = Math.min(Math.max(min, value), max);
    let rangeValue = max - min;
    let relValue = Math.round(clampedValue / rangeValue * 10000) / 10000;
    return relValue * 100;
  },

  /**
   * Triggered when the component enters the dom for the first time
   */
  componentDidMount() {
    let bar1 = ReactDOM.findDOMNode(this.refs.bar1);
    let bar2 = ReactDOM.findDOMNode(this.refs.bar2);

    this._barUpdate(0, bar1, [
      [-35, 100],
      [100, -90],
    ]);

    setTimeout(() => {
      this._barUpdate(0, bar2, [
        [-200, 100],
        [107, -8],
      ]);
    }, 850);
  },

  _barUpdate(step, barElement, stepValues) {
    step = step || 0;
    step %= 4;
    setTimeout(this._barUpdate.bind(this, step + 1, barElement, stepValues), 420);
    if (!this.isMounted()) return;
    if (this.props.mode !== "indeterminate") return;

    const right = 'right';
    const left  = 'left';

    if (step === 0) {
      barElement.style[left] = stepValues[0][0] + "%";
      barElement.style[right] = stepValues[0][1] + "%";
    }
    else if (step === 1) {
      barElement.style.transitionDuration = "840ms";
    }
    else if (step === 2) {
      barElement.style[left] = stepValues[1][0] + "%";
      barElement.style[right] = stepValues[1][1] + "%";
    }
    else if (step === 3) {
      barElement.style.transitionDuration = "0ms";
    }
  },

  getDefaultProps() {
      return {
          mode: "indeterminate",
          value: 0,
          min: 0,
          max: 100,
      };
  },

  render() {
    let {
      style,
      ...other,
    } = this.props;

    let barStyle = {};

    let barClasses = "chamel-progress-bar ";
    if (this.props.mode === "determinate") {
      barClasses += "chamel-progress-bar-determinate";
      barStyle.width = this._getRelativeValue() + "%";
    } else {
      barClasses += "chamel-progress-bar-indeterminate";
    }


    return (
      <div {...other} className="chamel-progress">
        <div  className={barClasses} style={barStyle}>
          <div ref="bar1" className="chamel-progress-bar-left"></div>
          <div ref="bar2" className="chamel-progress-bar-right"></div>
        </div>
      </div>
    );
  },
});

module.exports = LinearProgress;