/**
 * Paper is a concept taken from google Material design standards
 *

 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

/**
 * Small application component
 */
var Paper = React.createClass({
  displayName: 'Paper',


  //mixins: [Classable],

  propTypes: {
    circle: React.PropTypes.bool,
    innerClassName: React.PropTypes.string,
    rounded: React.PropTypes.bool,
    zDepth: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      innerClassName: '',
      rounded: true,
      zDepth: 1
    };
  },

  render: function render() {

    var classes = "";

    if (this.props.className) {
      classes += this.props.className + " ";
    }

    classes += "chamel-paper chamel-z-depth-" + this.props.zDepth;

    if (this.props.rounded) {
      classes += " chamel-rounded";
    }

    if (this.props.circle) {
      classes += " chamel-circle";
    }

    var insideClasses = this.props.innerClassName + ' ' + 'chamel-paper-container ' + 'chamel-z-depth-bottom';

    return React.createElement(
      'div',
      _extends({}, this.props, { className: classes }),
      React.createElement(
        'div',
        { ref: 'innerContainer', className: insideClasses },
        this.props.children
      )
    );
  },

  getInnerContainer: function getInnerContainer() {
    return this.refs.innerContainer;
  }

});

// Check for commonjs
if (module) {
  module.exports = Paper;
}

exports.default = Paper;
module.exports = exports['default'];