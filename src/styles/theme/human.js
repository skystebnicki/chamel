import base from './base';

// This is where we would import every single component as a key here
export default {
  name: 'human',
  appBar: require('../../AppBar/theme-human.scss'),
  button: require('../../Button/theme-human.scss'),
  ...base
}
