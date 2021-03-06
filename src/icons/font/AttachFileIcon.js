import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * AttachFile button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const AttachFileIcon = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.fontIcon
      ? context.chamelTheme.fontIcon
      : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconAttachFile}>
      {'attach_file'}
    </FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
AttachFileIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default AttachFileIcon;
