import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * PersonAdd button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const PersonAddIcon = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.fontIcon
      ? context.chamelTheme.fontIcon
      : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconPersonAdd}>
      {'person_add'}
    </FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
PersonAddIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default PersonAddIcon;
