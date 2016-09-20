/**
 * Paper is a concept taken from google Material design standards
 */
import React from 'react';

/**
 * Small application component
 */
class Paper extends React.Component {

  /**
   * Set accepted properties
   */
  static propTypes = {
    circle: React.PropTypes.bool,
    innerClassName: React.PropTypes.string,
    rounded: React.PropTypes.bool,
    style: React.PropTypes.object,
    zDepth: React.PropTypes.oneOf([0,1,2,3,4,5])
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
    chamelTheme: React.PropTypes.object
  };

  render() {

    // Determine which theme to use
    let theme = (this.context.chamelTheme && this.context.chamelTheme.paper)
      ? this.context.chamelTheme.paper : {};

    var classes = theme.paper;

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

    var insideClasses =
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

// Check for commonjs
if (module) {
  module.exports = Paper;
}

export default Paper;
