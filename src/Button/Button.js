import React, { Component, PropTypes } from 'react';
import TouchRipple from '../ripples/TouchRipple';
import Tappable from 'react-tappable';
import classnames from 'classnames';

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const Button = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.button)
        ? context.chamelTheme.button : {};

    // Setup classes
    const className = props.className || null;
    const type = props.type ;
    const classes = classnames(theme[type], {
        [theme[type + "primary"]]: props.primary,
        [theme[type + "accent"]]: props.accent,
        [theme[type + "disabled"]]: props.disabled,
        [theme[type + "mini"]]: props.mini
    }, className);

    if (props.onTap && !props.disabled) {
        return (
            <Tappable onTap={props.onTap}>
                <button className={classes}>
                    <TouchRipple>
                        {props.children}
                    </TouchRipple>
                </button>
            </Tappable>
        );
    } else {
        return (
            <button disabled={props.disabled} className={classes}>{props.children}</button>
        );
    }
};

/**
 * Set accepted properties
 */
Button.propTypes = {
    accent: PropTypes.bool,
    primary: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    flat: PropTypes.bool,
    floating: PropTypes.bool,
    href: PropTypes.string,
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    inverse: PropTypes.bool,
    label: PropTypes.string,
    mini: PropTypes.bool,
    neutral: PropTypes.bool,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    raised: PropTypes.bool,
    type: PropTypes.oneOf(['raised', 'flat', 'floating', 'icon'])
};

/**
 * Set property defaults
 */
Button.defaultProps = {
    accent: false,
    className: '',
    flat: false,
    floating: false,
    mini: false,
    neutral: true,
    primary: false,
    raised: false,
    type: "raised"
};

/**
 * An alternate theme may be passed down by a provider
 */
Button.contextTypes = {
    chamelTheme: React.PropTypes.object
};


// Check for commonjs
if (module) {
    module.exports = Button;
}

export default Button;
