import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class SvgIcon extends Component {

  render() {
    const classes = this.getClasses('chamel-svg-icon');

    return (
      <svg
        {...this.props}
        className={classes}
        viewBox="0 0 24 24">
        {this.props.children}
      </svg>
    );
  };

  getClasses = (initialClasses, additionalClassObj) => {
    let classString = '';

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
    let classObj = {};

    if (classString) {
      classString.split(' ').forEach(function (className) {
        if (className) classObj[className] = true;
      });
    }

    return classObj;
  };
}

module.exports = SvgIcon;