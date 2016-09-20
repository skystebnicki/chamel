import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';

const CancelIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcons)
    ? context.chamelTheme.fontIcons : {};

  return (
    <FontIcon {...props} className={theme.iconCancel} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
CancelIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default CancelIcon;
