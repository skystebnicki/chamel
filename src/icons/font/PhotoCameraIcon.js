import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';
import ThemeService from '../../styles/ChamelThemeService';

/**
 * PhotoCamera button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const PhotoCameraIcon = (props, context) => {
    let theme = (context.chamelTheme && context.chamelTheme.fontIcon)
        ? context.chamelTheme.fontIcon : ThemeService.defaultTheme.fontIcon;

    return (
        <FontIcon {...props} className={theme.iconPhotoCamera}>{"photo_camera"}</FontIcon>
    );
};

/**
 * An alternate theme may be passed down by a provider
 */
PhotoCameraIcon.contextTypes = {
    chamelTheme: React.PropTypes.object
};

export default PhotoCameraIcon;