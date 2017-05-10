import React from 'react';
import PropTypes from 'prop-types';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Grid row
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const Container = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.grid)
    ? context.chamelTheme.grid : ThemeService.defaultTheme.grid;

  const classes = (props.fluid) ? theme.containerFluid : theme.container;

  return (
    <div className={classes}>
      {props.children}
    </div>
  );
};

/**
 * Set accepted properties
 */
Container.propTypes = {
  children: PropTypes.node
};

/**
 * An alternate theme may be passed down by a provider
 */
Container.contextTypes = {
  chamelTheme: PropTypes.object
};

export default Container;
