import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Build button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const BuildIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconBuild}>{"build"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
BuildIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default BuildIcon;
