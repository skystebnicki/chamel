import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Comment button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const CommentIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconComment}>{"comment"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
CommentIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default CommentIcon;
