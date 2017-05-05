import React from 'react';
import PropTypes from 'prop-types';
import Classable from '../mixins/classable';
import DateTime from '../utils/DateTime';
import DayButton from './DayButton';

const CalendarMonth = (props) => {

  // mixins: [Classable],

  const classes = this.getClasses('chamel-date-picker-calendar-month');

  return (
    <div className={classes}>
      {this._getWeekElements()}
    </div>
  );

  _getWeekElements = () => {
    let weekArray = DateTime.getWeekArray(this.props.displayDate);

    return weekArray.map(function(week, i) {
      return (
        <div
          key={i}
          className="chamel-date-picker-calendar-month-week">
          {this._getDayElements(week)}
        </div>
      );
    }, this);
  };

  _isDisabled = (day) => {
    const minDate = this.props.minDate;
    const maxDate = this.props.maxDate;

    if(minDate != null && day < minDate){
      return true;
    }

    if(maxDate != null && day > maxDate){
      return true;
    }

    return false;
  };

  _getDayElements = (week) => {
    return week.map(function(day, i) {
      const selected = DateTime.isEqualDate(this.props.selectedDate, day);
      const disabled = this._isDisabled(day);
      return (
        <DayButton
          key={i}
          date={day}
          disabled={disabled}
          onClick={this._handleDayTouchTap}
          selected={selected} />
      );
    }, this);
  };

  _handleDayTouchTap = (e, date) => {
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
  };

}

CalendarMonth.propTypes: {
  displayDate: PropTypes.object.isRequired,
  onDayTouchTap: PropTypes.func,
  selectedDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  autoOk: PropTypes.bool
};

// Check for commonjs
if (module) {
  module.exports = CalendarMonth;
}

export default CalendarMonth;
