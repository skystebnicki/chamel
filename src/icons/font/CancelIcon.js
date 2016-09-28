import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const CancelIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconCancel} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
CancelIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default CancelIcon;
