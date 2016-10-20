// Only use this when not using identified modules - otherwise comment out
import base from './base';

// This is where we would import every single component as a key here
let themeStyles = Object.assign({}, base);

// Override here
themeStyles.name = 'modern';
themeStyles.button = require('../../Button/theme-modern.scss');

export default themeStyles;
