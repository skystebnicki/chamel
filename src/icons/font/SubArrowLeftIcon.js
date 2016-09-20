import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';

const SubArrowLefticon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcons)
    ? context.chamelTheme.fontIcons : {};

  return (
    <FontIcon {...props} className={theme.iconSubArrowLeft} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
SubArrowLefticon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default SubArrowLefticon;
