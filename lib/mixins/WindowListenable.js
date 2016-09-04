'use strict';

var _Events = require('../utils/Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

  componentDidMount: function componentDidMount() {
    var listeners = this.windowListeners;

    for (var eventName in listeners) {
      var callbackName = listeners[eventName];
      _Events2.default.on(window, eventName, this[callbackName]);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    var listeners = this.windowListeners;

    for (var eventName in listeners) {
      var callbackName = listeners[eventName];
      _Events2.default.off(window, eventName, this[callbackName]);
    }
  }

};