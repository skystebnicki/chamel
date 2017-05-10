import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Shuffle button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const ShuffleIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconShuffle}>{"shuffle"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
ShuffleIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default ShuffleIcon;
