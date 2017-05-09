import React, { PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * LocalOffer button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const LocalOfferIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconLocalOffer}>{"local_offer"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
LocalOfferIcon.contextTypes = {
    chamelTheme: PropTypes.object
};

export default LocalOfferIcon;
