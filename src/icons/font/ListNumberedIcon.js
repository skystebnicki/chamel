import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * List Ordered Icon button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const ListNumberedIcon = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.fontIcon
      ? context.chamelTheme.fontIcon
      : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconListNumbered}>
      {'format_list_numbered'}
    </FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ListNumberedIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default ListNumberedIcon;
