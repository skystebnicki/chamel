'use strict';

var React = require('react');
var Classable = require('../mixins/classable');
var DateTime = require('../utils/DateTime');
var DayButton = require('./DayButton');

var CalendarMonth = React.createClass({
  displayName: 'CalendarMonth',


  mixins: [Classable],

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onDayTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    autoOk: React.PropTypes.bool
  },

  render: function render() {
    var classes = this.getClasses('chamel-date-picker-calendar-month');

    return React.createElement(
      'div',
      { className: classes },
      this._getWeekElements()
    );
  },

  _getWeekElements: function _getWeekElements() {
    var weekArray = DateTime.getWeekArray(this.props.displayDate);

    return weekArray.map(function (week, i) {
      return React.createElement(
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
      var selected = DateTime.isEqualDate(this.props.selectedDate, day);
      var disabled = this._isDisabled(day);
      return React.createElement(DayButton, {
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