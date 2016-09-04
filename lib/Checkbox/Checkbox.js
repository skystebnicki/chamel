'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EnhancedSwitch = require('../EnhancedSwitch/EnhancedSwitch');

var _EnhancedSwitch2 = _interopRequireDefault(_EnhancedSwitch);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _toggleCheckBoxOutlineBlank = require('../svg-icons/toggle-check-box-outline-blank');

var _toggleCheckBoxOutlineBlank2 = _interopRequireDefault(_toggleCheckBoxOutlineBlank);

var _toggleCheckBoxChecked = require('../svg-icons/toggle-check-box-checked');

var _toggleCheckBoxChecked2 = _interopRequireDefault(_toggleCheckBoxChecked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Checkbox = _react2.default.createClass({
  displayName: 'Checkbox',


  mixins: [_classable2.default],

  propTypes: {
    onCheck: _react2.default.PropTypes.func
  },

  render: function render() {
    var _props = this.props;
    var onCheck = _props.onCheck;

    var other = _objectWithoutProperties(_props, ['onCheck']);

    var classes = this.getClasses("chamel-checkbox");

    var checkboxElement = _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_toggleCheckBoxOutlineBlank2.default, { className: 'chamel-checkbox-box' }),
      _react2.default.createElement(_toggleCheckBoxChecked2.default, { className: 'chamel-checkbox-check' })
    );

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switchElement: checkboxElement,
      className: classes,
      iconClassName: "chamel-checkbox-icon",
      onSwitch: this._handleCheck,
      labelPosition: this.props.labelPosition ? this.props.labelPosition : "right"
    };

    return _react2.default.createElement(_EnhancedSwitch2.default, _extends({}, other, enhancedSwitchProps));
  },

  isChecked: function isChecked() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked: function setChecked(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },

  _handleCheck: function _handleCheck(e, isInputChecked) {
    if (this.props.onCheck) this.props.onCheck(e, isInputChecked);
  }
});

// Check for commonjs
if (module) {
  module.exports = Checkbox;
}

exports.default = Checkbox;
module.exports = exports['default'];