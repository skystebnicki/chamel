import React, { Component, PropTypes } from 'react';
import FontIcon from '../../FontIcon';

const ArrowDropDownIcon = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.fontIcons)
    ? context.chamelTheme.fontIcons : {};

  return (
    <FontIcon {...props} className={theme.iconArrowDropDown} />
  );
};

/**
 * An alternate theme may be passed down by a provider
 */
ArrowDropDownIcon.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default ArrowDropDownIcon;
