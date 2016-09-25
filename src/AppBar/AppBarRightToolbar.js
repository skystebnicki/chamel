import React, { Component, PropTypes } from 'react';
import ThemeService from '../styles/ChamelThemeService';

/**
 * The right toolbar for an AppBar
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const AppBarRightToolbar = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.appBar)
        ? context.chamelTheme.appBar : ThemeService.defaultTheme.appBar;

    return (
        <div className={props.className}>{props.children}</div>
    );
};

/**
 * Set accepted properties
 */
AppBarRightToolbar.propTypes = {
  /**
   * Optional class override
   */
  className: PropTypes.string,

  /**
   * Child elements (text and icon)
   */
  children: PropTypes.node,
};

/**
 * Set property defaults
 */
AppBarRightToolbar.defaultProps = {
  className: null
};

/**
 * An alternate theme may be passed down by a provider
 */
AppBarRightToolbar.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default AppBarRightToolbar;
