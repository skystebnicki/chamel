import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import TouchRipple from '../ripples/TouchRipple';
import FocusRipple from '../ripples/FocusRipple';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const RadioPicker = (props, context) => {
  let theme =
    context.chamelTheme && context.chamelTheme.toggle
      ? context.chamelTheme.toggle
      : ThemeService.defaultTheme.toggle;

  let childElements = Children.map(props.children, child => {
    return React.isValidElement(child)
      ? React.cloneElement(child, {
          name: 'test',
          checked: props.value === child.props.value,
          onSelect: value => {
            if (props.onChange) {
              props.onChange(value);
            }
          },
        })
      : child;
  });

  return <div>{childElements}</div>;
};

/**
 * Set accepted properties
 */
RadioPicker.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onTape: PropTypes.func,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

/**
 * Set property defaults
 */
RadioPicker.defaultProps = {
  className: '',
  checked: false,
};

/**
 * An alternate theme may be passed down by a provider
 */
RadioPicker.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default RadioPicker;
