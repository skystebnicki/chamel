import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * Functional component for any raised button
 *
 * @param props
 * @returns {ReactDOM}
 * @constructor
 */
const RaisedButton = props => {
  return (
    <Button type={'raised'} {...props}>
      {props.children}
    </Button>
  );
};

/**
 * Set accepted properties
 */
RaisedButton.propTypes = {
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
RaisedButton.defaultProps = {
  className: '',
};

/**
 * An alternate theme may be passed down by a provider
 */
RaisedButton.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default RaisedButton;
