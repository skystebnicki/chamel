import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const MenuIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconMenu}>{"menu"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
MenuIcon.contextTypes = {
  chamelTheme: PropTypes.object
};

export default MenuIcon;
