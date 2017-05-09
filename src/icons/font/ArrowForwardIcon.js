import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const ArrowForwardicon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconArrowForward}>{"arrow_forward"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowForwardicon.contextTypes = {
  chamelTheme: PropTypes.object
};

export default ArrowForwardicon;
