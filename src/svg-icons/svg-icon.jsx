import React from 'react';

const SvgIcon = (props) => {

  return (
    <svg
      {...props}
      className={'chamel-svg-icon'}
      viewBox="0 0 24 24">
      {props.children}
    </svg>
  );
}

module.exports = SvgIcon;