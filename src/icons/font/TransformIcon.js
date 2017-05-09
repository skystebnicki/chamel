import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Transform button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const TransformIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconTransform}>{"transform"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
TransformIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default TransformIcon;
