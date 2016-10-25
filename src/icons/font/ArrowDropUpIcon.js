import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const ArrowDropUpIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconArrowDropUp}>{"arrow_drop_up"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowDropUpIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default ArrowDropUpIcon;
