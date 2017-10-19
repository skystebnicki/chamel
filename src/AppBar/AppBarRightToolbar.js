import React from 'react';
import PropTypes from 'prop-types';

/**
 * The right toolbar for an AppBar
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const AppBarRightToolbar = props => {
  return <div className={props.className}>{props.children}</div>;
};

/**
 * Set accepted properties
 */
AppBarRightToolbar.propTypes = {
  /**
   * Optional class override
   */
  className: PropTypes.string,

  /**
   * Child elements (text and icon)
   */
  children: PropTypes.node,
};

/**
 * Set property defaults
 */
AppBarRightToolbar.defaultProps = {
  className: null,
};

/**
 * An alternate theme may be passed down by a provider
 */
AppBarRightToolbar.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default AppBarRightToolbar;
