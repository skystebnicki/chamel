import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Edit button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const EditIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconEdit}>{"edit"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
EditIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default EditIcon;
