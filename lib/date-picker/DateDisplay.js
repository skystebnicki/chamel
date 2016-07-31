'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Classable = require('../mixins/classable');
var DateTime = require('../utils/DateTime');
var SlideInTransitionGroup = require('../transition-groups/SlideIn');

var DateDisplay = React.createClass({
  displayName: 'DateDisplay',


  mixins: [Classable],

  propTypes: {
    selectedDate: React.PropTypes.object.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      transitionDirection: 'up'
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var direction;

    if (nextProps.selectedDate !== this.props.selectedDate) {
      direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },

  render: function render() {
    var _props = this.props;
    var selectedDate = _props.selectedDate;

    var other = _objectWithoutProperties(_props, ['selectedDate']);

    var classes = this.getClasses('chamel-date-picker-date-display');
    var dayOfWeek = DateTime.getDayOfWeek(this.props.selectedDate);
    var month = DateTime.getShortMonth(this.props.selectedDate);
    var day = this.props.selectedDate.getDate();
    var year = this.props.selectedDate.getFullYear();

    return React.createElement(
      'div',
      _extends({}, other, { className: classes }),
      React.createElement(
        SlideInTransitionGroup,
        {
          className: 'chamel-date-picker-date-display-dow',
          direction: this.state.transitionDirection },
        React.createElement(
          'div',
          { key: dayOfWeek },
          dayOfWeek
        )
      ),
      React.createElement(
        'div',
        { className: 'chamel-date-picker-date-display-date' },
        React.createElement(
          SlideInTransitionGroup,
          {
            className: 'chamel-date-picker-date-display-month',
            direction: this.state.transitionDirection },
          React.createElement(
            'div',
            { key: month },
            month
          )
        ),
        React.createElement(
          SlideInTransitionGroup,
          {
            className: 'chamel-date-picker-date-display-day',
            direction: this.state.transitionDirection },
          React.createElement(
            'div',
            { key: day },
            day
          )
        ),
        React.createElement(
          SlideInTransitionGroup,
          {
            className: 'chamel-date-picker-date-display-year',
            direction: this.state.transitionDirection },
          React.createElement(
            'div',
            { key: year },
            year
          )
        )
      )
    );
  }

});

module.exports = DateDisplay;