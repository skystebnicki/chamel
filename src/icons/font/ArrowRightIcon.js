import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';

const ArrowRightIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcons)
    ? context.chamelTheme.fontIcons : {};

  return (
    <FontIcon {...props} className={theme.iconArrowRight} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowRightIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default ArrowRightIcon;
