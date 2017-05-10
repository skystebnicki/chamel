'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Paper = require('../Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _reactDraggable = require('react-draggable2');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  /**
   * Class constructor takes properties and passes them to the parent/super
   */
  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    _initialiseProps.call(_this);

    var value = _this.props.value;
    if (value == null) value = _this.props.defaultValue;
    var percent = (value - _this.props.min) / (_this.props.max - _this.props.min);
    if (isNaN(percent)) percent = 0;
    _this.state = {
      value: value,
      percent: percent
    };
    return _this;
  }

  _createClass(Slider, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value != null) {
        this.setValue(nextProps.value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = this.getClasses('chamel-input', {
        'chamel-error': this.props.error != null
      });

      var sliderClasses = this.getClasses('chamel-slider', {
        'chamel-slider-zero': this.state.percent == 0,
        'chamel-disabled': this.props.disabled
      });

      var percent = this.state.percent;
      if (percent > 1) percent = 1;else if (percent < 0) percent = 0;

      return _react2.default.createElement(
        'div',
        { className: classes, style: this.props.style },
        _react2.default.createElement('span', { className: 'chamel-input-highlight' }),
        _react2.default.createElement('span', { className: 'chamel-input-bar' }),
        _react2.default.createElement(
          'span',
          { className: 'chamel-input-description' },
          this.props.description
        ),
        _react2.default.createElement(
          'span',
          { className: 'chamel-input-error' },
          this.props.error
        ),
        _react2.default.createElement(
          'div',
          { className: sliderClasses, onClick: this._onClick },
          _react2.default.createElement(
            'div',
            { ref: 'track', className: 'chamel-slider-track' },
            _react2.default.createElement(
              _reactDraggable2.default,
              { axis: 'x', bound: 'point',
                cancel: this.props.disabled ? '*' : null,
                start: { x: percent * 100 + '%' },
                onStart: this._onDragStart,
                onStop: this._onDragStop,
                onDrag: this._onDragUpdate },
              _react2.default.createElement('div', { className: 'chamel-slider-handle', tabIndex: 0 })
            ),
            _react2.default.createElement(
              'div',
              { className: 'chamel-slider-selection chamel-slider-selection-low',
                style: { width: percent * 100 + '%' } },
              _react2.default.createElement('div', { className: 'chamel-slider-selection-fill' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'chamel-slider-selection chamel-slider-selection-high',
                style: { width: (1 - percent) * 100 + '%' } },
              _react2.default.createElement('div', { className: 'chamel-slider-selection-fill' })
            )
          )
        ),
        _react2.default.createElement('input', { ref: 'input', type: 'hidden',
          name: this.props.name,
          value: this.state.value,
          required: this.props.required,
          min: this.props.min,
          max: this.props.max,
          step: this.props.step })
      );
    }
  }]);

  return Slider;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getValue = function () {
    return _this2.state.value;
  };

  this.setValue = function (i) {
    // calculate percentage
    var percent = (i - _this2.props.min) / (_this2.props.max - _this2.props.min);
    if (isNaN(percent)) percent = 0;
    // update state
    _this2.setState({
      value: i,
      percent: percent
    });
  };

  this.getPercent = function () {
    return _this2.state.percent;
  };

  this.setPercent = function (percent) {
    var value = _this2._percentToValue(percent);
    _this2.setState({ value: value, percent: percent });
  };

  this.clearValue = function () {
    _this2.setValue(0);
  };

  this._onClick = function (e) {
    // let draggable handle the slider
    if (_this2.state.dragging || _this2.props.disabled) return;
    var value = _this2.state.value;
    var node = _reactDom2.default.findDOMNode(_this2.refs.track);
    var boundingClientRect = node.getBoundingClientRect();
    var offset = e.clientX - boundingClientRect.left;
    _this2._updateWithChangeEvent(e, offset / node.clientWidth);
  };

  this._onDragStart = function (e, ui) {
    _this2.setState({
      dragging: true
    });
    if (_this2.props.onDragStart) _this2.props.onDragStart(e, ui);
  };

  this._onDragStop = function (e, ui) {
    _this2.setState({
      dragging: false
    });
    if (_this2.props.onDragStop) _this2.props.onDragStop(e, ui);
  };

  this._onDragUpdate = function (e, ui) {
    if (!_this2.state.dragging) return;
    if (!_this2.props.disabled) _this2._dragX(e, ui.position.left);
  };

  this._dragX = function (e, pos) {
    var max = _reactDom2.default.findDOMNode(_this2.refs.track).clientWidth;
    if (pos < 0) pos = 0;else if (pos > max) pos = max;
    _this2._updateWithChangeEvent(e, pos / max);
  };

  this._updateWithChangeEvent = function (e, percent) {
    if (_this2.state.percent === percent) return;
    _this2.setPercent(percent);
    var value = _this2._percentToValue(percent);
    if (_this2.props.onChange) _this2.props.onChange(e, value);
  };

  this._percentToValue = function (percent) {
    return percent * (_this2.props.max - _this2.props.min) + _this2.props.min;
  };

  this.getClasses = function (initialClasses, additionalClassObj) {
    var classString = '';

    //Initialize the classString with the classNames that were passed in
    if (_this2.props.className) classString += ' ' + _this2.props.className;

    //Add in initial classes
    if ((typeof initialClasses === 'undefined' ? 'undefined' : _typeof(initialClasses)) === 'object') {
      classString += ' ' + (0, _classnames2.default)(initialClasses);
    } else {
      classString += ' ' + initialClasses;
    }

    //Add in additional classes
    if (additionalClassObj) classString += ' ' + (0, _classnames2.default)(additionalClassObj);

    //Convert the class string into an object and run it through the class set
    return (0, _classnames2.default)(_this2.getClassSet(classString));
  };

  this.getClassSet = function (classString) {
    var classObj = {};

    if (classString) {
      classString.split(' ').forEach(function (className) {
        if (className) classObj[className] = true;
      });
    }

    return classObj;
  };
};

Slider.propTypes = {
  required: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  step: _propTypes2.default.number,
  error: _propTypes2.default.string,
  description: _propTypes2.default.string,
  name: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func,
  onDragStart: _propTypes2.default.func,
  onDragStop: _propTypes2.default.func
};

Slider.defaultProps = {
  required: true,
  disabled: false,
  defaultValue: 0,
  min: 0,
  max: 1,
  dragging: false
};

exports.default = Slider;
module.exports = exports['default'];