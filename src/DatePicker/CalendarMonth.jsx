import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DateTime from '../utils/DateTime';
import DayButton from './DayButton';
import classNames from 'classnames';

class CalendarMonth extends Component {

  render() {
    const classes = this.getClasses('chamel-date-picker-calendar-month-week');

    const weekArray = DateTime.getWeekArray(this.props.displayDate);
    let displayWeekElements = [];

    weekArray.forEach((week, i) => {
      displayWeekElements.push(
        <div
          key={i}
          className={classes}>
          {this._getDayElements(week)}
        </div>
      );
    });

    return (
      <div className={"chamel-date-picker-calendar-month"}>
        {displayWeekElements}
      </div>
    );
  };

  _getDayElements = (week) => {
    let displayDayElements = [];
    week.forEach((day, i) => {
      const selected = DateTime.isEqualDate(this.props.selectedDate, day);

      displayDayElements.push(
        <DayButton
          key={i}
          date={day}
          disabled={(day) => {
          const minDate = this.props.minDate;
          const maxDate = this.props.maxDate;

          if (minDate != null && day < minDate) {
            return true;
          }

          if (maxDate != null && day > maxDate) {
            return true;
          }

          return false;
        }}
          onClick={(e, date) => {
          if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
        }}
          selected={selected}/>
      );
    });

    return displayDayElements;
  };

  getClasses = (initialClasses, additionalClassObj) => {
    let classString = '';

    //Initialize the classString with the classNames that were passed in
    if (this.this.props.className) classString += ' ' + this.this.props.className;

    //Add in initial classes
    if (typeof initialClasses === 'object') {
      classString += ' ' + classNames(initialClasses);
    } else {
      classString += ' ' + initialClasses;
    }

    //Add in additional classes
    if (additionalClassObj) classString += ' ' + classNames(additionalClassObj);

    //Convert the class string into an object and run it through the class set
    return classNames(this.getClassSet(classString));
  };

  getClassSet = (classString) => {
    let classObj = {};

    if (classString) {
      classString.split(' ').forEach(function (className) {
        if (className) classObj[className] = true;
      });
    }

    return classObj;
  };
}

CalendarMonth.propTypes = {
  displayDate: PropTypes.object.isRequired,
  onDayTouchTap: PropTypes.func,
  selectedDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  autoOk: PropTypes.bool
};

export default CalendarMonth;
