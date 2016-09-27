import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const ArrowDropDownIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcons;

  return (
    <FontIcon {...props} className={theme.iconArrowDropDown} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowDropDownIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default ArrowDropDownIcon;
