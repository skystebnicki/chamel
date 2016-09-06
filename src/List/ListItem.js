import React, { PropTypes } from 'react';

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const ListItem = (props, context) => {
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
        <div>
            <div>{props.leftElement}</div>
            <div>{props.primaryText}</div>
            <div>{props.secondaryText}</div>
            <div>{props.rightElement}</div>
        </div>
    )
};

/**
 * Set accepted properties
 */
ListItem.propTypes = {
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    children: PropTypes.node,
    selectable: PropTypes.bool,
    defaultValue: PropTypes.string,
    leftElement: PropTypes.node,
    rightElement: PropTypes.node
};

/**
 * Set property defaults
 */
ListItem.defaultProps = {
    primaryText: null,
    secondaryText: null,
    selectable: false,
    defaultValue: null,
    leftElement: null,
    rightElement: null
};

/**
 * An alternate theme may be passed down by a provider
 */
ListItem.contextTypes = {
    chamelTheme: PropTypes.object
};

export default ListItem;
