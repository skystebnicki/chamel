'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _SlideInChild = require('./SlideInChild');

var _SlideInChild2 = _interopRequireDefault(_SlideInChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SlideIn = _react2.default.createClass({
  displayName: 'SlideIn',


  propTypes: {
    className: _react2.default.PropTypes.string,
    enterDelay: _react2.default.PropTypes.number,
    childStyle: _react2.default.PropTypes.object,
    direction: _react2.default.PropTypes.oneOf(['left', 'right', 'up', 'down'])
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

    var newChildren = _react2.default.Children.map(children, function (child) {
      return _react2.default.createElement(
        _SlideInChild2.default,
        {
          key: child.key,
          direction: direction,
          getLeaveDirection: _this._getLeaveDirection },
        child
      );
    }, this);

    return _react2.default.createElement(
      _reactAddonsCssTransitionGroup2.default,
      {
        className: classes,
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 500,
        transitionName: 'chamel-transition-slide-in',
        component: 'div' },
      newChildren
    );
  },
  _getLeaveDirection: function _getLeaveDirection() {
    return this.props.direction;
  }
});

module.exports = SlideIn;