import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * PersonAdd button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const PersonAddIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconPersonAdd}>{"person_add"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
PersonAddIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default PersonAddIcon;
