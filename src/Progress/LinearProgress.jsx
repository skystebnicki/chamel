import React, { Component, PropTypes } from 'react';
import ThemeService from '../styles/ChamelThemeService';
import prefixer from '../utils/prefixer.js';
import Progress from './Progress';

const LinearProgress = (props, context) => {
  return (
    <Progress type='linear' {...props} />
  );
};

LinearProgress.PropTypes = {
  buffer: PropTypes.number,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  mode: PropTypes.oneOf(['determinate', 'indeterminate']),
  multicolor: PropTypes.bool,
  value: PropTypes.number
}

export default LinearProgress;
