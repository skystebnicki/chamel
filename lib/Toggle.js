'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('./mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _Paper = require('./Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//import EnhancedSwitch from './EnhancedSwitch/EnhancedSwitch';

var Toggle = _react2.default.createClass({
  displayName: 'Toggle',


  mixins: [_classable2.default],

  propTypes: {
    onToggle: _react2.default.PropTypes.func,
    toggled: _react2.default.PropTypes.bool,
    defaultToggled: _react2.default.PropTypes.bool
  },

  render: function render() {
    var _props = this.props;
    var onToggle = _props.onToggle;

    var other = _objectWithoutProperties(_props, ['onToggle']);

    var toggleElement = _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('div', { className: 'chamel-toggle-track' }),
      _react2.default.createElement(_Paper2.default, { className: 'chamel-toggle-thumb', zDepth: 1 })
    );

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switchElement: toggleElement,
      className: "chamel-toggle",
      iconClassName: "chamel-toggle-icon",
      onSwitch: this._handleToggle,
      defaultSwitched: this.props.defaultToggled,
      labelPosition: this.props.labelPosition ? this.props.labelPosition : "left"
    };

    if (this.props.hasOwnProperty('toggled')) enhancedSwitchProps.checked = this.props.toggled;

    return _react2.default.createElement(EnhancedSwitch, _extends({}, other, enhancedSwitchProps));
  },

  isToggled: function isToggled() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setToggled: function setToggled(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  },

  _handleToggle: function _handleToggle(e, isInputChecked) {
    if (this.props.onToggle) this.props.onToggle(e, isInputChecked);
  }
});

// Check for commonjs
if (module) {
  module.exports = Toggle;
}

exports.default = Toggle;
module.exports = exports['default'];