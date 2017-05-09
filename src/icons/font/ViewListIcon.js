import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * ViewList button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const StyleIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconViewList}>{"view_list"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
StyleIcon.contextTypes = {
  chamelTheme: PropTypes.object
};

export default StyleIcon;
