import React from 'react';
import PropTypes from 'prop-types';
import ThemeService from '../styles/ChamelThemeService';
import IconButton from '../Button/IconButton';

/**
 * Wrapper for an IconButton in the AppBar
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 */
const AppBarIconButton = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.appBar
      ? context.chamelTheme.appBar
      : ThemeService.defaultTheme.appBar;

  // Get className and children, and put the rest in other to forward below
  let { className, children, ...other } = props;
  if (className) {
    className += ' ';
  }
  className += theme.appBarIconButton;

  return (
    <IconButton className={className} {...other}>
      {children}
    </IconButton>
  );
};

/**
 * Set accepted properties
 */
AppBarIconButton.propTypes = {
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
AppBarIconButton.defaultProps = {
  className: '',
  children: null,
};

/**
 * An alternate theme may be passed down by a provider
 */
AppBarIconButton.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default AppBarIconButton;
