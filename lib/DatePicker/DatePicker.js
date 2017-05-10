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

var _Events = require('../utils/Events');

var _Events2 = _interopRequireDefault(_Events);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePicker = function (_Component) {
  _inherits(DatePicker, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));
    // Call parent constructor


    _this.getDate = function () {
      return _this.state.date;
    };

    _this.setDate = function (d) {
      _this.setState({
        date: d
      });
      _this.refs.input.setValue(_this.props.formatDate(d));
    };

    _this._handleDialogAccept = function (d) {
      _this.setDate(d);
      if (_this.props.onChange) _this.props.onChange(null, d);
    };

    _this._handleInputChange = function (e) {
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

      if (_this.props.onChange) _this.props.onChange(null, d);
    };

    _this._handleInputFocus = function (e) {
      e.target.blur();
      if (_this.props.onFocus) _this.props.onFocus(e);
    };

    _this._handleInputTouchTap = function (e) {
      _this.setState({
        dialogDate: _this.getDate()
      });

      /*
       * If this.props.preferNative is set to true
       * then we will only display the window if the browser
       * does not support a native date type
       */
      if (!_this.props.preferNative || !_device2.default.test.inputtypes.date) {
        _this.refs.dialogWindow.show();
      }

      if (_this.props.onClick) _this.props.onClick(e);
    };

    _this._handleWindowKeyUp = function (e) {
      //TO DO: open the dialog if input has focus
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
      date: _this.props.defaultDate,
      dialogDate: new Date()
    };
    return _this;
  }

  _createClass(DatePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _Events2.default.on(window, 'keyup', this._handleWindowKeyUp);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _Events2.default.off(window, 'keyup', this._handleWindowKeyUp);
    }
  }, {
    key: 'render',
    value: function render() {
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
      var defaultInputValue = void 0;

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
    }

    /**
     * Handle native date input change
     */

  }]);

  return DatePicker;
}(_react.Component);

DatePicker.propTypes = {
  defaultDate: _propTypes2.default.object,
  formatDate: _propTypes2.default.func,
  mode: _propTypes2.default.oneOf(['portrait', 'landscape', 'inline']),
  onFocus: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onShow: _propTypes2.default.func,
  onDismiss: _propTypes2.default.func,
  minDate: _propTypes2.default.object,
  maxDate: _propTypes2.default.object,
  autoOk: _propTypes2.default.bool,
  preferNative: _propTypes2.default.bool
};

DatePicker.defaultProps = {
  formatDate: _DateTime2.default.format,
  minDate: null,
  maxDate: null,
  autoOk: false,
  preferNative: true
};

exports.default = DatePicker;
module.exports = exports['default'];