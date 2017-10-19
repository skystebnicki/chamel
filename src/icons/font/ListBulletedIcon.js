import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * List Unordered button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const ListBulletedIcon = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.fontIcon
      ? context.chamelTheme.fontIcon
      : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconListBulleted}>
      {'format_list_bulleted'}
    </FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ListBulletedIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default ListBulletedIcon;
