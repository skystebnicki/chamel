// Only use this when not using identified modules - otherwise comment out
import base from './base';

// This is where we would import every single component as a key here
let themeStyles = Object.assign({}, base);

// Override here
themeStyles.name = 'material';
themeStyles.button = require('../../Button/theme-material.scss');
themeStyles.appBar = require('../../AppBar/theme-material.scss');
themeStyles.ripple = require('../../ripples/theme-material.scss');
themeStyles.fontIcon = require('../../icons/font/theme-material.scss'),
themeStyles.menu = require('../../Menu/theme-material.scss');

export default themeStyles;
