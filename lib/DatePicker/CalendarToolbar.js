'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarToolbar = function (_Component) {
  _inherits(CalendarToolbar, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function CalendarToolbar(props) {
    _classCallCheck(this, CalendarToolbar);

    var _this = _possibleConstructorReturn(this, (CalendarToolbar.__proto__ || Object.getPrototypeOf(CalendarToolbar)).call(this, props));
    // Call parent constructor


    _this._isDisabled = function (direction) {

      var date = _this.props.displayDate;
      var minDate = _this.props.minDate;
      var maxDate = _this.props.maxDate;

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
    };

    _this.state = {
      transitionDirection: 'up'
    };
    return _this;
  }

  _createClass(CalendarToolbar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var direction = void 0;

      if (nextProps.displayDate !== this.props.displayDate) {
        direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
        this.setState({
          transitionDirection: direction
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
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
  }]);

  return CalendarToolbar;
}(_react.Component);

CalendarToolbar.propTypes = {
  displayDate: _propTypes2.default.object.isRequired,
  onLeftTouchTap: _propTypes2.default.func,
  onRightTouchTap: _propTypes2.default.func,
  maxDate: _propTypes2.default.object,
  minDate: _propTypes2.default.object
};

CalendarToolbar.defaultProps = {
  maxDate: null,
  minDate: null
};

exports.default = CalendarToolbar;
module.exports = exports['default'];