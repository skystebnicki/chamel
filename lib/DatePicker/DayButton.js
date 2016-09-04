'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _DateTime = require('../utils/DateTime');

var _DateTime2 = _interopRequireDefault(_DateTime);

var _EnhancedButton = require('../EnhancedButton/EnhancedButton');

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DayButton = _react2.default.createClass({
  displayName: 'DayButton',


  mixins: [_classable2.default],

  propTypes: {
    date: _react2.default.PropTypes.object,
    onClick: _react2.default.PropTypes.func,
    selected: _react2.default.PropTypes.bool
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var date = _props.date;
    var onClick = _props.onClick;
    var selected = _props.selected;

    var other = _objectWithoutProperties(_props, ['className', 'date', 'onClick', 'selected']);

    var classes = this.getClasses('chamel-date-picker-day-button', {
      'chamel-is-current-date': _DateTime2.default.isEqualDate(this.props.date, new Date()),
      'chamel-is-selected': this.props.selected
    });

    return this.props.date ? _react2.default.createElement(
      _EnhancedButton2.default,
      _extends({}, other, {
        className: classes,
        disableFocusRipple: true,
        disableTouchRipple: true,
        onClick: this._handleTouchTap }),
      _react2.default.createElement('div', { className: 'chamel-date-picker-day-button-select' }),
      _react2.default.createElement(
        'span',
        { className: 'chamel-date-picker-day-button-label' },
        this.props.date.getDate()
      )
    ) : _react2.default.createElement('span', { className: classes });
  },

  _handleTouchTap: function _handleTouchTap(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.date);
  }

});

module.exports = DayButton;