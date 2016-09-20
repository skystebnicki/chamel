import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';

const ArrowUpIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcons)
    ? context.chamelTheme.fontIcons : {};

  return (
    <FontIcon {...props} className={theme.iconArrowUp} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowUpIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default ArrowUpIcon;
