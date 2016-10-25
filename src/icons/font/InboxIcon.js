import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Inbox button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const InboxIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconInbox}>{"inbox"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
InboxIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default InboxIcon;
