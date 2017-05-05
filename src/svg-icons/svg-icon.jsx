import React from 'react';
import Classable from '../mixins/classable';

const SvgIcon = (props) => {

  // mixins: [Classable],

  const classes = this.getClasses('chamel-svg-icon');

  return (
    <svg
      {...this.props}
      className={classes}
      viewBox="0 0 24 24">
      {this.props.children}
    </svg>
  );

}

export default SvgIcon;
