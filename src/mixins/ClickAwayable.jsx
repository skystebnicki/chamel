import React from 'react';
import ReactDOM from 'react-dom';
import Events from '../utils/Events';
import Dom from '../utils/Dom';

module.exports = {

  getInitialState: function () {

    // Return the initial state
    return {
      componentIsMounted: false
    };
  },

  //When the component mounts, listen to click events and check if we need to
  //Call the componentClickAway function.
  componentDidMount: function() {
    this.setState({componentIsMounted: true});
    if (!this.manuallyBindClickAway) this._bindClickAway();
  },

  componentWillUnmount: function() {
    this.setState({componentIsMounted: false});
    this._unbindClickAway();
  },

  _checkClickAway: function(e) {
    var el = ReactDOM.findDOMNode(this);

    // Check if the target is inside the current component
    if (this.state.componentIsMounted &&
      e.target != el &&
      !Dom.isDescendant(el, e.target) &&
      document.documentElement.contains(e.target)) {
      if (this.componentClickAway) this.componentClickAway();
    }
  },

  _bindClickAway: function() {
    Events.on(document, 'click', this._checkClickAway);
  },

  _unbindClickAway: function() {
    Events.off(document, 'click', this._checkClickAway);
  }

};