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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    var _this = _possibleConstructorReturn(this, (TouchRipple.__proto__ || Object.getPrototypeOf(TouchRipple)).call(this, props));
    // Call paprent constructor


    _this.start = function (e) {
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

      //Re-render
      /*
      this.setState({
        ripples: ripples
      });
      */
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

    _this._handleTouchStart = function (e) {
      _this.start(e);
    };

    _this._handleTouchEnd = function (e) {
      _this.end();
    };

    _this._getRippleStyle = function (e) {
      var style = {};
      var el = _reactDom2.default.findDOMNode(_this);
      var elHeight = el.offsetHeight;
      var elWidth = el.offsetWidth;
      var offset = _Dom2.default.offset(el);
      var pageX = e.pageX == undefined ? e.nativeEvent.pageX : e.pageX;
      var pageY = e.pageY == undefined ? e.nativeEvent.pageY : e.pageY;
      var pointerX = pageX - offset.left;
      var pointerY = pageY - offset.top;
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
      var theme = this.context.chamelTheme && this.context.chamelTheme.ripple ? this.context.chamelTheme.ripple : {};

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
     */


    /**
     * Called when a user is finished clicking
     *
     * @param {event} e
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
  centerRipple: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string
};
TouchRipple.defaultProps = {
  show: false
};
TouchRipple.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};
;

// Check for commonjs
if (module) {
  module.exports = TouchRipple;
}

// ES6
exports.default = TouchRipple;
module.exports = exports['default'];