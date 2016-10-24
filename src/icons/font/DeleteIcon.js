import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Delete button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const DeleteIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconDelete}>{"delete"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
DeleteIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default DeleteIcon;
