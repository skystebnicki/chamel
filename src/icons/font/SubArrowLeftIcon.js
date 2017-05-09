import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const SubArrowLefticon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconSubArrowLeft}>{"subdirectory_arrow_left"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
SubArrowLefticon.contextTypes = {
  chamelTheme: PropTypes.object
};

export default SubArrowLefticon;
