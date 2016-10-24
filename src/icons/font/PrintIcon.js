import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Print button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const PrintIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconPrint}>{"print"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
PrintIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default PrintIcon;
