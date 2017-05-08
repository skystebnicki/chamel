import Events from '../utils/Events';

module.exports = {

  componentDidMount: function() {
    const listeners = this.windowListeners;

    for (let eventName in listeners) {
       const callbackName = listeners[eventName];
       Events.on(window, eventName, this[callbackName]);
    }
  },

  componentWillUnmount: function() {
    const listeners = this.windowListeners;

    for (let eventName in listeners) {
       const callbackName = listeners[eventName];
       Events.off(window, eventName, this[callbackName]);
    }
  }

}
