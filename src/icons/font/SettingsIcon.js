import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Settings button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const SettingsIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconSettings}>{"settings"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
SettingsIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default SettingsIcon;