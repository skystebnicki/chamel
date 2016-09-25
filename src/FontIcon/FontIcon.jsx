import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const FontIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : {};

    let {
      className,
      ...other
    } = props;

    const classes = classnames(theme.fontIcon, className);

    return (
        <span {...other} className={classes} />
    );
}

/**
 * Set accepted properties
 */
FontIcon.propTypes = {
  className: PropTypes.string
};

/**
 * Set property defaults
 */
FontIcon.defaultProps = {
  className: ''
};

/**
 * An alternate theme may be passed down by a provider
 */
FontIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

// Check for commonjs
if (module) {
  module.exports = FontIcon;
}

export default FontIcon;
