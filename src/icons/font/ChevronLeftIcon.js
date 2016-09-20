import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';

const ChevronLeftIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcons)
    ? context.chamelTheme.fontIcons : {};

  return (
    <FontIcon {...props} className={theme.iconChevronLeft} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ChevronLeftIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default ChevronLeftIcon;