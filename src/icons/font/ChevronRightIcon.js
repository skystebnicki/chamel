import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const ChevronRightIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcons)
    ? context.chamelTheme.fontIcons : ThemeService.defaultTheme.fontIcons;

  return (
    <FontIcon {...props} className={theme.iconChevronRight} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ChevronRightIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default ChevronRightIcon;
