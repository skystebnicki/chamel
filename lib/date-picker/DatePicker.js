'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Classable = require('../mixins/classable');
var WindowListenable = require('../mixins/WindowListenable');
var DateTime = require('../utils/DateTime');
var KeyCode = require('../utils/KeyCode');
var DatePickerDialog = require('./DatePickerDialog');
var TextField = require('../TextField');
var device = require('../utils/device');

var DatePicker = React.createClass({
  displayName: 'DatePicker',


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
    preferNative: React.PropTypes.bool
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      formatDate: DateTime.format,
      minDate: null,
      maxDate: null,
      autoOk: false,
      preferNative: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      date: this.props.defaultDate,
      dialogDate: new Date()
    };
  },

  render: function render() {
    var _props = this.props;
    var formatDate = _props.formatDate;
    var mode = _props.mode;
    var onChange = _props.onChange;
    var onFocus = _props.onFocus;
    var onClick = _props.onClick;
    var onShow = _props.onShow;
    var onDismiss = _props.onDismiss;
    var minDate = _props.minDate;
    var maxDate = _props.maxDate;
    var autoOk = _props.autoOk;

    var other = _objectWithoutProperties(_props, ['formatDate', 'mode', 'onChange', 'onFocus', 'onClick', 'onShow', 'onDismiss', 'minDate', 'maxDate', 'autoOk']);

    var classes = this.getClasses('chamel-date-picker', {
      'chamel-is-landscape': this.props.mode === 'landscape',
      'chamel-is-inline': this.props.mode === 'inline'
    });
    var defaultInputValue;

    if (this.props.defaultDate) {
      defaultInputValue = this.props.formatDate(this.props.defaultDate);
    }

    var inputType = this.props.preferNative ? "date" : "text";

    // If we are using the native input then we need to get value when changed
    var inpHndleOnChange = 'date' === inputType ? this._handleInputChange : null;

    return React.createElement(
      'div',
      { className: classes },
      React.createElement(TextField, _extends({}, other, {
        onChange: inpHndleOnChange,
        ref: 'input',
        type: inputType,
        defaultValue: defaultInputValue,
        onFocus: this._handleInputFocus,
        onClick: this._handleInputTouchTap })),
      React.createElement(DatePickerDialog, {
        minDate: minDate,
        maxDate: maxDate,
        autoOk: autoOk,
        ref: 'dialogWindow',
        initialDate: this.state.dialogDate,
        onAccept: this._handleDialogAccept,
        onShow: onShow,
        onDismiss: onDismiss })
    );
  },

  getDate: function getDate() {
    return this.state.date;
  },

  setDate: function setDate(d) {
    this.setState({
      date: d
    });
    this.refs.input.setValue(this.props.formatDate(d));
  },

  _handleDialogAccept: function _handleDialogAccept(d) {
    this.setDate(d);
    if (this.props.onChange) this.props.onChange(null, d);
  },

  /**
   * Handle native date input change
   */
  _handleInputChange: function _handleInputChange(e) {
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
      d = new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
    }

    if (this.props.onChange) this.props.onChange(null, d);
  },

  _handleInputFocus: function _handleInputFocus(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap: function _handleInputTouchTap(e) {
    this.setState({
      dialogDate: this.getDate()
    });

    /*
     * If this.props.preferNative is set to true
     * then we will only display the window if the browser
     * does not support a native date type
     */
    if (!this.props.preferNative || !device.test.inputtypes.date) {
      this.refs.dialogWindow.show();
    }

    if (this.props.onClick) this.props.onClick(e);
  },

  _handleWindowKeyUp: function _handleWindowKeyUp(e) {
    //TO DO: open the dialog if input has focus
  }

});

module.exports = DatePicker;