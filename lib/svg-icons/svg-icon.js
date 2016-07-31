'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Classable = require('../mixins/classable');

var SvgIcon = React.createClass({
  displayName: 'SvgIcon',


  mixins: [Classable],

  render: function render() {
    var classes = this.getClasses('chamel-svg-icon');

    return React.createElement(
      'svg',
      _extends({}, this.props, {
        className: classes,
        viewBox: '0 0 24 24' }),
      this.props.children
    );
  }

});

module.exports = SvgIcon;