import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';

const FirstPageIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcons)
    ? context.chamelTheme.fontIcons : {};

  return (
    <FontIcon {...props} className={theme.iconFirstPage} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
FirstPageIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default FirstPageIcon;
