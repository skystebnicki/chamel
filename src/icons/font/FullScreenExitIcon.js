import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const FullScreenExitIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcons;

  return (
    <FontIcon {...props} className={theme.iconFullScreenExit} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
FullScreenExitIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default FullScreenExitIcon;
