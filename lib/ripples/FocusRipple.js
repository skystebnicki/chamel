'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('../mixins/classable');

var FocusRipple = React.createClass({
  displayName: 'FocusRipple',


  mixins: [Classable],

  propTypes: {
    show: React.PropTypes.bool
  },

  componentDidMount: function componentDidMount() {
    this._setRippleSize();
  },

  render: function render() {
    var classes = this.getClasses('chamel-focus-ripple', {
      'chamel-is-shown': this.props.show
    });

    return React.createElement(
      'div',
      { className: classes },
      React.createElement('div', { className: 'chamel-focus-ripple-inner' })
    );
  },

  _setRippleSize: function _setRippleSize() {
    var el = ReactDOM.findDOMNode(this);
    var height = el.offsetHeight;
    var width = el.offsetWidth;
    var size = Math.max(height, width);

    el.style.height = size + 'px';
    el.style.top = size / 2 * -1 + height / 2 + 'px';
  }

});

module.exports = FocusRipple;