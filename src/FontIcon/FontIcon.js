import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const FontIcon = (props, context) => {
  let theme = null,
    themeName = null;

  if (context.chamelTheme && context.chamelTheme.fontIcon) {
    theme = context.chamelTheme.fontIcon;
    themeName = context.chamelTheme.name;
  } else {
    theme = ThemeService.defaultTheme.fontIcon;
    themeName = ThemeService.defaultTheme.name;
  }

  let { className, ...other } = props;

  const classes = classnames(
    theme.fontIcon,
    {
      [theme.iconSize18]: props.size == 18,
      [theme.iconSize24]: props.size == 24,
      [theme.iconSize36]: props.size == 36,
      [theme.iconSize48]: props.size == 48,
    },
    className,
  );

  const content = themeName === 'material' ? props.children : null;

  return (
    <span className={classes} {...other}>
      {content}
    </span>
  );
};

/**
 * Set accepted properties
 */
FontIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf([18, 24, 36, 48]),
};

/**
 * Set property defaults
 */
FontIcon.defaultProps = {
  className: '',
  size: 24,
};

/**
 * An alternate theme may be passed down by a provider
 */
FontIcon.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default FontIcon;
