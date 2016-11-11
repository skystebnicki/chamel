'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _DateTime = require('../utils/DateTime');

var _DateTime2 = _interopRequireDefault(_DateTime);

var _SlideIn = require('../transition-groups/SlideIn');

var _SlideIn2 = _interopRequireDefault(_SlideIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DateDisplay = _react2.default.createClass({
  displayName: 'DateDisplay',


  mixins: [_classable2.default],

  propTypes: {
    selectedDate: _react2.default.PropTypes.object.isRequired
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
    var dayOfWeek = _DateTime2.default.getDayOfWeek(this.props.selectedDate);
    var month = _DateTime2.default.getShortMonth(this.props.selectedDate);
    var day = this.props.selectedDate.getDate();
    var year = this.props.selectedDate.getFullYear();

    return _react2.default.createElement(
      'div',
      _extends({}, other, { className: classes }),
      _react2.default.createElement(
        _SlideIn2.default,
        {
          className: 'chamel-date-picker-date-display-dow',
          direction: this.state.transitionDirection },
        _react2.default.createElement(
          'div',
          { key: dayOfWeek },
          dayOfWeek
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'chamel-date-picker-date-display-date' },
        _react2.default.createElement(
          _SlideIn2.default,
          {
            className: 'chamel-date-picker-date-display-month',
            direction: this.state.transitionDirection },
          _react2.default.createElement(
            'div',
            { key: month },
            month
          )
        ),
        _react2.default.createElement(
          _SlideIn2.default,
          {
            className: 'chamel-date-picker-date-display-day',
            direction: this.state.transitionDirection },
          _react2.default.createElement(
            'div',
            { key: day },
            day
          )
        ),
        _react2.default.createElement(
          _SlideIn2.default,
          {
            className: 'chamel-date-picker-date-display-year',
            direction: this.state.transitionDirection },
          _react2.default.createElement(
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