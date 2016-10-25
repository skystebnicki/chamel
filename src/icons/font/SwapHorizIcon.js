import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * SwapHoriz button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const SwapHorizIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconSwapHoriz}>{"swap_horiz"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
SwapHorizIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default SwapHorizIcon;
