import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * ContentPaste button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const ContentPasteIcon = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.fontIcon
      ? context.chamelTheme.fontIcon
      : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconContentPaste}>
      {'content_paste'}
    </FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ContentPasteIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default ContentPasteIcon;
