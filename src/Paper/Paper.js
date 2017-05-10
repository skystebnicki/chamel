/**
 * Paper is a concept taken from google Material design standards
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Small application component
 */
class Paper extends Component {

  /**
   * Set accepted properties
   */
  static propTypes = {
    circle: PropTypes.bool,
    innerClassName: PropTypes.string,
    rounded: PropTypes.bool,
    style: PropTypes.object,
    zDepth: PropTypes.oneOf([0,1,2,3,4,5])
  };

  /**
   * Set property defaults
   */
  static defaultProps = {
    innerClassName: '',
    rounded: true,
    zDepth: 1,
    style: null
  };

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
    chamelTheme: PropTypes.object
  };

  render() {

    // Determine which theme to use
    const theme = (this.context.chamelTheme && this.context.chamelTheme.paper)
      ? this.context.chamelTheme.paper : ThemeService.defaultTheme.paper;

    let classes = theme.paper;

    if (this.props.className) {
      classes += " " + this.props.className;
    }

    classes += " " + theme["paperZDepth" + this.props.zDepth];

    if (this.props.rounded) {
      classes += " " + theme.paperRounded;
    }

    if (this.props.circle) {
      classes += " " + theme.paperCircle;
    }

    const insideClasses =
      this.props.innerClassName + ' ' +
      theme.paperContainer + ' ' +
      theme["paperZDepth" + this.props.zDepth + "Bottom"];

    return (
      <div className={classes} style={this.props.style} ref="innerContainer">
          {this.props.children}
      </div>
    );
  }

  getInnerContainer() {
    return this.refs.innerContainer;
  }
}

export default Paper;
