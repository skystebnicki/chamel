import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Style button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const StyleIcon = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.fontIcon
      ? context.chamelTheme.fontIcon
      : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconStyle}>
      {'style'}
    </FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
StyleIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default StyleIcon;
