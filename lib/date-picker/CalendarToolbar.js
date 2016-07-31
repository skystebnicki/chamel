'use strict';

var React = require('react');
var DateTime = require('../utils/DateTime');
var IconButton = require('../IconButton');
var NavigationChevronLeft = require('../svg-icons/navigation-chevron-left');
var NavigationChevronRight = require('../svg-icons/navigation-chevron-right');
var SlideInTransitionGroup = require('../transition-groups/SlideIn');

var CalendarToolbar = React.createClass({
  displayName: 'CalendarToolbar',


  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onLeftTouchTap: React.PropTypes.func,
    onRightTouchTap: React.PropTypes.func,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object
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
    var month = DateTime.getFullMonth(this.props.displayDate);
    var year = this.props.displayDate.getFullYear();

    var disableLeft = this._isDisabled("left");
    var disableRight = this._isDisabled("right");

    return React.createElement(
      'div',
      { className: 'chamel-date-picker-calendar-toolbar' },
      React.createElement(
        SlideInTransitionGroup,
        {
          className: 'chamel-date-picker-calendar-toolbar-title',
          direction: this.state.transitionDirection },
        React.createElement(
          'div',
          { key: month + '_' + year },
          month,
          ' ',
          year
        )
      ),
      React.createElement(
        IconButton,
        {
          disabled: disableLeft,
          className: 'chamel-date-picker-calendar-toolbar-button-left',
          onClick: this.props.onLeftTouchTap },
        React.createElement(NavigationChevronLeft, null)
      ),
      React.createElement(
        IconButton,
        {
          disabled: disableRight,
          className: 'chamel-date-picker-calendar-toolbar-button-right',
          onClick: this.props.onRightTouchTap },
        React.createElement(NavigationChevronRight, null)
      )
    );
  }

});

module.exports = CalendarToolbar;