"use strict";

var React = require('react');
var TextFieldRich = require("../TextFieldRich");

var ContentRte = React.createClass({
	displayName: "ContentRte",


	propTypes: {
		onBlur: React.PropTypes.func,
		onChange: React.PropTypes.func,
		onFocus: React.PropTypes.func,
		value: React.PropTypes.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			value: ""
		};
	},

	render: function render() {
		return React.createElement(TextFieldRich, {
			ref: "textFieldRich",
			onFocus: this._handleFocus,
			onBlur: this._handleBlur,
			onChange: this._handleChange,
			value: this.props.value });
	},

	/**
  * Sends a command to the TextFieldRich component which executes an editor command
  *
  * @param {string} command 	The name of the RTE command to execute
  * @param {string} option 	The option when executing a certain command. e.g. changing the font/background colors
  * @public
  */
	sendCommand: function sendCommand(command, option) {
		this.refs.textFieldRich.sendCommand(command, option);
	},

	/**
     * Sends a command to the TextFieldRich to change the font/background color
     *
     * @param {string} type		Type of command to be executed. Either forecolor or backcolor
     * @param {string} color	The color that was selected
     * @public
     */
	setColor: function setColor(type, color) {
		this.refs.textFieldRich.setColor(type, color);
	},

	/**
  * Calls a function in the TextFieldRich which insert the a href link
  * 
  * @param {string} path		The url path to be linked on text
  * @public
  */
	insertLink: function insertLink(path) {
		this.refs.textFieldRich.insertLink("createlink", path);
	},

	/**
  * Calls a function in the TextFieldRich which insert the html string to the editor
  * 
  * @param {string} html		The string that will be inserted		
  * @public
  */
	insertHtml: function insertHtml(html) {
		this.refs.textFieldRich.insertHtml(html);
	},

	/**
  * Clears the value of the textFieldRich
  *
  * @public
  */
	clearValue: function clearValue() {
		this.refs.textFieldRich.clearValue();
	},

	/**
  * Gets the value of the textFieldRich
  * 
  * @public
  */
	getValue: function getValue() {
		return this.refs.textFieldRich.getValue();
	},

	/**
  * Sets the value of the textFieldRich
  *
  * @param {string} newValue		The value to be saved in the editor 
  * @public
  */
	setValue: function setValue(newValue) {
		this.refs.textFieldRich.setValu(neValue);
	},

	/**
     * Callback used to handle onblur
     *
     * @param {DOMEvent} e 		Reference to the DOM event being sent
     * @private
     */
	_handleBlur: function _handleBlur(e) {
		if (this.props.onBlur) this.props.onBlur(e);
	},

	/**
  * Callback used to handle onfocus
  *
  * @param {DOMEvent} e 		Reference to the DOM event being sent
  * @private
  */
	_handleFocus: function _handleFocus(e) {
		if (this.props.onFocus) this.props.onFocus(e);
	},

	/**
     * Callback used to handle onchange
     *
     * @param {DOMEvent} e 		Reference to the DOM event being sent
     * @private
     */
	_handleChange: function _handleChange(e) {
		if (this.props.onChange) this.props.onChange(e);
	}
});

module.exports = ContentRte;