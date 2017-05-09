import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Check Circle button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const CheckCircleIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconCheckCircle}>{"check_circle"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
CheckCircleIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default CheckCircleIcon;
