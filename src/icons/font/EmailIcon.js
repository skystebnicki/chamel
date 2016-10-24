import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Email button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const EmailIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconEmail}>{"mail_outline"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
EmailIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default EmailIcon;
