var React = require('react');
var Classable = require('./mixins/classable.jsx');
var EnhancedSwitch = require('./EnhancedSwitch.jsx');
var RadioButtonOff = require('./svg-icons/toggle-radio-button-off.jsx');
var RadioButtonOn = require('./svg-icons/toggle-radio-button-on.jsx');

var RadioButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    onCheck: React.PropTypes.func,
    className: React.PropTypes.string
  },

  render: function() {

    var {
      onCheck,
      ...other
    } = this.props;

    var radioButtonElement = (
      <div className={this.props.className}>
          <RadioButtonOff className="chamel-radio-button-target" />
          <RadioButtonOn className="chamel-radio-button-fill" />
      </div>
    );

    var enhancedSwitchProps = {
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
  },

  // Only called when selected, not when unselected.
  _handleCheck: function(e) {
    if (this.props.onCheck) this.props.onCheck(e, this.props.value);
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
    this.setState({switched: newCheckedValue});
  },
  
  getValue: function() {
    return this.refs.enhancedSwitch.getValue();
  }
});

module.exports = RadioButton;
