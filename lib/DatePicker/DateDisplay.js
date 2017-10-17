'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DateTime = require('../utils/DateTime');

var _DateTime2 = _interopRequireDefault(_DateTime);

var _SlideIn = require('../transition-groups/SlideIn');

var _SlideIn2 = _interopRequireDefault(_SlideIn);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateDisplay = function (_Component) {
  _inherits(DateDisplay, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function DateDisplay(props) {
    _classCallCheck(this, DateDisplay);

    var _this = _possibleConstructorReturn(this, (DateDisplay.__proto__ || Object.getPrototypeOf(DateDisplay)).call(this, props));
    // Call parent constructor


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
      transitionDirection: 'up'
    };
    return _this;
  }

  _createClass(DateDisplay, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var direction = void 0;

      if (nextProps.selectedDate !== this.props.selectedDate) {
        direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
        this.setState({
          transitionDirection: direction
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          selectedDate = _props.selectedDate,
          other = _objectWithoutProperties(_props, ['selectedDate']);

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
  }]);

  return DateDisplay;
}(_react.Component);

DateDisplay.propTypes = {
  selectedDate: _propTypes2.default.object.isRequired
};

module.exports = DateDisplay;