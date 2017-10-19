import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../Picker/SelectButton';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Wrapper for an SelectButton in the AppBar
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 */
const AppBarSelectButton = (props, context) => {
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
AppBarSelectButton.propTypes = {
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
AppBarSelectButton.defaultProps = {
  className: '',
  children: null,
};

/**
 * An alternate theme may be passed down by a provider
 */
AppBarSelectButton.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default AppBarSelectButton;
