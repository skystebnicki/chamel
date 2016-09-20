import React, { Component, PropTypes } from 'react';
import Button from './Button';
import FontIcon from '../FontIcon';

/**
 * Functional component for any icon button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const IconButton = (props, context) => {

    const children = (props.iconClassName && !props.children) ? (
        <FontIcon className={props.iconClassName} />
    ) : props.children;

    return (
        <Button type={'icon'} {...props}>{children}</Button>
    );
};

/**
 * Set accepted properties
 */
IconButton.propTypes = {
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
    iconClassName: PropTypes.string
};

/**
 * Set property defaults
 */
IconButton.defaultProps = {
    className: ''
};

/**
 * An alternate theme may be passed down by a provider
 */
IconButton.contextTypes = {
    chamelTheme: React.PropTypes.object
};


// Check for commonjs
if (module) {
    module.exports = IconButton;
}

export default IconButton;
