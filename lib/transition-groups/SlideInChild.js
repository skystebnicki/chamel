'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SlideInChild = function SlideInChild(props) {
  var children = props.children,
      className = props.className,
      other = _objectWithoutProperties(props, ['children', 'className']);

  var classes = "chamel-transition-slide-in-child";
  if (props.className) classes += " " + props.className;

  return _react2.default.createElement(
    'div',
    { className: classes },
    children
  );
};

exports.default = SlideInChild;
module.exports = exports['default'];