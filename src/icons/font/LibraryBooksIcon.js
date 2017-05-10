import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * LibraryBooks button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const LibraryBooksIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconLibraryBooks}>{"library_books"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
LibraryBooksIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default LibraryBooksIcon;
