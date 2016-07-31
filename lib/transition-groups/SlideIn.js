'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var SlideInChild = require('./SlideInChild');

var SlideIn = React.createClass({
  displayName: 'SlideIn',


  propTypes: {
    className: React.PropTypes.string,
    enterDelay: React.PropTypes.number,
    childStyle: React.PropTypes.object,
    direction: React.PropTypes.oneOf(['left', 'right', 'up', 'down'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      enterDelay: 0,
      direction: 'left'
    };
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var direction = _props.direction;

    var other = _objectWithoutProperties(_props, ['className', 'children', 'direction']);

    var classes = this.props.className ? this.props.className + ' ' : null;
    classes += 'chamel-transition-slide-in chamel-is-' + this.props.direction;
    //var classes = 'chamel-transition-slide-in chamel-is-' + this.props.direction;

    var newChildren = React.Children.map(children, function (child) {
      return React.createElement(
        SlideInChild,
        {
          key: child.key,
          direction: direction,
          getLeaveDirection: _this._getLeaveDirection },
        child
      );
    }, this);

    return React.createElement(
      ReactCSSTransitionGroup,
      _extends({}, other, {
        className: classes,
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 500,
        transitionName: 'chamel-transition-slide-in',
        component: 'div' }),
      newChildren
    );
  },
  _getLeaveDirection: function _getLeaveDirection() {
    return this.props.direction;
  }
});

module.exports = SlideIn;