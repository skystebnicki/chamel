import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class LinkMenuItem extends Component {
  render() {
    const classes = this.getClasses('chamel-menu-item', {
      'chamel-is-disabled': this.props.disabled,
    });
    var onClickHandler = this.props.disabled ? this._stopLink : undefined;
    // Prevent context menu 'Open In New Tab/Window'
    var linkAttribute = this.props.disabled ? 'data-href' : 'href';
    let link = {};
    link[linkAttribute] = this.props.payload;

    return (
      <a
        key={this.props.index}
        className={classes}
        {...link}
        target={this.props.target}
        onClick={onClickHandler}
      >
        {this.props.text}
      </a>
    );
  }

  _stopLink = event => {
    event.preventDefault();
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

  getClassSet = classString => {
    let classObj = {};

    if (classString) {
      classString.split(' ').forEach(function(className) {
        if (className) classObj[className] = true;
      });
    }

    return classObj;
  };
}

LinkMenuItem.propTypes = {
  index: PropTypes.number.isRequired,
  payload: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  target: PropTypes.string,
  disabled: PropTypes.bool,
};

LinkMenuItem.defaultProps = {
  disabled: false,
};

export default LinkMenuItem;
