import React, { PropTypes } from 'react';
import TouchRipple from '../ripples/TouchRipple';
import classnames from 'classnames';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Show a divider (hr) in a list
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const ListDivider = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.list)
      ? context.chamelTheme.list : ThemeService.defaultTheme.list;

  let classes = classnames(theme.listDivider, {
    [theme.listDividerInset]: props.inset
  });

  return (
    <div className={classes} />
  )
};

/**
 * Set accepted properties
 */
ListDivider.propTypes = {
  /**
   * Optional flag that can be set to indicate this item is selected
   */
  inset: PropTypes.bool
};

/**
 * Set property defaults
 */
ListDivider.defaultProps = {
  inset: false
};

/**
 * An alternate theme may be passed down by a provider
 */
ListDivider.contextTypes = {
  chamelTheme: PropTypes.object
};

export default ListDivider;
