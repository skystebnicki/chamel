import React, { Children, PropTypes } from 'react';

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

  let currentIndex = 0;
  let childElements = Children.map(props.children, (child) => {
    let retChild = child;
    if (React.isValidElement(child) && props.selectable) {
      retChild = React.cloneElement(child, {
        selected: (props.selectedIndex === currentIndex)
      });
    }

    // Increment index to keep track of selected
    currentIndex++;

    return retChild;
  /*
    return isValidElement(child) ? (
        cloneElement(child, {
            nestedLevel: nestedLevel + 1,
        })
    ) : child;
    */
  });

  return (
    <div>{childElements}</div>
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
