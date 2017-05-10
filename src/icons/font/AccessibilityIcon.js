import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Accessibility button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const AccessibilityIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconAccessibility}>{"accessibility"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
AccessibilityIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default AccessibilityIcon;
