import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Close or clear button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const CreateIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcons;

  return (
    <FontIcon {...props} className={theme.iconCreate} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
CreateIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default CreateIcon;
