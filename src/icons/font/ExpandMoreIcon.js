import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const ExpandMoreIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconExpandMore}>{"expand_more"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ExpandMoreIcon.contextTypes = {
  chamelTheme: PropTypes.object
};

export default ExpandMoreIcon;
