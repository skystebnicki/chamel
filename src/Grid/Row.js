import React, { Component, PropTypes } from 'react';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Grid row
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const Row = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.grid)
    ? context.chamelTheme.grid : ThemeService.defaultTheme.grid;

  return (
    <div className={theme.row}>
      {props.children}
    </div>
  );
};

/**
 * Set accepted properties
 */
Row.propTypes = {
  children: PropTypes.node
};

/**
 * An alternate theme may be passed down by a provider
 */
Row.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default Row;
