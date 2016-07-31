'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Classable = require('../mixins/classable');
var DateTime = require('../utils/DateTime');
var EnhancedButton = require('../EnhancedButton');

var DayButton = React.createClass({
  displayName: 'DayButton',


  mixins: [Classable],

  propTypes: {
    date: React.PropTypes.object,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var date = _props.date;
    var onClick = _props.onClick;
    var selected = _props.selected;

    var other = _objectWithoutProperties(_props, ['className', 'date', 'onClick', 'selected']);

    var classes = this.getClasses('chamel-date-picker-day-button', {
      'chamel-is-current-date': DateTime.isEqualDate(this.props.date, new Date()),
      'chamel-is-selected': this.props.selected
    });

    return this.props.date ? React.createElement(
      EnhancedButton,
      _extends({}, other, {
        className: classes,
        disableFocusRipple: true,
        disableTouchRipple: true,
        onClick: this._handleTouchTap }),
      React.createElement('div', { className: 'chamel-date-picker-day-button-select' }),
      React.createElement(
        'span',
        { className: 'chamel-date-picker-day-button-label' },
        this.props.date.getDate()
      )
    ) : React.createElement('span', { className: classes });
  },

  _handleTouchTap: function _handleTouchTap(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.date);
  }

});

module.exports = DayButton;