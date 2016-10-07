import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Bold Icon button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const BoldIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconBold} />
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
BoldIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default BoldIcon;
