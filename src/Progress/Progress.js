import React, { Component, PropTypes } from 'react';
import ThemeService from '../styles/ChamelThemeService';
import prefixer from '../utils/prefixer.js';
import classnames from 'classnames';

class Progress extends Component {
  static propTypes = {
    buffer: PropTypes.number,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    mode: PropTypes.oneOf(['determinate', 'indeterminate']),
    multicolor: PropTypes.bool,
    type: PropTypes.oneOf(['linear', 'circular']),
    value: PropTypes.number
  };

  static defaultProps = {
    buffer: 0,
    className: '',
    max: 100,
    min: 0,
    mode: 'indeterminate',
    multicolor: false,
    type: 'circular',
    value: 0
  };

  calculateRatio (value) {
    if (value < this.props.min) return 0;
    if (value > this.props.max) return 1;
    return (value - this.props.min) / (this.props.max - this.props.min);
  }

  circularStyle () {
    if (this.props.mode !== 'indeterminate') {
      return {strokeDasharray: `${2 * Math.PI * 25 * this.calculateRatio(this.props.value)}, 400`};
    }
  }

  linearStyle () {
    if (this.props.mode !== 'indeterminate') {
      return {
        buffer: prefixer({transform: `scaleX(${this.calculateRatio(this.props.buffer)})`}),
        value: prefixer({transform: `scaleX(${this.calculateRatio(this.props.value)})`})
      };
    } else {
      return {};
    }
  }

  renderCircular (theme) {
    return (
      <svg className={theme.circle} viewBox="0 0 60 60">
        <circle className={theme.path} style={this.circularStyle()} cx='30' cy='30' r='25' />
      </svg>
    );
  }

  renderLinear (theme) {
    const {buffer, value} = this.linearStyle();
    return (
      <div>
        <span ref='buffer' data-ref='buffer' className={theme.buffer} style={buffer}/>
        <span ref='value' data-ref='value' className={theme.value} style={value}/>
      </div>
    );
  }

  render () {
    // Determine which theme to use
    let theme = (this.context.chamelTheme && this.context.chamelTheme.progress)
      ? this.context.chamelTheme.progress : ThemeService.defaultTheme.progress;

    const { className, disabled, max, min, mode, multicolor, type, value } = this.props;
    const _className = classnames(theme[type], {
      [theme[mode]]: mode,
      [theme.multicolor]: multicolor
    }, className);

    return (
      <div
        disabled={disabled}
        data-react-toolbox='progress-bar'
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        className={_className}
      >
        {type === 'circular' ? this.renderCircular(theme) : this.renderLinear(theme)}
      </div>
    );
  }
}

export default Progress;
