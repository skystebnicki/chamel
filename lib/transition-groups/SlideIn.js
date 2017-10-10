'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = require('react-transition-group');

var _SlideInChild = require('./SlideInChild');

var _SlideInChild2 = _interopRequireDefault(_SlideInChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SlideIn = function SlideIn(props) {
  var className = props.className,
      children = props.children,
      direction = props.direction,
      other = _objectWithoutProperties(props, ['className', 'children', 'direction']);

  var classes = props.className ? props.className + ' ' : null;
  classes += 'chamel-transition-slide-in chamel-is-' + props.direction;
  //var classes = 'chamel-transition-slide-in chamel-is-' + this.props.direction;

  var newChildren = _react2.default.Children.map(children, function (child) {
    return _react2.default.createElement(
      _SlideInChild2.default,
      {
        key: child.key,
        direction: direction,
        getLeaveDirection: undefined._getLeaveDirection },
      child
    );
  }, undefined);

  return _react2.default.createElement(
    _reactTransitionGroup.CSSTransition,
    {
      className: classes,
      timeout: { enter: 500, exit: 500 },
      classNames: 'chamel-transition-slide-in',
      component: 'div' },
    newChildren
  );

  _getLeaveDirection = function _getLeaveDirection() {
    return props.direction;
  };
};

SlideIn.propTypes = {
  className: _propTypes2.default.string,
  enterDelay: _propTypes2.default.number,
  childStyle: _propTypes2.default.object,
  direction: _propTypes2.default.oneOf(['left', 'right', 'up', 'down'])
};

SlideIn.defaultProps = {
  enterDelay: 0,
  direction: 'left'
};

exports.default = SlideIn;
module.exports = exports['default'];