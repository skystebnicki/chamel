'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DateTime = require('../utils/DateTime');

var _DateTime2 = _interopRequireDefault(_DateTime);

var _DayButton = require('./DayButton');

var _DayButton2 = _interopRequireDefault(_DayButton);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarMonth = function (_Component) {
  _inherits(CalendarMonth, _Component);

  function CalendarMonth() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CalendarMonth);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CalendarMonth.__proto__ || Object.getPrototypeOf(CalendarMonth)).call.apply(_ref, [this].concat(args))), _this), _this._getDayElements = function (week) {
      var displayDayElements = [];
      week.forEach(function (day, i) {
        var selected = _DateTime2.default.isEqualDate(_this.props.selectedDate, day);

        displayDayElements.push(_react2.default.createElement(_DayButton2.default, {
          key: i,
          date: day,
          disabled: function disabled(day) {
            var minDate = _this.props.minDate;
            var maxDate = _this.props.maxDate;

            if (minDate != null && day < minDate) {
              return true;
            }

            if (maxDate != null && day > maxDate) {
              return true;
            }

            return false;
          },
          onClick: function onClick(e, date) {
            if (_this.props.onDayTouchTap) _this.props.onDayTouchTap(e, date);
          },
          selected: selected }));
      });

      return displayDayElements;
    }, _this.getClasses = function (initialClasses, additionalClassObj) {
      var classString = '';

      //Initialize the classString with the classNames that were passed in
      if (_this.this.props.className) classString += ' ' + _this.this.props.className;

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
    }, _this.getClassSet = function (classString) {
      var classObj = {};

      if (classString) {
        classString.split(' ').forEach(function (className) {
          if (className) classObj[className] = true;
        });
      }

      return classObj;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CalendarMonth, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = this.getClasses('chamel-date-picker-calendar-month-week');

      var weekArray = _DateTime2.default.getWeekArray(this.props.displayDate);
      var displayWeekElements = [];

      weekArray.forEach(function (week, i) {
        displayWeekElements.push(_react2.default.createElement(
          'div',
          {
            key: i,
            className: classes },
          _this2._getDayElements(week)
        ));
      });

      return _react2.default.createElement(
        'div',
        { className: "chamel-date-picker-calendar-month" },
        displayWeekElements
      );
    }
  }]);

  return CalendarMonth;
}(_react.Component);

CalendarMonth.propTypes = {
  displayDate: _propTypes2.default.object.isRequired,
  onDayTouchTap: _propTypes2.default.func,
  selectedDate: _propTypes2.default.object.isRequired,
  maxDate: _propTypes2.default.object,
  minDate: _propTypes2.default.object,
  autoOk: _propTypes2.default.bool
};

exports.default = CalendarMonth;
module.exports = exports['default'];