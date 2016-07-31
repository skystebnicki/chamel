'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Classable = require('../mixins/classable');
var WindowListenable = require('../mixins/WindowListenable');
var KeyCode = require('../utils/KeyCode');
var Calendar = require('./Calendar');
var Dialog = require('../Dialog');
var FlatButton = require('../FlatButton');

var DatePickerDialog = React.createClass({
  displayName: 'DatePickerDialog',


  mixins: [Classable, WindowListenable],

  propTypes: {
    initialDate: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getInitialState: function getInitialState() {
    return {
      isCalendarActive: false
    };
  },

  render: function render() {
    var _props = this.props;
    var initialDate = _props.initialDate;
    var onAccept = _props.onAccept;

    var other = _objectWithoutProperties(_props, ['initialDate', 'onAccept']);

    var classes = this.getClasses('chamel-date-picker-dialog');
    var actions = [React.createElement(FlatButton, {
      key: 0,
      label: 'Cancel',
      secondary: true,
      onClick: this._handleCancelTouchTap }), React.createElement(FlatButton, {
      key: 1,
      label: 'OK',
      secondary: true,
      onClick: this._handleOKTouchTap })];

    if (this.props.autoOk) {
      actions = actions.slice(0, 1);
    }

    return React.createElement(
      Dialog,
      _extends({}, other, {
        ref: 'dialogWindow',
        className: classes,
        actions: actions,
        onDismiss: this._handleDialogDismiss,
        onShow: this._handleDialogShow,
        repositionOnUpdate: false }),
      React.createElement(Calendar, {
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        ref: 'calendar',
        onSelectedDate: this._onSelectedDate,
        initialDate: this.props.initialDate,
        isActive: this.state.isCalendarActive })
    );
  },

  show: function show() {
    this.refs.dialogWindow.show();
  },

  dismiss: function dismiss() {
    this.refs.dialogWindow.dismiss();
  },

  _onSelectedDate: function _onSelectedDate() {
    if (this.props.autoOk) {
      setTimeout(this._handleOKTouchTap.bind(this), 300);
    }
  },

  _handleCancelTouchTap: function _handleCancelTouchTap() {
    this.dismiss();
  },

  _handleOKTouchTap: function _handleOKTouchTap() {
    this.dismiss();
    if (this.props.onAccept) {
      this.props.onAccept(this.refs.calendar.getSelectedDate());
    }
  },

  _handleDialogShow: function _handleDialogShow() {
    this.setState({
      isCalendarActive: true
    });

    if (this.props.onShow) {
      this.props.onShow();
    }
  },

  _handleDialogDismiss: function _handleDialogDismiss() {
    this.setState({
      isCalendarActive: false
    });

    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  },

  _handleWindowKeyUp: function _handleWindowKeyUp(e) {
    if (this.refs.dialogWindow.isOpen()) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    }
  }

});

module.exports = DatePickerDialog;