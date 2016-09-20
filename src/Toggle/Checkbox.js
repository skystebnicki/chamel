import React, { Component, PropTypes } from 'react';
import TouchRipple from '../ripples/TouchRipple';
import FocusRipple from '../ripples/FocusRipple';
import Tappable from 'react-tappable';

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const Checkbox = (props, context) => {
  let theme = (context.chamelTheme && context.chamelTheme.toggle)
    ? context.chamelTheme.toggle : {};

  const onTap = (props.onChange && !props.disabled) ? (evt) => {
    props.onChange(evt, !props.checked);
  } : false;

  return (
    <label>
        <input type="checkbox" checked={props.checked} className={theme.checkbox} onChange={onTap}/>
        <span class={theme.checkboxText}>{props.label}</span>
    </label>
  );
};

/**
 * Set accepted properties
 */
Checkbox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onTape: PropTypes.func,
  onChange: PropTypes.func,
  checked: PropTypes.bool
};

/**
 * Set property defaults
 */
Checkbox.defaultProps = {
  className: '',
  checked: false
};

/**
 * An alternate theme may be passed down by a provider
 */
Checkbox.contextTypes = {
  chamelTheme: React.PropTypes.object
};

export default Checkbox;
