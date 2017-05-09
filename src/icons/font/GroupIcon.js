import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Group button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const GroupIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconGroup}>{"group"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
GroupIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default GroupIcon;
