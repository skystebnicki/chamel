import React from 'react';
import Paper from '../Paper/Paper';
import Classable from '../mixins/classable';
import EnhancedSwitch from '../EnhancedSwitch/EnhancedSwitch';
import RadioButton from '../RadioButton/RadioButton';

var RadioButtonGroup = React.createClass({

  mixins: [Classable],

  propTypes: {
    name: React.PropTypes.string.isRequired,
    valueSelected: React.PropTypes.string,

    /**
     * Set which value is 
    defaultSelected: React.PropTypes.string,
    
    /**
     * Float the label to the left or right of the radio button
     *
     * @type {string}
     */
    labelPosition: React.PropTypes.oneOf(['left', 'right']),

    /**
     * Callback trigger fired when a user selects a new radio option
     *
     * @type {function}
     */
    onChange: React.PropTypes.func,

    /**
     * Inline is used to determine if the radio buttons s are printed side-by-side
     *
     * @default true
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

  _hasCheckAttribute: function(radioButton) {
    return radioButton.props.hasOwnProperty('checked') && 
      radioButton.props.checked; 
  },

  getInitialState: function() {
    return {
      numberCheckedRadioButtons: 0,
      selected: this.props.valueSelected || this.props.defaultSelected || ''
    };
  },

  componentWillMount: function() {
    var cnt = 0;
    
    this.props.children.forEach(function(option) {
      if (this._hasCheckAttribute(option)) cnt++;
    }, this);

    this.setState({numberCheckedRadioButtons: cnt});
  }, 

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.hasOwnProperty('valueSelected')) {
      this.setState({selected: nextProps.valueSelected});
    }
  },

  render: function() {

    var inline = this.props.inline;

    var options = this.props.children.map(function(option) {
      
      var {
        name,
        value, 
        label,
        onCheck,
        ...other
      } = option.props;

      return <RadioButton
        {...other}
        inline={inline}
        ref={option.props.value}
        name={this.props.name}
        key={option.props.value}
        value={option.props.value}
        label={option.props.label}
        labelPosition={this.props.labelPosition}
        onCheck={this._onChange}
        checked={option.props.value == this.state.selected}/>

    }, this);

    return (
      <div>
        {options}
      </div>
    );
  },

  _updateRadioButtons: function(newSelection) {
    if (this.state.numberCheckedRadioButtons == 0) {
      this.setState({selected: newSelection});
    } else if (process.env.NODE_ENV !== 'production') {
      var message = "Cannot select a different radio button while another radio button " +
                    "has the 'checked' property set to true.";
      console.error(message);
    }
  },

  _onChange: function(e, newSelection) {
    this._updateRadioButtons(newSelection);

    // Successful update
    if (this.state.numberCheckedRadioButtons == 0) {
      if (this.props.onChange) this.props.onChange(e, newSelection);
    }
  },

  getSelectedValue: function() {
    return this.state.selected;
  },

  setSelectedValue: function(newSelection) {
    this._updateRadioButtons(newSelection);  
  },

  clearValue: function() {
    this.setSelectedValue('');  
  }

});

// Check for commonjs
if (module) {
  module.exports = RadioButtonGroup;
}

export default RadioButtonGroup;
