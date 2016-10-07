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
const HeaderIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    let fontIconProps = {...props};
    let headerType = null;

    if (props.headerType) {
        headerType = props.headerType
        delete fontIconProps.headerType;
    }

    return (
        <FontIcon {...fontIconProps} className={theme.iconHeader}>
            <span className={theme.iconSize18}>{headerType}</span>
        </FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
HeaderIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default HeaderIcon;
