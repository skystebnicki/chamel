'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Events = require('../utils/Events');
var Dom = require('../utils/Dom');

module.exports = {

  //When the component mounts, listen to click events and check if we need to
  //Call the componentClickAway function.
  componentDidMount: function componentDidMount() {
    if (!this.manuallyBindClickAway) this._bindClickAway();
  },

  componentWillUnmount: function componentWillUnmount() {
    this._unbindClickAway();
  },

  _checkClickAway: function _checkClickAway(e) {
    var el = ReactDOM.findDOMNode(this);

    // Check if the target is inside the current component
    if (this.isMounted() && e.target != el && !Dom.isDescendant(el, e.target) && document.documentElement.contains(e.target)) {
      if (this.componentClickAway) this.componentClickAway();
    }
  },

  _bindClickAway: function _bindClickAway() {
    Events.on(document, 'click', this._checkClickAway);
  },

  _unbindClickAway: function _unbindClickAway() {
    Events.off(document, 'click', this._checkClickAway);
  }

};