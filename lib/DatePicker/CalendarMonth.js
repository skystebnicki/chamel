'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _DateTime = require('../utils/DateTime');

var _DateTime2 = _interopRequireDefault(_DateTime);

var _DayButton = require('./DayButton');

var _DayButton2 = _interopRequireDefault(_DayButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarMonth = _react2.default.createClass({
  displayName: 'CalendarMonth',


  mixins: [_classable2.default],

  propTypes: {
    displayDate: _react2.default.PropTypes.object.isRequired,
    onDayTouchTap: _react2.default.PropTypes.func,
    selectedDate: _react2.default.PropTypes.object.isRequired,
    maxDate: _react2.default.PropTypes.object,
    minDate: _react2.default.PropTypes.object,
    autoOk: _react2.default.PropTypes.bool
  },

  render: function render() {
    var classes = this.getClasses('chamel-date-picker-calendar-month');

    return _react2.default.createElement(
      'div',
      { className: classes },
      this._getWeekElements()
    );
  },

  _getWeekElements: function _getWeekElements() {
    var weekArray = _DateTime2.default.getWeekArray(this.props.displayDate);

    return weekArray.map(function (week, i) {
      return _react2.default.createElement(
        'div',
        {
          key: i,
          className: 'chamel-date-picker-calendar-month-week' },
        this._getDayElements(week)
      );
    }, this);
  },
  _isDisabled: function _isDisabled(day) {
    var minDate = this.props.minDate;
    var maxDate = this.props.maxDate;

    if (minDate != null && day < minDate) {
      return true;
    }

    if (maxDate != null && day > maxDate) {
      return true;
    }

    return false;
  },
  _getDayElements: function _getDayElements(week) {
    return week.map(function (day, i) {
      var selected = _DateTime2.default.isEqualDate(this.props.selectedDate, day);
      var disabled = this._isDisabled(day);
      return _react2.default.createElement(_DayButton2.default, {
        key: i,
        date: day,
        disabled: disabled,
        onClick: this._handleDayTouchTap,
        selected: selected });
    }, this);
  },

  _handleDayTouchTap: function _handleDayTouchTap(e, date) {
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
  }

});

module.exports = CalendarMonth;