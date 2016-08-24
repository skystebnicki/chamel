var React = require('react');
var EnhancedSwitch = require('../EnhancedSwitch');
var Classable = require('../mixins/classable');
var CheckboxOutline = require('../svg-icons/toggle-check-box-outline-blank');
var CheckboxChecked = require('../svg-icons/toggle-check-box-checked');

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