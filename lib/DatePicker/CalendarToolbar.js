'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateTime = require('../utils/DateTime');

var _DateTime2 = _interopRequireDefault(_DateTime);

var _IconButton = require('../Button/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _navigationChevronLeft = require('../svg-icons/navigation-chevron-left');

var _navigationChevronLeft2 = _interopRequireDefault(_navigationChevronLeft);

var _navigationChevronRight = require('../svg-icons/navigation-chevron-right');

var _navigationChevronRight2 = _interopRequireDefault(_navigationChevronRight);

var _SlideIn = require('../transition-groups/SlideIn');

var _SlideIn2 = _interopRequireDefault(_SlideIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarToolbar = _react2.default.createClass({
  displayName: 'CalendarToolbar',


  propTypes: {
    displayDate: _react2.default.PropTypes.object.isRequired,
    onLeftTouchTap: _react2.default.PropTypes.func,
    onRightTouchTap: _react2.default.PropTypes.func,
    maxDate: _react2.default.PropTypes.object,
    minDate: _react2.default.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      maxDate: null,
      minDate: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      transitionDirection: 'up'
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var direction;

    if (nextProps.displayDate !== this.props.displayDate) {
      direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },
  _isDisabled: function _isDisabled(direction) {

    var date = this.props.displayDate;
    var minDate = this.props.minDate;
    var maxDate = this.props.maxDate;

    if (direction == "left" && minDate) {
      if (date.getFullYear() < minDate.getFullYear()) return true;
      if (date.getFullYear() == minDate.getFullYear()) {
        return date.getMonth() <= minDate.getMonth();
      }
    } else if (direction == "right" && maxDate) {
      if (date.getFullYear() > maxDate.getFullYear()) return true;
      if (date.getFullYear() == maxDate.getFullYear()) {
        return date.getMonth() >= maxDate.getMonth();
      }
    }

    return false;
  },
  render: function render() {
    var month = _DateTime2.default.getFullMonth(this.props.displayDate);
    var year = this.props.displayDate.getFullYear();

    var disableLeft = this._isDisabled("left");
    var disableRight = this._isDisabled("right");

    return _react2.default.createElement(
      'div',
      { className: 'chamel-date-picker-calendar-toolbar' },
      _react2.default.createElement(
        _SlideIn2.default,
        {
          className: 'chamel-date-picker-calendar-toolbar-title',
          direction: this.state.transitionDirection },
        _react2.default.createElement(
          'div',
          { key: month + '_' + year },
          month,
          ' ',
          year
        )
      ),
      _react2.default.createElement(
        _IconButton2.default,
        {
          disabled: disableLeft,
          className: 'chamel-date-picker-calendar-toolbar-button-left',
          onClick: this.props.onLeftTouchTap },
        _react2.default.createElement(_navigationChevronLeft2.default, null)
      ),
      _react2.default.createElement(
        _IconButton2.default,
        {
          disabled: disableRight,
          className: 'chamel-date-picker-calendar-toolbar-button-right',
          onClick: this.props.onRightTouchTap },
        _react2.default.createElement(_navigationChevronRight2.default, null)
      )
    );
  }

});

module.exports = CalendarToolbar;