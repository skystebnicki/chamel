import React, { Component, PropTypes } from 'react';
import TouchRipple from '../ripples/TouchRipple';
import FocusRipple from '../ripples/FocusRipple';
import ThemeService from '../styles/ChamelThemeService';
import classnames from 'classnames';

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const Button = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.button)
    ? context.chamelTheme.button : ThemeService.defaultTheme.button;

  // Setup classes
  const className = props.className || null;
  const type = props.type;
  const classes = classnames(theme[type], {
    [theme[type + "primary"]]: props.primary,
    [theme[type + "accent"]]: props.accent,
    [theme[type + "disabled"]]: props.disabled,
    [theme[type + "depressed"]]: props.depressed,
    [theme[type + "mini"]]: props.mini
  }, className);

  // Determine if the selected type of button is a centered ripple
  let centerRipple = (type == 'floating' || type == 'icon');
  const label = (props.label) ? props.label : props.children;

  const onClickHandler = props.onTap || props.onClick;

  if (onClickHandler && !props.disabled) {
    return (
      <button
        className={classes}
        onClick={onClickHandler}>
          <FocusRipple  />
          <TouchRipple centerRipple={centerRipple}>
            {label}
          </TouchRipple>
      </button>
    );
  } else {
    return (
      <button disabled={props.disabled} className={classes}>{label}</button>
    );
  }
};

/**
 * Set accepted properties
 */
Button.propTypes = {
  /**
   * Secondary accent color
   */
  accent: PropTypes.bool,

  /**
   * Primary button color and behavior
   */
  primary: PropTypes.bool,

  /**
   * Child elements (text and icon)
   */
  children: PropTypes.node,

  /**
   * Optional classname override
   */
  className: PropTypes.string,

  /**
   * Disabled flag - cannot be interacted with
   */
  disabled: PropTypes.bool,

  /**
   * Flat style (looks like a link almost)
   */
  flat: PropTypes.bool,

  /**
   * Floating button like floating action buttons (FAB) in material
   */
  floating: PropTypes.bool,

  /**
   * Link reference to go to
   */
  href: PropTypes.string,

  /**
   * ?
   */
  inverse: PropTypes.bool,

  /**
   * Optional icon to display to the left of the text
   */
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),

  /**
   * Optional property in place of child text
   */
  label: PropTypes.string,

  /**
   * Small button
   */
  mini: PropTypes.bool,

  /**
   * If true the button should appear pressed or down (think toggle)
   */
  depressed: PropTypes.bool,
  neutral: PropTypes.bool,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,

  /**
   * Event triggered when the user taps/clicks on the button
   */
  onTape: PropTypes.func,

  /**
   * Alias for onTap for backwards compatibility
   */
  onClick: PropTypes.func,

  raised: PropTypes.bool,
  type: PropTypes.oneOf(['raised', 'flat', 'floating', 'icon'])
};

/**
 * Set property defaults
 */
Button.defaultProps = {
  accent: false,
  className: '',
  flat: false,
  floating: false,
  mini: false,
  neutral: true,
  primary: false,
  raised: false,
  type: "raised"
};

/**
 * An alternate theme may be passed down by a provider
 */
Button.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default Button;
