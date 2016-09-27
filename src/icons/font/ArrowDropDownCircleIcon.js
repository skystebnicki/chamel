import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const ArrowDropDownCircleIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcons;

  return (
    <FontIcon {...props} className={theme.iconArrowDropDownCircle} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowDropDownCircleIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default ArrowDropDownCircleIcon;
