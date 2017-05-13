'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SvgIcon = function (_Component) {
  _inherits(SvgIcon, _Component);

  function SvgIcon() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SvgIcon);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SvgIcon.__proto__ || Object.getPrototypeOf(SvgIcon)).call.apply(_ref, [this].concat(args))), _this), _this.getClasses = function (initialClasses, additionalClassObj) {
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
    }, _this.getClassSet = function (classString) {
      var classObj = {};

      if (classString) {
        classString.split(' ').forEach(function (className) {
          if (className) classObj[className] = true;
        });
      }

      return classObj;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SvgIcon, [{
    key: 'render',
    value: function render() {
      var classes = this.getClasses('chamel-svg-icon');

      return _react2.default.createElement(
        'svg',
        _extends({}, this.props, {
          className: classes,
          viewBox: '0 0 24 24' }),
        this.props.children
      );
    }
  }]);

  return SvgIcon;
}(_react.Component);

module.exports = SvgIcon;