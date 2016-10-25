import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const ArrowUpIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconArrowUp}>{"arrow_upward"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowUpIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default ArrowUpIcon;
