import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * FilterList button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const FilterListIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconFilterList}>{"filter_list"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
FilterListIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default FilterListIcon;
