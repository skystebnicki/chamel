import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * AccessTime button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const AccessTimeIcon = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.fontIcon
      ? context.chamelTheme.fontIcon
      : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconAccessTime}>
      {'access_time'}
    </FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
AccessTimeIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default AccessTimeIcon;
