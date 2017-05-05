import React from 'react';
import PropTypes from 'prop-types';
import Classable from '../mixins/classable';

const LinkMenuItem = (props) => {

  // mixins: [Classable],

  const classes = this.getClasses('chamel-menu-item', {
    'chamel-is-disabled': this.props.disabled
  });
  const onClickHandler = (this.props.disabled) ? this._stopLink : undefined;
  // Prevent context menu 'Open In New Tab/Window'
  const linkAttribute = (this.props.disabled) ? 'data-href' : 'href';
  let link = {};
  link[linkAttribute] = this.props.payload

  return (
      <a key={this.props.index} className={classes} {...link} target={this.props.target} onClick={onClickHandler}>{this.props.text}</a>
  );

  _stopLink = (event) => {
    event.preventDefault();
  };

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
