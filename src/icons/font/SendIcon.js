import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Send button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const SendIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconSend}>{"send"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
SendIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default SendIcon;
