'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _KeyCode = require('../utils/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Dialog = require('../Dialog/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('../Button/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePickerDialog = function (_Component) {
  _inherits(DatePickerDialog, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function DatePickerDialog(props) {
    _classCallCheck(this, DatePickerDialog);

    var _this = _possibleConstructorReturn(this, (DatePickerDialog.__proto__ || Object.getPrototypeOf(DatePickerDialog)).call(this, props));
    // Call parent constructor


    _this.show = function () {
      _this.refs.dialogWindow.show();
    };

    _this.dismiss = function () {
      _this.refs.dialogWindow.dismiss();
    };

    _this._onSelectedDate = function () {
      if (_this.props.autoOk) {
        setTimeout(_this._handleOKTouchTap.bind(_this), 300);
      }
    };

    _this._handleCancelTouchTap = function () {
      _this.dismiss();
    };

    _this._handleOKTouchTap = function () {
      _this.dismiss();
      if (_this.props.onAccept) {
        _this.props.onAccept(_this.refs.calendar.getSelectedDate());
      }
    };

    _this._handleDialogShow = function () {
      _this.setState({
        isCalendarActive: true
      });

      if (_this.props.onShow) {
        _this.props.onShow();
      }
    };

    _this._handleDialogDismiss = function () {
      _this.setState({
        isCalendarActive: false
      });

      if (_this.props.onDismiss) {
        _this.props.onDismiss();
      }
    };

    _this._handleWindowKeyUp = function (e) {
      if (_this.refs.dialogWindow.isOpen()) {
        switch (e.keyCode) {
          case _KeyCode2.default.ENTER:
            _this._handleOKTouchTap();
            break;
        }
      }
    };

    _this.getClasses = function (initialClasses, additionalClassObj) {
      var classString = '';

      //Initialize the classString with the classNames that were passed in
      if (_this.props.className) classString += ' ' + _this.props.className;

      //Add in initial classes
      if ((typeof initialClasses === 'undefined' ? 'undefined' : _typeof(initialClasses)) === 'object') {
        classString += ' ' + (0, _classnames2.default)(initialClasses);
      } else {
        classString += ' ' + initialClasses;
      }

      //Add in additional classes
      if (additionalClassObj) classString += ' ' + (0, _classnames2.default)(additionalClassObj);

      //Convert the class string into an object and run it through the class set
      return (0, _classnames2.default)(_this.getClassSet(classString));
    };

    _this.getClassSet = function (classString) {
      var classObj = {};

      if (classString) {
        classString.split(' ').forEach(function (className) {
          if (className) classObj[className] = true;
        });
      }

      return classObj;
    };

    _this.state = {
      isCalendarActive: false
    };
    return _this;
  }

  _createClass(DatePickerDialog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      Events.on(window, 'keyup', this._handleWindowKeyUp);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      Events.off(window, 'keyup', this._handleWindowKeyUp);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          initialDate = _props.initialDate,
          onAccept = _props.onAccept,
          other = _objectWithoutProperties(_props, ['initialDate', 'onAccept']);

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
    }
  }]);

  return DatePickerDialog;
}(_react.Component);

DatePickerDialog.propTypes = {
  initialDate: _propTypes2.default.object,
  onAccept: _propTypes2.default.func,
  onShow: _propTypes2.default.func,
  onDismiss: _propTypes2.default.func,
  minDate: _propTypes2.default.object,
  maxDate: _propTypes2.default.object
};

exports.default = DatePickerDialog;
module.exports = exports['default'];