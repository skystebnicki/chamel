'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');

var SlideInChild = React.createClass({
  displayName: 'SlideInChild',
  componentWillEnter: function componentWillEnter(callback) {
    /*
    let style = ReactDOM.findDOMNode(this).style;
    let x = this.props.direction === 'left' ? '100%' :
      this.props.direction === 'right' ? '-100%' : '0';
    let y = this.props.direction === 'up' ? '100%' :
      this.props.direction === 'down' ? '-100%' : '0';
     style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');
     setTimeout(() => {
      if (this.isMounted()) callback();
    }, this.props.enterDelay);
    */
  },
  componentDidEnter: function componentDidEnter() {
    /*
    let style = ReactDOM.findDOMNode(this).style;
    style.opacity = '1';
    AutoPrefix.set(style, 'transform', 'translate3d(0,0,0)');
    */
  },
  componentWillLeave: function componentWillLeave(callback) {
    /*
    let style = ReactDOM.findDOMNode(this).style;
    let direction = this.props.getLeaveDirection();
    let x = direction === 'left' ? '-100%' :
      direction === 'right' ? '100%' : '0';
    let y = direction === 'up' ? '-100%' :
      direction === 'down' ? '100%' : '0';
     style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');
     setTimeout(() => {
      if (this.isMounted()) callback();
    }, 450);
    */
  },
  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['children', 'className']);

    var classes = "chamel-transition-slide-in-child";
    if (this.props.className) classes += " " + this.props.className;

    return React.createElement(
      'div',
      { className: classes },
      children
    );
  }
});

module.exports = SlideInChild;