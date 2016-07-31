'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Classable = require('../mixins/classable');

var RippleCircle = React.createClass({
  displayName: 'RippleCircle',


  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    started: React.PropTypes.bool,
    ending: React.PropTypes.bool
  },

  render: function render() {

    var innerClassName = this.props.innerClassName;
    var started = this.props.started;
    var ending = this.props.ending;

    var classes = this.getClasses('chamel-ripple-circle', {
      'chamel-is-started': this.props.started,
      'chamel-is-ending': this.props.ending
    });

    return React.createElement(
      'div',
      _extends({}, this.props, { className: classes }),
      React.createElement('div', { className: 'chamel-ripple-circle-inner' })
    );
  }

});

module.exports = RippleCircle;