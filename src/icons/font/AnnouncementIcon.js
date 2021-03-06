import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Announcement button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const AnnouncementIcon = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.fontIcon
      ? context.chamelTheme.fontIcon
      : ThemeService.defaultTheme.fontIcon;

  return (
    <FontIcon {...props} className={theme.iconAnnouncement}>
      {'announcement'}
    </FontIcon>
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
AnnouncementIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default AnnouncementIcon;
