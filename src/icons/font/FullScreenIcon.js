import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const FullScreenIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconFullScreen}>{"fullscreen"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
FullScreenIcon.contextTypes = {
  chamelTheme: PropTypes.object
};

export default FullScreenIcon;
