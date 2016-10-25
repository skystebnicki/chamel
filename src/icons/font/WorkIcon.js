import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Work button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const WorkIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconWork}>{"work"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
WorkIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default WorkIcon;
