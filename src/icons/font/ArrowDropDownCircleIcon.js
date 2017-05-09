import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const ArrowDropDownCircleIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconArrowDropDownCircle}>{"arrow_drop_down_circle"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowDropDownCircleIcon.contextTypes = {
  chamelTheme: PropTypes.object
};

export default ArrowDropDownCircleIcon;
