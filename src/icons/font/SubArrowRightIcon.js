import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';

const SubArrowRightIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcons)
    ? context.chamelTheme.fontIcons : {};

  return (
    <FontIcon {...props} className={theme.iconSubArrowRight} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
SubArrowRightIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default SubArrowRightIcon;
