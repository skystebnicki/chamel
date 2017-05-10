'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextFieldRich = require('../TextFieldRich/TextFieldRich');

var _TextFieldRich2 = _interopRequireDefault(_TextFieldRich);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContentRte = function ContentRte(props) {

	return _react2.default.createElement(_TextFieldRich2.default, {
		ref: 'textFieldRich',
		onFocus: _handleFocus,
		onBlur: _handleBlur,
		onChange: _handleChange,
		value: props.value });

	/**
  * Sends a command to the TextFieldRich component which executes an editor command
  *
  * @param {string} command 	The name of the RTE command to execute
  * @param {string} option 	The option when executing a certain command. e.g. changing the font/background colors
  * @public
  */
	sendCommand = function sendCommand(command, option) {
		undefined.refs.textFieldRich.sendCommand(command, option);
	};

	/**
     * Sends a command to the TextFieldRich to change the font/background color
     *
     * @param {string} type		Type of command to be executed. Either forecolor or backcolor
     * @param {string} color	The color that was selected
     * @public
     */
	setColor = function setColor(type, color) {
		undefined.refs.textFieldRich.setColor(type, color);
	};

	/**
  * Calls a function in the TextFieldRich which insert the a href link
  *
  * @param {string} path		The url path to be linked on text
  * @public
  */
	insertLink = function insertLink(path) {
		undefined.refs.textFieldRich.insertLink("createlink", path);
	};

	/**
  * Calls a function in the TextFieldRich which insert the html string to the editor
  *
  * @param {string} html		The string that will be inserted
  * @public
  */
	insertHtml = function insertHtml(html) {
		undefined.refs.textFieldRich.insertHtml(html);
	};

	/**
  * Clears the value of the textFieldRich
  *
  * @public
  */
	clearValue = function clearValue() {
		undefined.refs.textFieldRich.clearValue();
	};

	/**
  * Gets the value of the textFieldRich
  *
  * @public
  */
	getValue = function getValue() {
		return undefined.refs.textFieldRich.getValue();
	};

	/**
  * Sets the value of the textFieldRich
  *
  * @param {string} newValue		The value to be saved in the editor
  * @public
  */
	setValue = function setValue(newValue) {
		undefined.refs.textFieldRich.setValu(neValue);
	};

	/**
     * Callback used to handle onblur
     *
     * @param {DOMEvent} e 		Reference to the DOM event being sent
     * @private
     */
	_handleBlur = function _handleBlur(e) {
		if (props.onBlur) props.onBlur(e);
	};

	/**
  * Callback used to handle onfocus
  *
  * @param {DOMEvent} e 		Reference to the DOM event being sent
  * @private
  */
	_handleFocus = function _handleFocus(e) {
		if (props.onFocus) props.onFocus(e);
	};

	/**
     * Callback used to handle onchange
     *
     * @param {DOMEvent} e 		Reference to the DOM event being sent
     * @private
     */
	_handleChange = function _handleChange(e) {
		if (props.onChange) props.onChange(e);
	};
};

ContentRte.propTypes = {
	onBlur: _propTypes2.default.func,
	onChange: _propTypes2.default.func,
	onFocus: _propTypes2.default.func,
	value: _propTypes2.default.string
};

ContentRte.defaultProps = {
	value: ""
};

exports.default = ContentRte;
module.exports = exports['default'];