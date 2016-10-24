import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const LastPageIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconLastPage}>{"last_page"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
LastPageIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default LastPageIcon;
