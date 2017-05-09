import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const AppsIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconApps}>{"apps"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
AppsIcon.contextTypes = {
  chamelTheme: PropTypes.object
};

export default AppsIcon;
