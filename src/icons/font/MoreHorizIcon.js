import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const MoreHorizIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconMoreHoriz}>{"more_horiz"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
MoreHorizIcon.contextTypes = {
  chamelTheme: PropTypes.object
};

export default MoreHorizIcon;
