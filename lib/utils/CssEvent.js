'use strict';

var _Events = require('./Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

  _testSupportedProps: function _testSupportedProps(props) {
    var i,
        undefined,
        el = document.createElement('div');

    for (i in props) {
      if (props.hasOwnProperty(i) && el.style[i] !== undefined) {
        return props[i];
      }
    }
  },

  //Returns the correct event name to use
  transitionEndEventName: function transitionEndEventName() {
    return this._testSupportedProps({
      'transition': 'transitionend',
      'OTransition': 'otransitionend',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    });
  },

  animationEndEventName: function animationEndEventName() {
    return this._testSupportedProps({
      'animation': 'animationend',
      '-o-animation': 'oAnimationEnd',
      '-moz-animation': 'animationend',
      '-webkit-animation': 'webkitAnimationEnd'
    });
  },

  onTransitionEnd: function onTransitionEnd(el, callback) {
    var transitionEnd = this.transitionEndEventName();

    _Events2.default.once(el, transitionEnd, function () {
      return callback();
    });
  },

  onAnimationEnd: function onAnimationEnd(el, callback) {
    var animationEnd = this.animationEndEventName();

    _Events2.default.once(el, animationEnd, function () {
      return callback();
    });
  }

};