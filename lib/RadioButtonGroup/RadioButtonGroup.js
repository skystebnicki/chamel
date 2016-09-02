'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Paper = require('../Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _EnhancedSwitch = require('../EnhancedSwitch/EnhancedSwitch');

var _EnhancedSwitch2 = _interopRequireDefault(_EnhancedSwitch);

var _RadioButton = require('../RadioButton/RadioButton');

var _RadioButton2 = _interopRequireDefault(_RadioButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var RadioButtonGroup = _react2.default.createClass({
  displayName: 'RadioButtonGroup',


  mixins: [_classable2.default],

  propTypes: {
    name: _react2.default.PropTypes.string.isRequired,
    valueSelected: _react2.default.PropTypes.string,

    /**
     * Set which value is 
    defaultSelected: React.PropTypes.string,
    
    /**
     * Float the label to the left or right of the radio button
     *
     * @type {string}
     */
    labelPosition: _react2.default.PropTypes.oneOf(['left', 'right']),

    /**
     * Callback trigger fired when a user selects a new radio option
     *
     * @type {function}
     */
    onChange: _react2.default.PropTypes.func,

    /**
     * Inline is used to determine if the radio buttons s are printed side-by-side
     *
     * @default true
     * @type {bool}
     */
    inline: _react2.default.PropTypes.bool
  },

  /**
   * Set default properties if not set by the calling component
   */
  getDefaultProps: function getDefaultProps() {
    return { inline: false };
  },

  _hasCheckAttribute: function _hasCheckAttribute(radioButton) {
    return radioButton.props.hasOwnProperty('checked') && radioButton.props.checked;
  },

  getInitialState: function getInitialState() {
    return {
      numberCheckedRadioButtons: 0,
      selected: this.props.valueSelected || this.props.defaultSelected || ''
    };
  },

  componentWillMount: function componentWillMount() {
    var cnt = 0;

    this.props.children.forEach(function (option) {
      if (this._hasCheckAttribute(option)) cnt++;
    }, this);

    this.setState({ numberCheckedRadioButtons: cnt });
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('valueSelected')) {
      this.setState({ selected: nextProps.valueSelected });
    }
  },

  render: function render() {

    var inline = this.props.inline;

    var options = this.props.children.map(function (option) {
      var _option$props = option.props;
      var name = _option$props.name;
      var value = _option$props.value;
      var label = _option$props.label;
      var onCheck = _option$props.onCheck;

      var other = _objectWithoutProperties(_option$props, ['name', 'value', 'label', 'onCheck']);

      return _react2.default.createElement(_RadioButton2.default, _extends({}, other, {
        inline: inline,
        ref: option.props.value,
        name: this.props.name,
        key: option.props.value,
        value: option.props.value,
        label: option.props.label,
        labelPosition: this.props.labelPosition,
        onCheck: this._onChange,
        checked: option.props.value == this.state.selected }));
    }, this);

    return _react2.default.createElement(
      'div',
      null,
      options
    );
  },

  _updateRadioButtons: function _updateRadioButtons(newSelection) {
    if (this.state.numberCheckedRadioButtons == 0) {
      this.setState({ selected: newSelection });
    } else if (process.env.NODE_ENV !== 'production') {
      var message = "Cannot select a different radio button while another radio button " + "has the 'checked' property set to true.";
      console.error(message);
    }
  },

  _onChange: function _onChange(e, newSelection) {
    this._updateRadioButtons(newSelection);

    // Successful update
    if (this.state.numberCheckedRadioButtons == 0) {
      if (this.props.onChange) this.props.onChange(e, newSelection);
    }
  },

  getSelectedValue: function getSelectedValue() {
    return this.state.selected;
  },

  setSelectedValue: function setSelectedValue(newSelection) {
    this._updateRadioButtons(newSelection);
  },

  clearValue: function clearValue() {
    this.setSelectedValue('');
  }

});

// Check for commonjs
if (module) {
  module.exports = RadioButtonGroup;
}

exports.default = RadioButtonGroup;
module.exports = exports['default'];