import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Label button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const LabelIcon = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.fontIcon
      ? context.chamelTheme.fontIcon
      : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconLabel}>
      {'label'}
    </FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
LabelIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default LabelIcon;
