import React from 'react';
import PropTypes from 'prop-types';
import TouchRipple from '../ripples/TouchRipple';
import FocusRipple from '../ripples/FocusRipple';
import ThemeService from '../styles/ChamelThemeService';
import Paper from '../Paper';

/**
 * Switch toggle
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const Switch = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.toggle
      ? context.chamelTheme.toggle
      : ThemeService.defaultTheme.toggle;

  const onTap =
    props.onChange && !props.disabled
      ? evt => {
          if (props.onChange) {
            props.onChange(evt, !props.checked);
          }
        }
      : false;

  let labelElement = null;
  if (props.label) {
    labelElement = <div className={theme.switchText}>{props.label}</div>;
  }

  let buttonClasses = theme.switchIconButton;
  if (props.checked) {
    buttonClasses += ' ' + theme.switchIconButtonOn;
  }

  let trackClasses = theme.switchIconTrack;
  if (props.checked) {
    trackClasses += ' ' + theme.switchIconTrackOn;
  }

  return (
    <div onClick={onTap} className={theme.switch}>
      <div className={theme.switchIcon}>
        <div className={trackClasses} />
        <Paper className={buttonClasses} zDepth={1} />
      </div>
      {labelElement}
    </div>
  );
};

/**
 * Set accepted properties
 */
Switch.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,

  /**
   * This is the function calling components should use to check status
   */
  onChange: PropTypes.func,

  /**
   * Flag indicates whether or not the input box is checked
   */
  checked: PropTypes.bool,
};

/**
 * Set property defaults
 */
Switch.defaultProps = {
  className: '',
  checked: false,
};

/**
 * An alternate theme may be passed down by a provider
 */
Switch.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default Switch;
