import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThemeService from '../styles/ChamelThemeService';
import prefixer from '../utils/prefixer.js';
import classnames from 'classnames';
import Progress from './Progress';

const CircularProgress = (props, context) => {
  return <Progress type="circular" {...props} />;
};

CircularProgress.PropTypes = {
  buffer: PropTypes.number,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  mode: PropTypes.oneOf(['determinate', 'indeterminate']),
  multicolor: PropTypes.bool,
  value: PropTypes.number,
};

export default CircularProgress;
