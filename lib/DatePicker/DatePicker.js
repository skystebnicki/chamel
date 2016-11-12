'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _WindowListenable = require('../mixins/WindowListenable');

var _WindowListenable2 = _interopRequireDefault(_WindowListenable);

var _DateTime = require('../utils/DateTime');

var _DateTime2 = _interopRequireDefault(_DateTime);

var _KeyCode = require('../utils/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _DatePickerDialog = require('./DatePickerDialog');

var _DatePickerDialog2 = _interopRequireDefault(_DatePickerDialog);

var _TextField = require('../Input/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _device = require('../utils/device');

var _device2 = _interopRequireDefault(_device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DatePicker = _react2.default.createClass({
  displayName: 'DatePicker',


  mixins: [_classable2.default, _WindowListenable2.default],

  propTypes: {
    defaultDate: _react2.default.PropTypes.object,
    formatDate: _react2.default.PropTypes.func,
    mode: _react2.default.PropTypes.oneOf(['portrait', 'landscape', 'inline']),
    onFocus: _react2.default.PropTypes.func,
    onClick: _react2.default.PropTypes.func,
    onChange: _react2.default.PropTypes.func,
    onShow: _react2.default.PropTypes.func,
    onDismiss: _react2.default.PropTypes.func,
    minDate: _react2.default.PropTypes.object,
    maxDate: _react2.default.PropTypes.object,
    autoOk: _react2.default.PropTypes.bool,
    preferNative: _react2.default.PropTypes.bool
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      formatDate: _DateTime2.default.format,
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
    var _props = this.props,
        formatDate = _props.formatDate,
        mode = _props.mode,
        onChange = _props.onChange,
        onFocus = _props.onFocus,
        onClick = _props.onClick,
        onShow = _props.onShow,
        onDismiss = _props.onDismiss,
        minDate = _props.minDate,
        maxDate = _props.maxDate,
        autoOk = _props.autoOk,
        other = _objectWithoutProperties(_props, ['formatDate', 'mode', 'onChange', 'onFocus', 'onClick', 'onShow', 'onDismiss', 'minDate', 'maxDate', 'autoOk']);

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

    // We need to exclude the preferNative property as it is an unkown props for <input> tag
    if (other.hasOwnProperty("preferNative")) {
      delete other.preferNative;
    }

    return _react2.default.createElement(
      'div',
      { className: classes },
      _react2.default.createElement(_TextField2.default, _extends({}, other, {
        onChange: inpHndleOnChange,
        ref: 'input',
        type: inputType,
        defaultValue: defaultInputValue,
        onFocus: this._handleInputFocus,
        onClick: this._handleInputTouchTap })),
      _react2.default.createElement(_DatePickerDialog2.default, {
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
    if (!this.props.preferNative || !_device2.default.test.inputtypes.date) {
      this.refs.dialogWindow.show();
    }

    if (this.props.onClick) this.props.onClick(e);
  },

  _handleWindowKeyUp: function _handleWindowKeyUp(e) {
    //TO DO: open the dialog if input has focus
  }

});

// Check for commonjs
if (module) {
  module.exports = DatePicker;
}

exports.default = DatePicker;
module.exports = exports['default'];