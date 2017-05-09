import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * StreetView button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const StreetViewIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconStreetView}>{"streetview"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
StreetViewIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default StreetViewIcon;
