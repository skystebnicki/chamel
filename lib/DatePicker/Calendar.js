'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _WindowListenable = require('../mixins/WindowListenable');

var _WindowListenable2 = _interopRequireDefault(_WindowListenable);

var _DateTime = require('../utils/DateTime');

var _DateTime2 = _interopRequireDefault(_DateTime);

var _KeyCode = require('../utils/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _CalendarMonth = require('./CalendarMonth');

var _CalendarMonth2 = _interopRequireDefault(_CalendarMonth);

var _CalendarToolbar = require('./CalendarToolbar');

var _CalendarToolbar2 = _interopRequireDefault(_CalendarToolbar);

var _DateDisplay = require('./DateDisplay');

var _DateDisplay2 = _interopRequireDefault(_DateDisplay);

var _SlideIn = require('../transition-groups/SlideIn');

var _SlideIn2 = _interopRequireDefault(_SlideIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Calendar = _react2.default.createClass({
  displayName: 'Calendar',


  mixins: [_classable2.default, _WindowListenable2.default],

  propTypes: {
    initialDate: _react2.default.PropTypes.object,
    isActive: _react2.default.PropTypes.bool,
    maxDate: _react2.default.PropTypes.object,
    minDate: _react2.default.PropTypes.object,
    onSelectedDate: _react2.default.PropTypes.func
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
      displayDate: _DateTime2.default.getFirstDayOfMonth(this.props.initialDate),
      selectedDate: this.props.initialDate,
      transitionDirection: 'left'
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      var d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: _DateTime2.default.getFirstDayOfMonth(d),
        selectedDate: d
      });
    }
  },

  render: function render() {
    var weekCount = _DateTime2.default.getWeekArray(this.state.displayDate).length;
    var classes = this.getClasses('chamel-date-picker-calendar', {
      'chamel-is-4week': weekCount === 4,
      'chamel-is-5week': weekCount === 5,
      'chamel-is-6week': weekCount === 6
    });

    return _react2.default.createElement(
      'div',
      { className: classes },
      _react2.default.createElement(_DateDisplay2.default, {
        className: 'chamel-date-picker-calendar-date-display',
        selectedDate: this.state.selectedDate }),
      _react2.default.createElement(
        'div',
        {
          className: 'chamel-date-picker-calendar-container' },
        _react2.default.createElement(_CalendarToolbar2.default, {
          minDate: this.props.minDate,
          maxDate: this.props.maxDate,
          displayDate: this.state.displayDate,
          onLeftTouchTap: this._handleLeftTouchTap,
          onRightTouchTap: this._handleRightTouchTap }),
        _react2.default.createElement(
          'ul',
          { className: 'chamel-date-picker-calendar-week-title' },
          _react2.default.createElement(
            'li',
            { className: 'chamel-date-picker-calendar-week-title-day' },
            'S'
          ),
          _react2.default.createElement(
            'li',
            { className: 'chamel-date-picker-calendar-week-title-day' },
            'M'
          ),
          _react2.default.createElement(
            'li',
            { className: 'chamel-date-picker-calendar-week-title-day' },
            'T'
          ),
          _react2.default.createElement(
            'li',
            { className: 'chamel-date-picker-calendar-week-title-day' },
            'W'
          ),
          _react2.default.createElement(
            'li',
            { className: 'chamel-date-picker-calendar-week-title-day' },
            'T'
          ),
          _react2.default.createElement(
            'li',
            { className: 'chamel-date-picker-calendar-week-title-day' },
            'F'
          ),
          _react2.default.createElement(
            'li',
            { className: 'chamel-date-picker-calendar-week-title-day' },
            'S'
          )
        ),
        _react2.default.createElement(
          _SlideIn2.default,
          {
            direction: this.state.transitionDirection },
          _react2.default.createElement(_CalendarMonth2.default, {
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
    var newDisplayDate = _DateTime2.default.clone(this.state.displayDate);
    newDisplayDate.setMonth(newDisplayDate.getMonth() + m);
    this._setDisplayDate(newDisplayDate);
  },

  _addSelectedDays: function _addSelectedDays(days) {
    this._setSelectedDate(_DateTime2.default.addDays(this.state.selectedDate, days));
  },

  _addSelectedMonths: function _addSelectedMonths(months) {
    this._setSelectedDate(_DateTime2.default.addMonths(this.state.selectedDate, months));
  },

  _setDisplayDate: function _setDisplayDate(d, newSelectedDate) {
    var newDisplayDate = _DateTime2.default.getFirstDayOfMonth(d);
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
    var newDisplayDate = _DateTime2.default.getFirstDayOfMonth(d);

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

        case _KeyCode2.default.UP:
          if (e.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-7);
          }
          break;

        case _KeyCode2.default.DOWN:
          if (e.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(7);
          }
          break;

        case _KeyCode2.default.RIGHT:
          if (e.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(1);
          }
          break;

        case _KeyCode2.default.LEFT:
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