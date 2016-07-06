var React = require('react');
var Classable = require('./mixins/classable');
var EnhancedSwitch = require('./EnhancedSwitch');
var RadioButtonOff = require('./svg-icons/toggle-radio-button-off');
var RadioButtonOn = require('./svg-icons/toggle-radio-button-on');

/**
 * Radio button switch
 */
var RadioButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    /**
     * Callback to call when a radiobutton is selected
     *
     * @type {function}
     */
    onCheck: React.PropTypes.func,

    /**
     * Inline is used to determine if the radio buttons s are printed side-by-side
     *
     * Defaults to false since it is almost never used for mobile
     *
     * @type {bool}
     */
    inline: React.PropTypes.bool
  },

  /**
   * Set default properties if not set by the calling component
   */
  getDefaultProps: function() {
    return (
      {inline: false}
    );
  },

  render: function() {

    var {
      onCheck,
      ...other
    } = this.props;

    var radioButtonElement = (
      <div>
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
