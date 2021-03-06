import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Photo button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const PhotoIcon = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.fontIcon
      ? context.chamelTheme.fontIcon
      : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconPhoto}>
      {'photo'}
    </FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
PhotoIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default PhotoIcon;
