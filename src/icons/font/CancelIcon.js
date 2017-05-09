import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const CancelIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconCancel}>{"cancel"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
CancelIcon.contextTypes = {
  chamelTheme: PropTypes.object
};

export default CancelIcon;
