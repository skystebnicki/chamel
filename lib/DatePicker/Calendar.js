'use strict';

var React = require('react');
var Classable = require('../mixins/classable');
var WindowListenable = require('../mixins/WindowListenable');
var DateTime = require('../utils/DateTime');
var KeyCode = require('../utils/KeyCode');
var CalendarMonth = require('./CalendarMonth');
var CalendarToolbar = require('./CalendarToolbar');
var DateDisplay = require('./DateDisplay');
var SlideInTransitionGroup = require('../transition-groups/SlideIn');

var Calendar = React.createClass({
  displayName: 'Calendar',


  mixins: [Classable, WindowListenable],

  propTypes: {
    initialDate: React.PropTypes.object,
    isActive: React.PropTypes.bool,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onSelectedDate: React.PropTypes.func
  },

  windowListeners: {
    'keydown': '_handleWindowKeyDown'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialDate: new Date(),
      maxDate: null,
      minDate: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      displayDate: DateTime.getFirstDayOfMonth(this.props.initialDate),
      selectedDate: this.props.initialDate,
      transitionDirection: 'left'
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      var d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: DateTime.getFirstDayOfMonth(d),
        selectedDate: d
      });
    }
  },

  render: function render() {
    var weekCount = DateTime.getWeekArray(this.state.displayDate).length;
    var classes = this.getClasses('chamel-date-picker-calendar', {
      'chamel-is-4week': weekCount === 4,
      'chamel-is-5week': weekCount === 5,
      'chamel-is-6week': weekCount === 6
    });

    return React.createElement(
      'div',
      { className: classes },
      React.createElement(DateDisplay, {
        className: 'chamel-date-picker-calendar-date-display',
        selectedDate: this.state.selectedDate }),
      React.createElement(
        'div',
        {
          className: 'chamel-date-picker-calendar-container' },
        React.createElement(CalendarToolbar, {
          minDate: this.props.minDate,
          maxDate: this.props.maxDate,
          displayDate: this.state.displayDate,
          onLeftTouchTap: this._handleLeftTouchTap,
          onRightTouchTap: this._handleRightTouchTap }),
        React.createElement(
          'ul',
          { className: 'chamel-date-picker-calendar-week-title' },
          React.createElement(
            'li',
            { className: 'chamel-date-picker-calendar-week-title-day' },
            'S'
          ),
          React.createElement(
            'li',
            { className: 'chamel-date-picker-calendar-week-title-day' },
            'M'
          ),
          React.createElement(
            'li',
            { className: 'chamel-date-picker-calendar-week-title-day' },
            'T'
          ),
          React.createElement(
            'li',
            { className: 'chamel-date-picker-calendar-week-title-day' },
            'W'
          ),
          React.createElement(
            'li',
            { className: 'chamel-date-picker-calendar-week-title-day' },
            'T'
          ),
          React.createElement(
            'li',
            { className: 'chamel-date-picker-calendar-week-title-day' },
            'F'
          ),
          React.createElement(
            'li',
            { className: 'chamel-date-picker-calendar-week-title-day' },
            'S'
          )
        ),
        React.createElement(
          SlideInTransitionGroup,
          {
            direction: this.state.transitionDirection },
          React.createElement(CalendarMonth, {
            minDate: this.props.minDate,
            maxDate: this.props.maxDate,
            key: this.state.displayDate.toDateString(),
            displayDate: this.state.displayDate,
            onDayTouchTap: this._handleDayTouchTap,
            selectedDate: this.state.selectedDate })
        )
      )
    );
  },

  getSelectedDate: function getSelectedDate() {
    return this.state.selectedDate;
  },

  _addDisplayDate: function _addDisplayDate(m) {
    var newDisplayDate = DateTime.clone(this.state.displayDate);
    newDisplayDate.setMonth(newDisplayDate.getMonth() + m);
    this._setDisplayDate(newDisplayDate);
  },

  _addSelectedDays: function _addSelectedDays(days) {
    this._setSelectedDate(DateTime.addDays(this.state.selectedDate, days));
  },

  _addSelectedMonths: function _addSelectedMonths(months) {
    this._setSelectedDate(DateTime.addMonths(this.state.selectedDate, months));
  },

  _setDisplayDate: function _setDisplayDate(d, newSelectedDate) {
    var newDisplayDate = DateTime.getFirstDayOfMonth(d);
    var direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';

    if (newDisplayDate !== this.state.displayDate) {
      this.setState({
        displayDate: newDisplayDate,
        transitionDirection: direction,
        selectedDate: newSelectedDate || this.state.selectedDate
      });
    }
  },

  _setSelectedDate: function _setSelectedDate(d) {
    var newDisplayDate = DateTime.getFirstDayOfMonth(d);

    if (newDisplayDate !== this.state.displayDate) {
      this._setDisplayDate(newDisplayDate, d);
    } else {
      this.setState({
        selectedDate: d
      });
    }
    if (this.props.onSelectedDate) this.props.onSelectedDate(d);
  },

  _handleDayTouchTap: function _handleDayTouchTap(e, date) {
    this._setSelectedDate(date);
  },

  _handleLeftTouchTap: function _handleLeftTouchTap() {
    this._addDisplayDate(-1);
  },

  _handleRightTouchTap: function _handleRightTouchTap() {
    this._addDisplayDate(1);
  },

  _handleWindowKeyDown: function _handleWindowKeyDown(e) {
    var newSelectedDate;

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
  }

});

module.exports = Calendar;