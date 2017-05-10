import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Link button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const LinkIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconLink}>{"insert_link"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
LinkIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default LinkIcon;
