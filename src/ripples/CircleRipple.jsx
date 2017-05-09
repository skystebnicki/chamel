import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import ThemeService from '../styles/ChamelThemeService';

class CircleRipple extends Component {

  /**
   * Set accepted properties
   */
  static propTypes = {
    className: PropTypes.string,
    started: PropTypes.bool,
    ending: PropTypes.bool,
    style: PropTypes.object
  };

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
    chamelTheme: PropTypes.object
  };

  render() {

    let theme = (this.context.chamelTheme && this.context.chamelTheme.ripple)
      ? this.context.chamelTheme.ripple : ThemeService.defaultTheme.ripple;

    let classes = classnames(theme.rippleCircle, {
      [theme.rippleCircleIsStarted]: this.props.started,
      [theme.rippleCircleIsEnding]: this.props.ending
    });

    let innerClasses = classnames(theme.rippleCircleInner, {
      [theme.rippleCircleIsStartedInner]: this.props.started
    });

    return (
      <div className={classes} style={this.props.style}>
        <div className={innerClasses} />
      </div>
    );
  }
}

export default CircleRipple;
