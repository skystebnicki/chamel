'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DateTime = require('../utils/DateTime');

var _DateTime2 = _interopRequireDefault(_DateTime);

var _DayButton = require('./DayButton');

var _DayButton2 = _interopRequireDefault(_DayButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _getDayElements = function _getDayElements(week, props) {
  var displayDayElements = [];
  week.forEach(function (day, i) {
    var selected = _DateTime2.default.isEqualDate(props.selectedDate, day);

    displayDayElements.push(_react2.default.createElement(_DayButton2.default, {
      key: i,
      date: day,
      disabled: function disabled(day) {
        var minDate = props.minDate;
        var maxDate = props.maxDate;

        if (minDate != null && day < minDate) {
          return true;
        }

        if (maxDate != null && day > maxDate) {
          return true;
        }

        return false;
      },
      onClick: function onClick(e, date) {
        if (props.onDayTouchTap) props.onDayTouchTap(e, date);
      },
      selected: selected }));
  });

  return displayDayElements;
};

var CalendarMonth = function CalendarMonth(props) {

  var weekArray = _DateTime2.default.getWeekArray(props.displayDate);
  var displayWeekElements = [];

  weekArray.forEach(function (week, i) {
    displayWeekElements.push(_react2.default.createElement(
      'div',
      {
        key: i,
        className: 'chamel-date-picker-calendar-month-week' },
      _getDayElements(week, props)
    ));
  });

  return _react2.default.createElement(
    'div',
    { className: "chamel-date-picker-calendar-month" },
    displayWeekElements
  );
};

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