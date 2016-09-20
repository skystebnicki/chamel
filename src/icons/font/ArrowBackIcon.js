import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';

const ArrowBackIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcons)
    ? context.chamelTheme.fontIcons : {};

  return (
    <FontIcon {...props} className={theme.iconArrowBack} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowBackIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default ArrowBackIcon;
