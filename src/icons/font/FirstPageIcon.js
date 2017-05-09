import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const FirstPageIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconFirstPage}>{"first_page"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
FirstPageIcon.contextTypes = {
  chamelTheme: PropTypes.object
};

export default FirstPageIcon;
