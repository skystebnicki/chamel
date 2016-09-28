import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const ArrowRightIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconArrowRight} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowRightIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default ArrowRightIcon;
