import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

const ArrowForwardIcon = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.fontIcon
      ? context.chamelTheme.fontIcon
      : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconArrowForward}>
      {'arrow_forward'}
    </FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowForwardIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default ArrowForwardIcon;
