import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const CheckIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconCheck} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
CheckIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default CheckIcon;
