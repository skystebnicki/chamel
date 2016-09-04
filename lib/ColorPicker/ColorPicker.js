'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _FontIcon = require('../FontIcon/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorPicker = _react2.default.createClass({
  displayName: 'ColorPicker',

  propTypes: {
    onColorPick: _react2.default.PropTypes.func,
    color: _react2.default.PropTypes.object,
    value: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      value: "",
      label: "",
      color: null
    };
  },

  componentDidMount: function componentDidMount() {},

  render: function render() {
    // <ReactColorPicker onChange={this._handleColorPick} value={this.props.value} />
    return _react2.default.createElement(
      'div',
      { ref: 'colorPickerContainer', className: 'chamel-color-picker' },
      _react2.default.createElement(
        'div',
        { className: 'chamel-color-picker-close' },
        _react2.default.createElement(_FontIcon2.default, { onClick: this.close, className: 'cfi cfi-times' })
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          'TODO: add here'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'chamel-color-picker-label' },
        this.props.label
      )
    );
  },

  /**
      * Displays the color picker
      *
      * @public
      */
  show: function show() {
    var cpStyle = _reactDom2.default.findDOMNode(this.refs.colorPickerContainer).style.display = "block";
  },

  /**
   * Hides the color picker
   *
   * @public
   */
  close: function close() {
    var cpStyle = _reactDom2.default.findDOMNode(this.refs.colorPickerContainer).style.display = "none";
  },

  /**
   * Get the latest color picked
   *
   * @public
   */
  getColor: function getColor() {
    return this.props.color;
  },

  /**
      * Handles the color picking event. This will trigger when the user chooses a color
      *
      * @param {string} color	The color that was selected
      * @private
      */
  _handleColorPick: function _handleColorPick(color) {
    this.props.color = color;
    if (this.props.onColorPick) this.props.onColorPick(color);
  }
});

// Check for commonjs

// TODO: need to install
// "react-colorpickr": "3.*",
//var ReactColorPicker = require('react-colorpickr');
if (module) {
  module.exports = ColorPicker;
}

exports.default = ColorPicker;
module.exports = exports['default'];