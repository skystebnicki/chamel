import React, { Component, PropTypes } from 'react';
import TouchRipple from '../ripples/TouchRipple';
import FocusRipple from '../ripples/FocusRipple';
import Tappable from 'react-tappable';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const RadioButton = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.picker)
    ? context.chamelTheme.picker : ThemeService.defaultTheme.picker;

  return (
    <label className={theme.radioButton}>
      <input
        type={"radio"}
        className={theme.radioButtonInput}
        name={props.name}
        value={props.value}
        checked={props.checked}
        onClick={(e) => { if (props.onSelect) {props.onSelect(props.value)}}}
      />
      {props.label}
    </label>
  );
};

/**
 * Set accepted properties
 */
RadioButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  checked: PropTypes.bool,

  /**
   * The value of the radio button
   */
  value: PropTypes.string,

  /**
   * Radio group name
   */
  name: PropTypes.string
};

/**
 * Set property defaults
 */
RadioButton.defaultProps = {
  className: '',
  checked: false
};

/**
 * An alternate theme may be passed down by a provider
 */
RadioButton.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default RadioButton;
