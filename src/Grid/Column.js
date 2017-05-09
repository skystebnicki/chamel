import React, { PropTypes } from 'react';
import classnames from 'classnames';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Grid column
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const Column = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.grid)
    ? context.chamelTheme.grid : ThemeService.defaultTheme.grid;

  const classes = classnames({
    [theme["colXSmall" + props.xsmall]]: props.xsmall,
    [theme["colSmall" + props.small]]: props.small,
    [theme["colMedium" + props.medium]]: props.medium,
    [theme["colLarge" + props.large]]: props.large,
    [theme["colXLarge" + props.xlarge]]: props.xlarge
  });

  return (
    <div className={classes} style={props.style}>
      {props.children}
    </div>
  );
};

/**
 * Set accepted properties
 */
Column.propTypes = {
  xsmall: PropTypes.number,
  small: PropTypes.number,
  medium: PropTypes.number,
  large: PropTypes.number,
  xlarge: PropTypes.number,
  children: PropTypes.node,
  style: PropTypes.object
};

/**
 * An alternate theme may be passed down by a provider
 */
Column.contextTypes = {
  chamelTheme: PropTypes.object
};

export default Column;
