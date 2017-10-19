import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * Functional component for any floating action button
 *
 * @param props
 * @returns {ReactDOM}
 * @constructor
 */
const FloatingButton = props => {
  return (
    <Button type={'floating'} {...props}>
      {props.children}
    </Button>
  );
};

/**
 * Set accepted properties
 */
FloatingButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  inverse: PropTypes.bool,
  label: PropTypes.string,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTap: PropTypes.func,
};

/**
 * Set property defaults
 */
FloatingButton.defaultProps = {
  className: '',
};

/**
 * An alternate theme may be passed down by a provider
 */
FloatingButton.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default FloatingButton;
