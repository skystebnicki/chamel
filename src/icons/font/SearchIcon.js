import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Search button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const SearchIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconSearch}>{"search"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
SearchIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default SearchIcon;
