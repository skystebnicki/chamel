import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * FindPage button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const FindPageIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconFindPage}>{"find_in_page"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
FindPageIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default FindPageIcon;
