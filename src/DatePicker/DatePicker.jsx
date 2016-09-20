import React from 'react';
import Classable from '../mixins/classable';
import WindowListenable from '../mixins/WindowListenable';
import DateTime from '../utils/DateTime';
import KeyCode from '../utils/KeyCode';
import DatePickerDialog from './DatePickerDialog';
import TextField from '../Input/TextField';
import device from '../utils/device';

var DatePicker = React.createClass({

  mixins: [Classable, WindowListenable],

  propTypes: {
    defaultDate: React.PropTypes.object,
    formatDate: React.PropTypes.func,
    mode: React.PropTypes.oneOf(['portrait', 'landscape', 'inline']),
    onFocus: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    autoOk: React.PropTypes.bool,
    preferNative: React.PropTypes.bool,
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getDefaultProps: function() {
    return {
      formatDate: DateTime.format,
      minDate: null,
      maxDate: null,
      autoOk: false,
      preferNative: true
    };
  },

  getInitialState: function() {
    return {
      date: this.props.defaultDate,
      dialogDate: new Date()
    };
  },

  render: function() {
    var {
      formatDate,
      mode,
      onChange,
      onFocus,
      onClick,
      onShow,
      onDismiss,
      minDate,
      maxDate,
      autoOk,
      ...other
    } = this.props;
    var classes = this.getClasses('chamel-date-picker', {
      'chamel-is-landscape': this.props.mode === 'landscape',
      'chamel-is-inline': this.props.mode === 'inline'
    });
    var defaultInputValue;

    if (this.props.defaultDate) {
      defaultInputValue = this.props.formatDate(this.props.defaultDate);
    }

    var inputType = (this.props.preferNative) ? "date" : "text";

    // If we are using the native input then we need to get value when changed
    var inpHndleOnChange = ('date' === inputType) ? this._handleInputChange : null;

    return (
      <div className={classes}>
        <TextField
          {...other}
          onChange={inpHndleOnChange}
          ref="input"
          type={inputType}
          defaultValue={defaultInputValue}
          onFocus={this._handleInputFocus}
          onClick={this._handleInputTouchTap} />
        <DatePickerDialog
          minDate={minDate} 
          maxDate={maxDate} 
          autoOk={autoOk}
          ref="dialogWindow"
          initialDate={this.state.dialogDate}
          onAccept={this._handleDialogAccept}
          onShow={onShow}
          onDismiss={onDismiss} />
      </div>

    );
  },

  getDate: function() {
    return this.state.date;
  },

  setDate: function(d) {
    this.setState({
      date: d
    });
    this.refs.input.setValue(this.props.formatDate(d));
  },

  _handleDialogAccept: function(d) {
    this.setDate(d);
    if (this.props.onChange) this.props.onChange(null, d);
  },

  /**
   * Handle native date input change
   */
  _handleInputChange: function(e) {
    var dateString = e.target.value;
    var d = null;

    /*
     * HTML5 date inputs return yyyy-mm-dd which will be parsed as UTC
     * since javascript treates all iso standards as UTC and non-standard
     * dates like mm/dd/yyyy as local (PUKE). This is changing in EMCA 2015
     * but for now we need to offset the local from UTC to make sure we use the
     * actual date the user selected
     */
    if (dateString) {
      var parts = dateString.split('-');
      // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
      
      // Make a local date with the date parts
      d = new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
    }

    if (this.props.onChange) this.props.onChange(null, d);
  },

  _handleInputFocus: function(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap: function(e) {
    this.setState({
      dialogDate: this.getDate()
    });

    /*
     * If this.props.preferNative is set to true
     * then we will only display the window if the browser
     * does not support a native date type
     */
    if (!this.props.preferNative || !device.test.inputtypes.date){
      this.refs.dialogWindow.show();
    }

    if (this.props.onClick) this.props.onClick(e);
  },

  _handleWindowKeyUp: function(e) {
    //TO DO: open the dialog if input has focus
  }

});

// Check for commonjs
if (module) {
  module.exports = DatePicker;
}

export default DatePicker;
