import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const ChevronLeftIcon = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.fontIcon
      ? context.chamelTheme.fontIcon
      : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconChevronLeft}>
      {'chevron_left'}
    </FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ChevronLeftIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default ChevronLeftIcon;
