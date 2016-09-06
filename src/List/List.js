import React, { PropTypes } from 'react';

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const List = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.button)
        ? context.chamelTheme.button : {};

    /*
    let childElements = Children.map(props.children, (child) => {
        if (isValidElement(child) && props.selectable) {

        } else {
            return child;
        }
        return isValidElement(child) ? (
            cloneElement(child, {
                nestedLevel: nestedLevel + 1,
            })
        ) : child;
    });
    */

    return (
        <div>{props.children}</div>
    )
};

/**
 * Set accepted properties
 */
List.propTypes = {
    children: PropTypes.node,
    selectable: PropTypes.bool,
    defaultValue: PropTypes.string
};

/**
 * Set property defaults
 */
List.defaultProps = {
    selectable: false,
    defaultValue: null
};

/**
 * An alternate theme may be passed down by a provider
 */
List.contextTypes = {
    chamelTheme: PropTypes.object
};

export default List;
