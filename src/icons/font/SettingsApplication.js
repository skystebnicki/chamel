import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * SettingsApplication button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const SettingsApplicationIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconSettingsApplication}>{"settings_applications"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
SettingsApplicationIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default SettingsApplicationIcon;
