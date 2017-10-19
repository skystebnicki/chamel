import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Events from '../utils/Events';
import DateTime from '../utils/DateTime';
import KeyCode from '../utils/KeyCode';
import CalendarMonth from './CalendarMonth';
import CalendarToolbar from './CalendarToolbar';
import DateDisplay from './DateDisplay';
import SlideInTransitionGroup from '../transition-groups/SlideIn';
import classNames from 'classnames';

class Calendar extends Component {
  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call parent constructor
    super(props);

    this.state = {
      displayDate: DateTime.getFirstDayOfMonth(this.props.initialDate),
      selectedDate: this.props.initialDate,
      transitionDirection: 'left',
    };
  }

  /**
   * Handle incoming new props
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      const d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: DateTime.getFirstDayOfMonth(d),
        selectedDate: d,
      });
    }
  }

  componentDidMount() {
    Events.on(window, 'keydown', this._handleWindowKeyDown);
  }

  componentWillUnmount() {
    Events.off(window, 'keydown', this._handleWindowKeyDown);
  }

  /**
   * Render the Calendar action
   *
   * @returns {Object}
   */
  render() {
    const weekCount = DateTime.getWeekArray(this.state.displayDate).length;
    const classes = this.getClasses('chamel-date-picker-calendar', {
      'chamel-is-4week': weekCount === 4,
      'chamel-is-5week': weekCount === 5,
      'chamel-is-6week': weekCount === 6,
    });

    return (
      <div className={classes}>
        <DateDisplay
          className="chamel-date-picker-calendar-date-display"
          selectedDate={this.state.selectedDate}
        />

        <div className="chamel-date-picker-calendar-container">
          <CalendarToolbar
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            displayDate={this.state.displayDate}
            onLeftTouchTap={this._handleLeftTouchTap}
            onRightTouchTap={this._handleRightTouchTap}
          />

          <ul className="chamel-date-picker-calendar-week-title">
            <li className="chamel-date-picker-calendar-week-title-day">S</li>
            <li className="chamel-date-picker-calendar-week-title-day">M</li>
            <li className="chamel-date-picker-calendar-week-title-day">T</li>
            <li className="chamel-date-picker-calendar-week-title-day">W</li>
            <li className="chamel-date-picker-calendar-week-title-day">T</li>
            <li className="chamel-date-picker-calendar-week-title-day">F</li>
            <li className="chamel-date-picker-calendar-week-title-day">S</li>
          </ul>

          <SlideInTransitionGroup direction={this.state.transitionDirection}>
            <CalendarMonth
              minDate={this.props.minDate}
              maxDate={this.props.maxDate}
              key={this.state.displayDate.toDateString()}
              displayDate={this.state.displayDate}
              onDayTouchTap={this._handleDayTouchTap}
              selectedDate={this.state.selectedDate}
            />
          </SlideInTransitionGroup>
        </div>
      </div>
    );
  }

  getSelectedDate = () => {
    return this.state.selectedDate;
  };

  _addDisplayDate = m => {
    let newDisplayDate = DateTime.clone(this.state.displayDate);
    newDisplayDate.setMonth(newDisplayDate.getMonth() + m);
    this._setDisplayDate(newDisplayDate);
  };

  _addSelectedDays = days => {
    this._setSelectedDate(DateTime.addDays(this.state.selectedDate, days));
  };

  _addSelectedMonths = months => {
    this._setSelectedDate(DateTime.addMonths(this.state.selectedDate, months));
  };

  _setDisplayDate = (d, newSelectedDate) => {
    const newDisplayDate = DateTime.getFirstDayOfMonth(d);
    const direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';

    if (newDisplayDate !== this.state.displayDate) {
      this.setState({
        displayDate: newDisplayDate,
        transitionDirection: direction,
        selectedDate: newSelectedDate || this.state.selectedDate,
      });
    }
  };

  _setSelectedDate = d => {
    const newDisplayDate = DateTime.getFirstDayOfMonth(d);

    if (newDisplayDate !== this.state.displayDate) {
      this._setDisplayDate(newDisplayDate, d);
    } else {
      this.setState({
        selectedDate: d,
      });
    }
    if (this.props.onSelectedDate) this.props.onSelectedDate(d);
  };

  _handleDayTouchTap = (e, date) => {
    this._setSelectedDate(date);
  };

  _handleLeftTouchTap = () => {
    this._addDisplayDate(-1);
  };

  _handleRightTouchTap = () => {
    this._addDisplayDate(1);
  };

  _handleWindowKeyDown = e => {
    if (this.props.isActive) {
      switch (e.keyCode) {
        case KeyCode.UP:
          if (e.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-7);
          }
          break;

        case KeyCode.DOWN:
          if (e.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(7);
          }
          break;

        case KeyCode.RIGHT:
          if (e.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(1);
          }
          break;

        case KeyCode.LEFT:
          if (e.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-1);
          }
          break;
      }
    }
  };

  getClasses = (initialClasses, additionalClassObj) => {
    let classString = '';

    //Initialize the classString with the classNames that were passed in
    if (this.props.className) classString += ' ' + this.props.className;

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

  getClassSet = classString => {
    let classObj = {};

    if (classString) {
      classString.split(' ').forEach(function(className) {
        if (className) classObj[className] = true;
      });
    }

    return classObj;
  };
}

/**
 * Set some sane defaults
 */
Calendar.defaultProps = {
  initialDate: new Date(),
  maxDate: null,
  minDate: null,
};

Calendar.propTypes = {
  initialDate: PropTypes.object,
  isActive: PropTypes.bool,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  onSelectedDate: PropTypes.func,
};

export default Calendar;
