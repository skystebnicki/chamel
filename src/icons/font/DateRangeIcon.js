import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * DateRange button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const DateRangeIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconDateRange}>{"date_range"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
DateRangeIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default DateRangeIcon;
