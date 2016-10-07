import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Underline Icon button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const UnderlineIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconUnderline} />
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
UnderlineIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default UnderlineIcon;
