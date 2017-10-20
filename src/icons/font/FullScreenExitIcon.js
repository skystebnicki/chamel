import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const FullScreenExitIcon = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.fontIcon
      ? context.chamelTheme.fontIcon
      : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconFullScreenExit}>
      {'fullscreen_exit'}
    </FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
FullScreenExitIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default FullScreenExitIcon;
