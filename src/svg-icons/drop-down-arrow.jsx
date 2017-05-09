import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from './svg-icon';

const DropDownArrow = (props) => {

  return (
    <SvgIcon {...props}>
      <polygon points="7,9.5 12,14.5 17,9.5 "/>
    </SvgIcon>
  );

}

export default DropDownArrow;
