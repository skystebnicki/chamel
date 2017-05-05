import React from 'react';
import PropTypes from 'prop-types';
import Classable from '../mixins/classable';
import RadioButtonOff from '../svg-icons/toggle-radio-button-off';
import RadioButtonOn from '../svg-icons/toggle-radio-button-on';

/**
 * Radio button switch
 */
const RadioButton = (props) => {

  // mixins: [Classable],
  let {
    onCheck,
    ...other
  } = this.props;

  const radioButtonElement = (
    <div>
        <RadioButtonOff className="chamel-radio-button-target" />
        <RadioButtonOn className="chamel-radio-button-fill" />
    </div>
  );

  const enhancedSwitchProps = {
    ref: "enhancedSwitch",
    inputType: "radio",
    switchElement: radioButtonElement,
    className: "chamel-radio-button",
    iconClassName: "chamel-radio-button-icon",
    onSwitch: this._handleCheck,
    labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "right"
  };

  return (
    <EnhancedSwitch
      {...other}
      {...enhancedSwitchProps}/>
  );

  // Only called when selected, not when unselected.
  _handleCheck = (e) => {
    if (this.props.onCheck) this.props.onCheck(e, this.props.value);
  };

  isChecked = () => {
    return this.refs.enhancedSwitch.isSwitched();
  };

  setChecked = (newCheckedValue) => {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
    this.setState({switched: newCheckedValue});
  };

  getValue = () => {
    return this.refs.enhancedSwitch.getValue();
  };

}

RadioButton.propTypes = {
  /**
   * Callback to call when a radiobutton is selected
   *
   * @type {function}
   */
  onCheck: PropTypes.func,

  /**
   * Inline is used to determine if the radio buttons s are printed side-by-side
   *
   * Defaults to false since it is almost never used for mobile
   *
   * @type {bool}
   */
  inline: PropTypes.bool

};

/**
 * Set default properties if not set by the calling component
 */
RadioButton.defaultProps = {
  inline: false
};

export default RadioButton;
