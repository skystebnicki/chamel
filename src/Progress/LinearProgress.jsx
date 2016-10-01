import React from 'react';
import ReactDOM from 'react-dom';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Linear progress bar
 */
class LinearProgress extends React.Component {

  /**
   * Expected props
   */
  static propTypes = {
    mode: React.PropTypes.oneOf(["determinate", "indeterminate"]),
    value: React.PropTypes.number,
    min:  React.PropTypes.number,
    max:  React.PropTypes.number,
  };

  /**
   * Set propery defaults
   */
  static defaultProps = {
    mode: "indeterminate",
    value: 0,
    min: 0,
    max: 100,
  };

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
    chamelTheme: React.PropTypes.object
  };

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call parent constructor
    super(props);

    this.state = {
      timer: null
    }
  }

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
  }

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

  componentWillUnmount() {
    if (this.state.timer) {
      clearTimeout(this.state.timer);
    }
  }

  _barUpdate(step, barElement, stepValues) {
    step = step || 0;
    step %= 4;
    let newTimer = setTimeout(
      () => { this._barUpdate(step + 1, barElement, stepValues) },
      420
    );

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

    this.setState({timer: newTimer});
  }

  render() {
    // Determine which theme to use
    let theme = (this.context.chamelTheme && this.context.chamelTheme.progress)
      ? this.context.chamelTheme.progress : ThemeService.defaultTheme.progress;

    let {
      style,
      ...other
    } = this.props;

    let barStyle = {};

    let barClasses = theme.progressBar + " ";
    if (this.props.mode === "determinate") {
      barClasses += theme.progressBarDeterminate;
      barStyle.width = this._getRelativeValue() + "%";
    } else {
      barClasses += theme.progressBarIndeterminate;
    }

    return (
      <div {...other} className={theme.progress}>
        <div  className={barClasses} style={barStyle}>
          <div ref="bar1" className={theme.progressBarLeft}></div>
          <div ref="bar2" className={theme.progressBarRight}></div>
        </div>
      </div>
    );
  }
}

export default LinearProgress;
