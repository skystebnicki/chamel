import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * List Ordered Icon button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const ListOlIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconListOrdered} />
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
ListOlIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default ListOlIcon;
