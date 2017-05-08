import React from 'react';
import PropTypes from 'prop-types';

const getClasses = (initialClasses, additionalClassObj) => {
  var classString = '';

  //Initialize the classString with the classNames that were passed in
  if (props.className) classString += ' ' + props.className;

  //Add in initial classes
  if (typeof initialClasses === 'object') {
    classString += ' ' + classNames(initialClasses);
  } else {
    classString += ' ' + initialClasses;
  }

  //Add in additional classes
  if (additionalClassObj) classString += ' ' + classNames(additionalClassObj);

  //Convert the class string into an object and run it through the class set
  return classNames(getClassSet(classString));
};

const getClassSet = (classString) => {
  var classObj = {};

  if (classString) {
    classString.split(' ').forEach(function (className) {
      if (className) classObj[className] = true;
    });
  }

  return classObj;
};

const LinkMenuItem = (props) => {

  const classes = getClasses('chamel-menu-item', {
    'chamel-is-disabled': props.disabled
  });
  const onClickHandler = (props.disabled) ? (event) => {
    event.preventDefault();
  } : undefined;
  // Prevent context menu 'Open In New Tab/Window'
  const linkAttribute = (props.disabled) ? 'data-href' : 'href';
  let link = {};
  link[linkAttribute] = props.payload

  return (
    <a key={props.index} className={classes} {...link} target={props.target} onClick={onClickHandler}>{props.text}</a>
  );
}

LinkMenuItem.propTypes = {
  index: PropTypes.number.isRequired,
  payload: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  target: PropTypes.string,
  disabled: PropTypes.bool
};

LinkMenuItem.defaultProps = {
  disabled: false
};

export default LinkMenuItem;
