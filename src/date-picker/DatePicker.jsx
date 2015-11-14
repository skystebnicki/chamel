var React = require('react');
var Classable = require('../mixins/classable.jsx');
var WindowListenable = require('../mixins/WindowListenable.jsx');
var DateTime = require('../utils/DateTime.jsx');
var KeyCode = require('../utils/KeyCode.jsx');
var DatePickerDialog = require('./DatePickerDialog.jsx');
var TextField = require('../TextField.jsx');
var device = require('../utils/device');

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

    return (
      <div className={classes}>
        <TextField
          {...other}
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

module.exports = DatePicker;
