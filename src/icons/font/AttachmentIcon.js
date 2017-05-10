import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Attachment button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const AttachmentIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
    ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconAttachment}>{"attachment"}</FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
AttachmentIcon.contextTypes = {
  chamelTheme: PropTypes.object
};

export default AttachmentIcon;
