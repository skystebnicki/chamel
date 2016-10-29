'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Dom = require('../utils/Dom');

var _Dom2 = _interopRequireDefault(_Dom);

var _CircleRipple = require('./CircleRipple');

var _CircleRipple2 = _interopRequireDefault(_CircleRipple);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

// Remove the first element of the array
var shift = function shift(_ref) {
  var _ref2 = _toArray(_ref);

  var newArray = _ref2.slice(1);

  return newArray;
};

/**
 * A touch ripple origninates from where the user touches/clicks
 */

var TouchRipple = function (_React$Component) {
  _inherits(TouchRipple, _React$Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */


  /**
   * Set property defaults
   */
  function TouchRipple(props) {
    _classCallCheck(this, TouchRipple);

    // Touch start produces a mouse down event for compat reasons. To avoid
    // showing ripples twice we skip showing a ripple for the first mouse down
    // after a touch start. Note we don't store ignoreNextMouseDown in this.state
    // to avoid re-rendering when we change it.
    var _this = _possibleConstructorReturn(this, (TouchRipple.__proto__ || Object.getPrototypeOf(TouchRipple)).call(this, props));
    // Call paprent constructor


    _this.start = function (e, isRippleTouchGenerated) {

      if (_this.ignoreNextMouseDown && !isRippleTouchGenerated) {
        _this.ignoreNextMouseDown = false;
        return;
      }

      var ripples = _this.state.ripples;
      var nextKey = ripples[ripples.length - 1].key + 1;
      var style = !_this.props.centerRipple ? _this._getRippleStyle(e) : {};
      var ripple = void 0;

      //Start the next unstarted ripple
      for (var i = 0; i < ripples.length; i++) {
        ripple = ripples[i];
        if (!ripple.started) {
          ripple.started = true;
          ripple.style = style;
          break;
        }
      }

      //Add an unstarted ripple at the end
      ripples.push({
        key: nextKey,
        started: false,
        ending: false
      });

      // If we just generated a ripple from a touch, ignore the next mouse down
      _this.ignoreNextMouseDown = isRippleTouchGenerated;

      // Re-render unless this is a mouse event because there is a bug
      // in the onTap of the plugin 'react-tappable'. - Sky
      if ('mousedown' != e.type) {
        _this.setState({
          ripples: ripples
        });
      }
    };

    _this.end = function (e) {
      var ripples = _this.state.ripples;
      var ripple = void 0;
      var endingRipple = void 0;

      //End the the next un-ended ripple
      for (var i = 0; i < ripples.length; i++) {
        ripple = ripples[i];
        if (ripple.started && !ripple.ending) {
          ripple.ending = true;
          endingRipple = ripple;
          break;
        }
      }

      //Only update if a ripple was found
      if (endingRipple) {
        //Re-render
        _this.setState({
          ripples: ripples
        });

        //Wait 2 seconds and remove the ripple from DOM
        setTimeout(function () {
          ripples.shift();
          _this.setState({
            ripples: ripples
          });
        }, 2000);
      }
    };

    _this._handleMouseDown = function (e) {
      //only listen to left clicks
      if (e.button === 0) {
        _this.start(e);
      }
    };

    _this._handleMouseUp = function (e) {
      _this.end();
    };

    _this._handleMouseOut = function (e) {
      _this.end();
    };

    _this._handleTouchStart = function (event) {

      // Not sure why we need to stop propogation, but commenting it out does nothing
      //event.stopPropagation();

      // If the user is swiping (not just tapping), save the position so we can
      // abort ripples if the user appears to be scrolling.
      if (_this.props.abortOnScroll && event.touches) {
        _this.startListeningForScrollAbort(event);
        _this.startTime = Date.now();
      }
      _this.start(event, true);
    };

    _this._handleTouchEnd = function (e) {
      _this.end();
    };

    _this.handleTouchMove = function (event) {
      // Stop trying to abort if we're already 300ms into the animation
      var timeSinceStart = Math.abs(Date.now() - _this.startTime);
      if (timeSinceStart > 300) {
        _this.stopListeningForScrollAbort();
        return;
      }

      // If the user is scrolling...
      var deltaY = Math.abs(event.touches[0].clientY - _this.firstTouchY);
      var deltaX = Math.abs(event.touches[0].clientX - _this.firstTouchX);

      // Call it a scroll after an arbitrary 6px (feels reasonable in testing)
      if (deltaY > 6 || deltaX > 6) {
        var currentRipples = _this.state.ripples;
        var ripple = currentRipples[0];
        // This clone will replace the ripple in ReactTransitionGroup with a
        // version that will disappear immediately when removed from the DOM
        var abortedRipple = _react2.default.cloneElement(ripple, { aborted: true });
        // Remove the old ripple and replace it with the new updated one
        currentRipples = shift(currentRipples);
        currentRipples = [].concat(_toConsumableArray(currentRipples), [abortedRipple]);
        _this.setState({ ripples: currentRipples }, function () {
          // Call end after we've set the ripple to abort otherwise the setState
          // in end() merges with this and the ripple abort fails
          _this.end();
        });
      }
    };

    _this._getRippleStyle = function (e) {
      var style = {};
      var el = _reactDom2.default.findDOMNode(_this);
      var elHeight = el.offsetHeight;
      var elWidth = el.offsetWidth;
      var offset = _Dom2.default.offset(el);
      var eventCoordinates = _this._getPageXY(e);

      var pointerX = eventCoordinates.x - offset.left;
      var pointerY = eventCoordinates.y - offset.top;
      var topLeftDiag = _this._calcDiag(pointerX, pointerY);
      var topRightDiag = _this._calcDiag(elWidth - pointerX, pointerY);
      var botRightDiag = _this._calcDiag(elWidth - pointerX, elHeight - pointerY);
      var botLeftDiag = _this._calcDiag(pointerX, elHeight - pointerY);
      var rippleRadius = Math.max(topLeftDiag, topRightDiag, botRightDiag, botLeftDiag);
      var rippleSize = rippleRadius * 2;
      var left = pointerX - rippleRadius;
      var top = pointerY - rippleRadius;

      style.height = rippleSize + 'px';
      style.width = rippleSize + 'px';
      style.top = top + 'px';
      style.left = left + 'px';

      return style;
    };

    _this._getPageXY = function (e) {
      var out = {};

      if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
        var touch = e.touches[0] || e.changedTouches[0];
        out.x = touch.pageX;
        out.y = touch.pageY;
      } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave') {
        out.x = e.pageX;
        out.y = e.pageY;
      }

      return out;
    };

    _this.ignoreNextMouseDown = false;

    _this.state = {
      ripples: [{
        key: 0,
        started: false,
        ending: false
      }]
    };
    return _this;
  }

  /**
   * Render the component
   *
   * @returns {JSX}
   */


  /**
   * An alternate theme may be passed down by a provider
   */


  /**
   * Set accepted properties
   */


  _createClass(TouchRipple, [{
    key: 'render',
    value: function render() {
      var theme = this.context.chamelTheme && this.context.chamelTheme.ripple ? this.context.chamelTheme.ripple : _ChamelThemeService2.default.defaultTheme.ripple;

      return _react2.default.createElement(
        'div',
        {
          onMouseUp: this._handleMouseUp,
          onMouseDown: this._handleMouseDown,
          onMouseOut: this._handleMouseOut,
          onTouchStart: this._handleTouchStart,
          onTouchEnd: this._handleTouchEnd },
        _react2.default.createElement(
          'div',
          { className: theme.rippleTouch },
          this._getRippleElements()
        ),
        this.props.children
      );
    }

    /**
     * Called when a user starts clicking/tapping
     *
     * @param {event} e
     * @param {bool} isRippleTouchGenerated
     */


    /**
     * Called when a user is finished clicking
     *
     * @param {event} e
     */


    // Check if the user seems to be scrolling and abort the animation if so

  }, {
    key: 'startListeningForScrollAbort',
    value: function startListeningForScrollAbort(event) {
      this.firstTouchY = event.touches[0].clientY;
      this.firstTouchX = event.touches[0].clientX;
      // Note that when scolling Chrome throttles this event to every 200ms
      // Also note we don't listen for scroll events directly as there's no general
      // way to cover cases like scrolling within containers on the page
      document.body.addEventListener('touchmove', this.handleTouchMove);
    }
  }, {
    key: 'stopListeningForScrollAbort',
    value: function stopListeningForScrollAbort() {
      document.body.removeEventListener('touchmove', this.handleTouchMove);
    }

    /**
     * Get x and y coordinates from an event
     */

  }, {
    key: '_calcDiag',
    value: function _calcDiag(a, b) {
      return Math.sqrt(a * a + b * b);
    }
  }, {
    key: '_getRippleElements',
    value: function _getRippleElements() {
      return this.state.ripples.map(function (ripple) {
        return _react2.default.createElement(_CircleRipple2.default, {
          key: ripple.key,
          started: ripple.started,
          ending: ripple.ending,
          style: ripple.style });
      });
    }
  }]);

  return TouchRipple;
}(_react2.default.Component);

TouchRipple.propTypes = {
  abortOnScroll: _react2.default.PropTypes.bool,
  centerRipple: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string
};
TouchRipple.defaultProps = {
  show: false,
  abortOnScroll: true
};
TouchRipple.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};
;

// ES6
exports.default = TouchRipple;
module.exports = exports['default'];