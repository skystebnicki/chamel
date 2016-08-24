'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var React = require('react');
var ReactDOM = require('react-dom');
// TODO: need to install
// "react-colorpickr": "3.*",
//var ReactColorPicker = require('react-colorpickr');
var FontIcon = require("../FontIcon");

var ColorPicker = React.createClass({
  displayName: 'ColorPicker',

  propTypes: {
    onColorPick: React.PropTypes.func,
    color: React.PropTypes.object,
    value: React.PropTypes.string,
    label: React.PropTypes.string
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
    return React.createElement(
      'div',
      { ref: 'colorPickerContainer', className: 'chamel-color-picker' },
      React.createElement(
        'div',
        { className: 'chamel-color-picker-close' },
        React.createElement(FontIcon, { onClick: this.close, className: 'cfi cfi-times' })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          'TODO: add here'
        )
      ),
      React.createElement(
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
    var cpStyle = ReactDOM.findDOMNode(this.refs.colorPickerContainer).style.display = "block";
  },

  /**
   * Hides the color picker
   *
   * @public
   */
  close: function close() {
    var cpStyle = ReactDOM.findDOMNode(this.refs.colorPickerContainer).style.display = "none";
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
if (module) {
  module.exports = ColorPicker;
}

exports.default = ColorPicker;
module.exports = exports['default'];