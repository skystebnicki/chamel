import React from 'react';
import PropTypes from 'prop-types';

const SubheaderMenuItem = (props) => {
  return (
    <div key={props.index} className="chamel-subheader">{props.text}</div>
  );
}

SubheaderMenuItem.propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
};

export default SubheaderMenuItem;
