import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';

const ExpandLessIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcons)
    ? context.chamelTheme.fontIcons : {};

  return (
    <FontIcon {...props} className={theme.iconExpandLess} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ExpandLessIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default ExpandLessIcon;
