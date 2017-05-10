import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * AddCircle button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const AddCircleIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconAddCircle}>{"add_circle"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
AddCircleIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default AddCircleIcon;
