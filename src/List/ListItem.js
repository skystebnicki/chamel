import React, { PropTypes } from 'react';
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
const ListItem = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.list)
      ? context.chamelTheme.list : {};

  let classes = classnames(theme.listItem, {
    [theme.listItemSelected]: props.selected
  });

  // If we have a left element add it
  const leftElement = (props.leftElement) ?
    (<div className={theme.listItemLeft}>{props.leftElement}</div>) : null;

  // If we have a right element add it
  const rightElement = (props.rightElement) ?
    (<div className={theme.listItemRight}>{props.rightElement}</div>) : null;

  return (
    <div className={classes} onClick={props.onTap}>
      <TouchRipple />
      <div className={theme.listItemContent} >
        {leftElement}
        <div className={theme.listItemData}>
          <div className={theme.listItemPrimary}>{props.primaryText}</div>
          <div className={theme.listItemSecondary}>{props.secondaryText}</div>
        </div>
        {rightElement}
      </div>
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
  /**
   * Optional flag that can be set to indicate this item is selected
   */
  selected: PropTypes.bool,

  leftElement: PropTypes.node,
  rightElement: PropTypes.node
};

/**
 * Set property defaults
 */
ListItem.defaultProps = {
  primaryText: null,
  secondaryText: null,
  leftElement: null,
  rightElement: null,
  selected: false
};

/**
 * An alternate theme may be passed down by a provider
 */
ListItem.contextTypes = {
  chamelTheme: PropTypes.object
};

export default ListItem;
