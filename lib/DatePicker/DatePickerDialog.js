'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _WindowListenable = require('../mixins/WindowListenable');

var _WindowListenable2 = _interopRequireDefault(_WindowListenable);

var _KeyCode = require('../utils/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Dialog = require('../Dialog/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('../FlatButton/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DatePickerDialog = _react2.default.createClass({
  displayName: 'DatePickerDialog',


  mixins: [_classable2.default, _WindowListenable2.default],

  propTypes: {
    initialDate: _react2.default.PropTypes.object,
    onAccept: _react2.default.PropTypes.func,
    onShow: _react2.default.PropTypes.func,
    onDismiss: _react2.default.PropTypes.func,
    minDate: _react2.default.PropTypes.object,
    maxDate: _react2.default.PropTypes.object
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
    var actions = [_react2.default.createElement(_FlatButton2.default, {
      key: 0,
      label: 'Cancel',
      secondary: true,
      onClick: this._handleCancelTouchTap }), _react2.default.createElement(_FlatButton2.default, {
      key: 1,
      label: 'OK',
      secondary: true,
      onClick: this._handleOKTouchTap })];

    if (this.props.autoOk) {
      actions = actions.slice(0, 1);
    }

    return _react2.default.createElement(
      _Dialog2.default,
      _extends({}, other, {
        ref: 'dialogWindow',
        className: classes,
        actions: actions,
        onDismiss: this._handleDialogDismiss,
        onShow: this._handleDialogShow,
        repositionOnUpdate: false }),
      _react2.default.createElement(_Calendar2.default, {
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
        case _KeyCode2.default.ENTER:
          this._handleOKTouchTap();
          break;
      }
    }
  }

});

module.exports = DatePickerDialog;