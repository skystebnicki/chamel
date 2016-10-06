import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Close or clear button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const ContentHtmlIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconContentIcon} />
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
ContentHtmlIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default ContentHtmlIcon;
