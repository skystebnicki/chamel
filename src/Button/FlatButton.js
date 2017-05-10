import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * Functional component for any flat button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const FlatButton = (props, context) => {
  return (
    <Button type={'flat'} {...props}>{props.children}</Button>
  );
};

/**
 * Set accepted properties
 */
FlatButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  inverse: PropTypes.bool,
  label: PropTypes.string,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTap: PropTypes.func,
  /**
   * Alias for onTap for backwards compatibility
   */
  onClick: PropTypes.func
};

/**
 * Set property defaults
 */
FlatButton.defaultProps = {
  className: ''
};

/**
 * An alternate theme may be passed down by a provider
 */
FlatButton.contextTypes = {
  chamelTheme: PropTypes.object
};


export default FlatButton;
