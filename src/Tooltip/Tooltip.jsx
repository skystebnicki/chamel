import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Classable from '../mixins/classable';

class Tooltip extends Component {

  // mixins: [Classable],
  componentDidMount() {
    this._setRippleSize();
  }

  componentDidUpdate(prevProps, prevState) {
    this._setRippleSize();
  }

  render() {

    let {
      className,
      label,
      ...other } = this.props;
    const classes = this.getClasses('chamel-tooltip', {
      'chamel-is-shown': this.props.show,
      'chamel-is-touch': this.props.touch
    });

    return (
      <div className={classes}>
        <div ref="ripple" className="chamel-tooltip-ripple" />
        <span className="chamel-tooltip-label">{this.props.label}</span>
      </div>
    );
  }

  _setRippleSize = () => {
    let ripple = ReactDOM.findDOMNode(this.refs.ripple);
    const tooltipSize = ReactDOM.findDOMNode(this).offsetWidth;
    const ripplePadding = this.props.touch ? 45 : 20;
    const rippleSize = tooltipSize + ripplePadding + 'px';

    if (this.props.show) {
      ripple.style.height = rippleSize;
      ripple.style.width = rippleSize;
    } else {
      ripple.style.width = '0px';
      ripple.style.height = '0px';
    }
  }

}

Tooltip.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  show: PropTypes.bool,
  touch: PropTypes.bool
};

// Check for commonjs
if (module) {
  module.exports = Tooltip;
}

export default Tooltip;
