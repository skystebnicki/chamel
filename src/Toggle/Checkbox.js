import React, { Component, PropTypes } from 'react';
import TouchRipple from '../ripples/TouchRipple';
import FocusRipple from '../ripples/FocusRipple';
import Tappable from 'react-tappable';
import ThemeService from '../styles/ChamelThemeService';
import CheckboxOutline from '../svg-icons/toggle-check-box-outline-blank';
import CheckboxChecked from '../svg-icons/toggle-check-box-checked';

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
    ? context.chamelTheme.toggle : ThemeService.defaultTheme.toggle;

  const onTap = (props.onChange && !props.disabled) ? (evt) => {
    if (props.onChange) {
      props.onChange(evt, !props.checked);
    } else if (props.onCheck) {
      props.onCheck(evt, !props.checked);
    }
  } : false;

  let labelElement = null;
  if (props.label) {
    labelElement = (<div className={theme.checkboxText}>{props.label}</div>);
  }

  let outlineClasses = theme.checkboxIconBox;
  if (props.checked) {
    outlineClasses += " " + theme.checkboxIconBoxOn;
  }

  let checkClasses = theme.checkboxIconCheck;
  if (props.checked) {
    checkClasses += " " + theme.checkboxIconCheckOn;
  }

  return (
      <Tappable onTap={onTap} component={"div"} className={theme.checkbox}>
        <div className={theme.checkboxIcon}>
          <CheckboxOutline className={outlineClasses} />
          <CheckboxChecked className={checkClasses} />
        </div>
        {labelElement}
      </Tappable>
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

  /**
   * This is the function calling components should use to check status
   */
  onChange: PropTypes.func,

  /**
   * Legacy callback
   */
  onCheck: PropTypes.func,

  /**
   * Flag indicates whether or not the input box is checked
   */
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
