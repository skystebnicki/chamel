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

var _Events = require('../utils/Events');

var _Events2 = _interopRequireDefault(_Events);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));
    // Call parent constructor


    _this.getSelectedDate = function () {
      return _this.state.selectedDate;
    };

    _this._addDisplayDate = function (m) {
      var newDisplayDate = _DateTime2.default.clone(_this.state.displayDate);
      newDisplayDate.setMonth(newDisplayDate.getMonth() + m);
      _this._setDisplayDate(newDisplayDate);
    };

    _this._addSelectedDays = function (days) {
      _this._setSelectedDate(_DateTime2.default.addDays(_this.state.selectedDate, days));
    };

    _this._addSelectedMonths = function (months) {
      _this._setSelectedDate(_DateTime2.default.addMonths(_this.state.selectedDate, months));
    };

    _this._setDisplayDate = function (d, newSelectedDate) {
      var newDisplayDate = _DateTime2.default.getFirstDayOfMonth(d);
      var direction = newDisplayDate > _this.state.displayDate ? 'left' : 'right';

      if (newDisplayDate !== _this.state.displayDate) {
        _this.setState({
          displayDate: newDisplayDate,
          transitionDirection: direction,
          selectedDate: newSelectedDate || _this.state.selectedDate
        });
      }
    };

    _this._setSelectedDate = function (d) {
      var newDisplayDate = _DateTime2.default.getFirstDayOfMonth(d);

      if (newDisplayDate !== _this.state.displayDate) {
        _this._setDisplayDate(newDisplayDate, d);
      } else {
        _this.setState({
          selectedDate: d
        });
      }
      if (_this.props.onSelectedDate) _this.props.onSelectedDate(d);
    };

    _this._handleDayTouchTap = function (e, date) {
      _this._setSelectedDate(date);
    };

    _this._handleLeftTouchTap = function () {
      _this._addDisplayDate(-1);
    };

    _this._handleRightTouchTap = function () {
      _this._addDisplayDate(1);
    };

    _this._handleWindowKeyDown = function (e) {

      if (_this.props.isActive) {

        switch (e.keyCode) {

          case _KeyCode2.default.UP:
            if (e.shiftKey) {
              _this._addSelectedMonths(-1);
            } else {
              _this._addSelectedDays(-7);
            }
            break;

          case _KeyCode2.default.DOWN:
            if (e.shiftKey) {
              _this._addSelectedMonths(1);
            } else {
              _this._addSelectedDays(7);
            }
            break;

          case _KeyCode2.default.RIGHT:
            if (e.shiftKey) {
              _this._addSelectedMonths(1);
            } else {
              _this._addSelectedDays(1);
            }
            break;

          case _KeyCode2.default.LEFT:
            if (e.shiftKey) {
              _this._addSelectedMonths(-1);
            } else {
              _this._addSelectedDays(-1);
            }
            break;
        }
      }
    };

    _this.getClasses = function (initialClasses, additionalClassObj) {
      var classString = '';

      //Initialize the classString with the classNames that were passed in
      if (_this.props.className) classString += ' ' + _this.props.className;

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
    };

    _this.getClassSet = function (classString) {
      var classObj = {};

      if (classString) {
        classString.split(' ').forEach(function (className) {
          if (className) classObj[className] = true;
        });
      }

      return classObj;
    };

    _this.state = {
      displayDate: _DateTime2.default.getFirstDayOfMonth(_this.props.initialDate),
      selectedDate: _this.props.initialDate,
      transitionDirection: 'left'
    };
    return _this;
  }

  /**
   * Handle incoming new props
   */


  _createClass(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {

      if (nextProps.initialDate !== this.props.initialDate) {
        var d = nextProps.initialDate || new Date();
        this.setState({
          displayDate: _DateTime2.default.getFirstDayOfMonth(d),
          selectedDate: d
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _Events2.default.on(window, 'keydown', this._handleWindowKeyDown);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _Events2.default.off(window, 'keydown', this._handleWindowKeyDown);
    }
  }, {
    key: 'render',


    /**
     * Render the Calendar action
     *
     * @returns {Object}
     */
    value: function render() {
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
    }
  }]);

  return Calendar;
}(_react.Component);

/**
 * Set some sane defaults
 */


Calendar.defaultProps = {
  initialDate: new Date(),
  maxDate: null,
  minDate: null
};

Calendar.propTypes = {
  initialDate: _propTypes2.default.object,
  isActive: _propTypes2.default.bool,
  maxDate: _propTypes2.default.object,
  minDate: _propTypes2.default.object,
  onSelectedDate: _propTypes2.default.func
};

exports.default = Calendar;
module.exports = exports['default'];