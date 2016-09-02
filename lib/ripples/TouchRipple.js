'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _Dom = require('../utils/Dom');

var _Dom2 = _interopRequireDefault(_Dom);

var _Circle = require('./Circle');

var _Circle2 = _interopRequireDefault(_Circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TouchRipple = _react2.default.createClass({
  displayName: 'TouchRipple',


  mixins: [_classable2.default],

  propTypes: {
    centerRipple: _react2.default.PropTypes.bool,
    className: _react2.default.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      ripples: [{
        key: 0,
        started: false,
        ending: false
      }]
    };
  },

  render: function render() {
    var classes = this.getClasses('chamel-touch-ripple');

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
        { className: classes },
        this._getRippleElements()
      ),
      this.props.children
    );
  },

  start: function start(e) {
    var ripples = this.state.ripples;
    var nextKey = ripples[ripples.length - 1].key + 1;
    var style = !this.props.centerRipple ? this._getRippleStyle(e) : {};
    var ripple;

    //Start the next unstarted ripple
    for (var i = 0; i < ripples.length; i++) {
      ripple = ripples[i];
      if (!ripple.started) {
        ripple.started = true;
        ripple.style = style;
        break;
      }
    };

    //Add an unstarted ripple at the end
    ripples.push({
      key: nextKey,
      started: false,
      ending: false
    });

    //Re-render
    this.setState({
      ripples: ripples
    });
  },

  end: function end() {
    var ripples = this.state.ripples;
    var ripple;
    var endingRipple;

    //End the the next un-ended ripple
    for (var i = 0; i < ripples.length; i++) {
      ripple = ripples[i];
      if (ripple.started && !ripple.ending) {
        ripple.ending = true;
        endingRipple = ripple;
        break;
      }
    };

    //Only update if a ripple was found
    if (endingRipple) {
      //Re-render
      this.setState({
        ripples: ripples
      });

      //Wait 2 seconds and remove the ripple from DOM
      setTimeout(function () {
        ripples.shift();
        if (this.isMounted()) {
          this.setState({
            ripples: ripples
          });
        }
      }.bind(this), 2000);
    }
  },

  _handleMouseDown: function _handleMouseDown(e) {
    //only listen to left clicks
    if (e.button === 0) this.start(e);
  },

  _handleMouseUp: function _handleMouseUp(e) {
    this.end();
  },

  _handleMouseOut: function _handleMouseOut(e) {
    this.end();
  },

  _handleTouchStart: function _handleTouchStart(e) {
    this.start(e);
  },

  _handleTouchEnd: function _handleTouchEnd(e) {
    this.end();
  },

  _getRippleStyle: function _getRippleStyle(e) {
    var style = {};
    var el = _reactDom2.default.findDOMNode(this);
    var elHeight = el.offsetHeight;
    var elWidth = el.offsetWidth;
    var offset = _Dom2.default.offset(el);
    var pageX = e.pageX == undefined ? e.nativeEvent.pageX : e.pageX;
    var pageY = e.pageY == undefined ? e.nativeEvent.pageY : e.pageY;
    var pointerX = pageX - offset.left;
    var pointerY = pageY - offset.top;
    var topLeftDiag = this._calcDiag(pointerX, pointerY);
    var topRightDiag = this._calcDiag(elWidth - pointerX, pointerY);
    var botRightDiag = this._calcDiag(elWidth - pointerX, elHeight - pointerY);
    var botLeftDiag = this._calcDiag(pointerX, elHeight - pointerY);
    var rippleRadius = Math.max(topLeftDiag, topRightDiag, botRightDiag, botLeftDiag);
    var rippleSize = rippleRadius * 2;
    var left = pointerX - rippleRadius;
    var top = pointerY - rippleRadius;

    style.height = rippleSize + 'px';
    style.width = rippleSize + 'px';
    style.top = top + 'px';
    style.left = left + 'px';

    return style;
  },

  _calcDiag: function _calcDiag(a, b) {
    return Math.sqrt(a * a + b * b);
  },

  _getRippleElements: function _getRippleElements() {
    return this.state.ripples.map(function (ripple) {
      return _react2.default.createElement(_Circle2.default, {
        key: ripple.key,
        started: ripple.started,
        ending: ripple.ending,
        style: ripple.style });
    }.bind(this));
  }

});

module.exports = TouchRipple;