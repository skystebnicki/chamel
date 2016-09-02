import React from 'react';
import EnhancedSwitch from '../EnhancedSwitch/EnhancedSwitch';
import Classable from '../mixins/classable';
import CheckboxOutline from '../svg-icons/toggle-check-box-outline-blank';
import CheckboxChecked from '../svg-icons/toggle-check-box-checked';

var Checkbox = React.createClass({

  mixins: [Classable],

  propTypes: {
    onCheck: React.PropTypes.func,
  },

  render: function() {
    var {
      onCheck,
      ...other
    } = this.props;

    var classes = this.getClasses("chamel-checkbox");

    var checkboxElement = (
      <div>
        <CheckboxOutline className="chamel-checkbox-box" />
        <CheckboxChecked className="chamel-checkbox-check" />
      </div>
    );

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switchElement: checkboxElement,
      className: classes,
      iconClassName: "chamel-checkbox-icon",
      onSwitch: this._handleCheck,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "right"
    };

    return (
      <EnhancedSwitch 
        {...other}
        {...enhancedSwitchProps}/>
    );
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },

  _handleCheck: function(e, isInputChecked) {
    if (this.props.onCheck) this.props.onCheck(e, isInputChecked);
  }
});

// Check for commonjs
if (module) {
  module.exports = Checkbox;
}

export default Checkbox;
