'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getClasses = function getClasses(initialClasses, additionalClassObj, props) {
  var classString = '';

  //Initialize the classString with the classNames that were passed in
  if (props.className) classString += ' ' + props.className;

  //Add in initial classes
  if ((typeof initialClasses === 'undefined' ? 'undefined' : _typeof(initialClasses)) === 'object') {
    classString += ' ' + (0, _classnames2.default)(initialClasses);
  } else {
    classString += ' ' + initialClasses;
  }

  //Add in additional classes
  if (additionalClassObj) classString += ' ' + (0, _classnames2.default)(additionalClassObj);

  //Convert the class string into an object and run it through the class set
  return (0, _classnames2.default)(getClassSet(classString));
};

var getClassSet = function getClassSet(classString) {
  var classObj = {};

  if (classString) {
    classString.split(' ').forEach(function (className) {
      if (className) classObj[className] = true;
    });
  }

  return classObj;
};

var LinkMenuItem = function LinkMenuItem(props) {

  var classes = getClasses('chamel-menu-item', {
    'chamel-is-disabled': props.disabled
  }, props);
  var onClickHandler = props.disabled ? function (event) {
    event.preventDefault();
  } : undefined;
  // Prevent context menu 'Open In New Tab/Window'
  var linkAttribute = props.disabled ? 'data-href' : 'href';
  var link = {};
  link[linkAttribute] = props.payload;

  return _react2.default.createElement(
    'a',
    _extends({ key: props.index, className: classes }, link, { target: props.target, onClick: onClickHandler }),
    props.text
  );
};

LinkMenuItem.propTypes = {
  index: _propTypes2.default.number.isRequired,
  payload: _propTypes2.default.string.isRequired,
  text: _propTypes2.default.string.isRequired,
  target: _propTypes2.default.string,
  disabled: _propTypes2.default.bool
};

LinkMenuItem.defaultProps = {
  disabled: false
};

exports.default = LinkMenuItem;
module.exports = exports['default'];