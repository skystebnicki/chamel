import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';

const LastPageIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcons)
    ? context.chamelTheme.fontIcons : {};

  return (
    <FontIcon {...props} className={theme.iconLastPage} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
LastPageIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default LastPageIcon;
