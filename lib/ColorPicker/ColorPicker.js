'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _FontIcon = require('../FontIcon/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorPicker = function ColorPicker(props) {

	// <ReactColorPicker onChange={this._handleColorPick} value={this.props.value} />
	return _react2.default.createElement(
		'div',
		{ ref: 'colorPickerContainer', className: 'chamel-color-picker' },
		_react2.default.createElement(
			'div',
			{ className: 'chamel-color-picker-close' },
			_react2.default.createElement(_FontIcon2.default, { onClick: close, className: 'cfi cfi-times' })
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
			props.label
		)
	);

	/**
   * Displays the color picker
   *
   * @public
   */
	show = function show() {
		var cpStyle = _reactDom2.default.findDOMNode(undefined.refs.colorPickerContainer).style.display = "block";
	};

	/**
  * Hides the color picker
  *
  * @public
  */
	close = function close() {
		var cpStyle = _reactDom2.default.findDOMNode(undefined.refs.colorPickerContainer).style.display = "none";
	};

	/**
 * Get the latest color picked
 *
 * @public
 */
	getColor = function getColor() {
		return props.color;
	};

	/**
  * Handles the color picking event. This will trigger when the user chooses a color
  *
  * @param {string} color	The color that was selected
  * @private
  */
	_handleColorPick = function _handleColorPick(color) {
		props.color = color;
		if (props.onColorPick) props.onColorPick(color);
	};
};
// TODO: need to install
// "react-colorpickr": "3.*",
//var ReactColorPicker = require('react-colorpickr');


ColorPicker.propTypes = {
	onColorPick: _propTypes2.default.func,
	color: _propTypes2.default.object,
	value: _propTypes2.default.string,
	label: _propTypes2.default.string
};

ColorPicker.defaultProps = {
	value: "",
	label: "",
	color: null
};

exports.default = ColorPicker;
module.exports = exports['default'];