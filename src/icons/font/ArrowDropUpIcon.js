import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';

const ArrowDropUpIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcons)
    ? context.chamelTheme.fontIcons : {};

  return (
    <FontIcon {...props} className={theme.iconArrowDropUp} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowDropUpIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default ArrowDropUpIcon;
