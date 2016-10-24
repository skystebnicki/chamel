import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Title Icon button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const TitleIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    let fontIconProps = {...props};

    if (props.headerType) {
        headerType = props.headerType
        delete fontIconProps.headerType;
    }

    return (
        <FontIcon {...fontIconProps} className={theme.iconTitle}>{"title"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
TitleIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default TitleIcon;
