import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class Tooltip extends Component {
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
        <div ref="ripple" className="chamel-tooltip-ripple"/>
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
  };

  getClasses = (initialClasses, additionalClassObj) => {
    var classString = '';

    //Initialize the classString with the classNames that were passed in
    if (this.props.className) classString += ' ' + this.props.className;

    //Add in initial classes
    if (typeof initialClasses === 'object') {
      classString += ' ' + classNames(initialClasses);
    } else {
      classString += ' ' + initialClasses;
    }

    //Add in additional classes
    if (additionalClassObj) classString += ' ' + classNames(additionalClassObj);

    //Convert the class string into an object and run it through the class set
    return classNames(this.getClassSet(classString));
  };

  getClassSet = (classString) => {
    var classObj = {};

    if (classString) {
      classString.split(' ').forEach(function (className) {
        if (className) classObj[className] = true;
      });
    }

    return classObj;
  };
}

Tooltip.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  show: PropTypes.bool,
  touch: PropTypes.bool
};

export default Tooltip;
