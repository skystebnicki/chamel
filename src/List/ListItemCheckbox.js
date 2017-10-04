import React from 'react';
import PropTypes from 'prop-types';
import TouchRipple from '../ripples/TouchRipple';
import classnames from 'classnames';
import Checkbox from '../Toggle/Checkbox';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const ListItemCheckbox = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.list)
      ? context.chamelTheme.list : ThemeService.defaultTheme.list;

  let classes = classnames(theme.listItem, {
    [theme.listItemSelected]: props.checked
  });

  // Create a change function to call in case the user did not pass one
  const onChange = (e, checked) => {
    if (props.onChange) {
      props.onChange(e, checked);
    }
  };

  // If we have a right element add it
  const rightElement = (props.rightElement) ?
    (<div className={theme.listItemRight}>{props.rightElement}</div>) : null;

  return (
    <div className={classes}>
      <div className={theme.listItemContent}>
        <div className={theme.listItemLeft}>
          <Checkbox
            onChange={onChange}
            checked={props.checked}
          />
        </div>
        <div className={theme.listItemData} onClick={(e) => { onChange(e, !props.checked)}}>
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
ListItemCheckbox.propTypes = {

  /**
   * Primary text/title of the item
   */
  primaryText: PropTypes.string,

  /**
   * Secondary text for the item - often a snippet of the body
   */
  secondaryText: PropTypes.string,

  /**
   * Node element to render on the right side
   */
  rightElement: PropTypes.node,

  /**
   * Event called when we select the control
   */
  onChange: PropTypes.func,

  /**
   * Bool to set whether or not this element is checked
   */
  checked: PropTypes.bool
};

/**
 * Set property defaults
 */
ListItemCheckbox.defaultProps = {
  primaryText: null,
  secondaryText: null,
  leftElement: null,
  rightElement: null,
  checked: false
};

/**
 * An alternate theme may be passed down by a provider
 */
ListItemCheckbox.contextTypes = {
  chamelTheme: PropTypes.object
};

export default ListItemCheckbox;
