import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const ArrowDropDownIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconArrowDropDown}>{"arrow_drop_down"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowDropDownIcon.contextTypes = {
  chamelTheme: PropTypes.object
};

export default ArrowDropDownIcon;
