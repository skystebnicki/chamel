import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * BorderColor button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const BorderColorIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconBorderColor}>{"border_color"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
BorderColorIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default BorderColorIcon;