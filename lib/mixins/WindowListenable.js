'use strict';

var Events = require('../utils/Events');

module.exports = {

  componentDidMount: function componentDidMount() {
    var listeners = this.windowListeners;

    for (var eventName in listeners) {
      var callbackName = listeners[eventName];
      Events.on(window, eventName, this[callbackName]);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    var listeners = this.windowListeners;

    for (var eventName in listeners) {
      var callbackName = listeners[eventName];
      Events.off(window, eventName, this[callbackName]);
    }
  }

};