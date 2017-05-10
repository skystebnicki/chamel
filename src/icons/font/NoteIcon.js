import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * Note button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const NoteIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconNote}>{"note"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
NoteIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default NoteIcon;
