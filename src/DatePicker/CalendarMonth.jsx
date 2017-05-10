import React from 'react';
import PropTypes from 'prop-types';
import DateTime from '../utils/DateTime';
import DayButton from './DayButton';

const _getDayElements = (week, props) => {
  let displayDayElements = [];
  week.forEach((day, i) => {
    const selected = DateTime.isEqualDate(props.selectedDate, day);

    displayDayElements.push(
      <DayButton
        key={i}
        date={day}
        disabled={(day) => {
          const minDate = props.minDate;
          const maxDate = props.maxDate;

          if (minDate != null && day < minDate) {
            return true;
          }

          if (maxDate != null && day > maxDate) {
            return true;
          }

          return false;
        }}
        onClick={(e, date) => {
          if (props.onDayTouchTap) props.onDayTouchTap(e, date);
        }}
        selected={selected}/>
    );
  });

  return displayDayElements;
};

const CalendarMonth = (props) => {

  const weekArray = DateTime.getWeekArray(props.displayDate);
  let displayWeekElements = [];

  weekArray.forEach((week, i) => {
    displayWeekElements.push(
      <div
        key={i}
        className="chamel-date-picker-calendar-month-week">
        {_getDayElements(week, props)}
      </div>
    );
  });

  return (
    <div className={"chamel-date-picker-calendar-month"}>
      {displayWeekElements}
    </div>
  );
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
