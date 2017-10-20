import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Account button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const AccountIcon = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.fontIcon
      ? context.chamelTheme.fontIcon
      : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconAccount}>
      {'account_box'}
    </FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
AccountIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default AccountIcon;
