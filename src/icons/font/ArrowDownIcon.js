import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';

const ArrowDownIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcons)
    ? context.chamelTheme.fontIcons : {};

  return (
    <FontIcon {...props} className={theme.iconArrowDown} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowDownIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default ArrowDownIcon;
