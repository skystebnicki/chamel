import React from 'react';
import ReactDOM from 'react-dom';

const SlideInChild = props => {
  let { children, className, ...other } = props;

  let classes = 'chamel-transition-slide-in-child';
  if (props.className) classes += ' ' + props.className;

  return <div className={classes}>{children}</div>;
};

export default SlideInChild;
