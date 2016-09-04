import React from 'react';
import ReactDOM from 'react-dom';
import UAParser from 'ua-parser-js';

var uaParser = new UAParser();

var TextFieldRich = React.createClass({

	propTypes: {
		id: React.PropTypes.string,
		onBlur: React.PropTypes.func,
		onChange: React.PropTypes.func,
		onFocus: React.PropTypes.func,
		onKeyUp: React.PropTypes.func,
		onEnterKeyDown: React.PropTypes.func,
		autoGrow: React.PropTypes.bool,
		height: React.PropTypes.number,
		value: React.PropTypes.string,
	},

	getDefaultProps: function () {
		return {
			autoGrow: true,
			value: "",
		};
	},

	componentDidMount: function () {
		var iframe = ReactDOM.findDOMNode(this.refs.rte);
		iframe.style.width = "100%";

		// If height has been passed then set the iframe height
		if (this.props.height) {
			iframe.style.height = height + 'px';
		}

		/*
		 * We need to delay the settings of the iframe document body because react only renders the iframe
		 * So after it is mounted, the iframe body is then created.
		 * If we are not going to use setTimeout, the body settings are still set but will not reflect in the iframe document body
		 */
		setTimeout(function () {
			this._enableDesign(true);
			this.setValue(this.props.value);
		}.bind(this), 1);
	},

	render: function () {
		return (<div className="chamel-text-field-rich">
			<iframe ref="rte" src="about:blank"/>
		</div>);
	},

	/**
	 * Get the iframe window document
	 *
	 * @private
	 */
	_getIframeWindow: function () {

		// We cannot get iframe document if DOM is not yet mounted
		if (!this.isMounted()) {
			return null;
		}

		var ifrm = ReactDOM.findDOMNode(this.refs.rte);
		return ifrm.contentWindow || ifrm.contentDocument;
	},

	/**
	 * Public interface to send commands to the RTE
	 *
	 * @param {string} command The name of the RTE command to execute
	 * @param {string} option    The option when executing a certain command. e.g. changing the font/background colors
	 * @public
	 */
	sendCommand: function (command, option) {
		try {
			var ifrmWindow = this._getIframeWindow();
			var idoc = ifrmWindow.document || null;

			if (idoc) {
				ifrmWindow.focus();
				idoc.execCommand(command, false, option);
				ifrmWindow.focus();
				this._handleInputChange();
			}
		}
		catch (e) {
			throw new Error('Error while executing the ' + command + ' command');
		}
	},

	/**
	 * Sets the color of the current selection in the iframe document
	 *
	 * @param {string} type        Type of command to be executed. Either forecolor or backcolor
	 * @param {string} color    The color that was selected
	 * @public
	 */
	setColor: function (type, color) {
		this._setRange();
		this.sendCommand(type, color);
	},

	/**
	 * Inserts the html string
	 *
	 * @param {string} html        The string that will be inserted
	 * @public
	 */
	insertHtml: function (html) {
		this._setRange();

		if (uaParser.getBrowser().name == "IE") {
			this.sendCommand('paste', html);
		}
		else {
			this.sendCommand('insertHtml', html);
		}
	},

	/**
	 * Prompts the dialog box for user input
	 *
	 * @param {string} path        The url path to be linked on text
	 * @public
	 */
	insertLink: function (path) {
		this._setRange();
		this.sendCommand("unlink", null);
		this.sendCommand("createlink", path);
	},

	/**
	 * Clear the value of the iframe document
	 *
	 * @public
	 */
	clearValue: function () {
		this.setValue('');
	},


	/**
	 * Get the current value of the iframe document / code mirror editor
	 *
	 * @public
	 */
	getValue: function () {
		var ifrmWindow = this._getIframeWindow();
		var idoc = ifrmWindow.document || null;
		var value = idoc.body.innerHTML || "";

		return value;
	},

	/**
	 * Set the value of the iframe document / code mirror editor
	 *
	 * @param {string} newValue        The value to be saved in the editor
	 * @public
	 */
	setValue: function (newValue) {
		var ifrmWindow = this._getIframeWindow();
		var idoc = ifrmWindow.document || null;

		if (idoc) {
			idoc.body.innerHTML = newValue;
			this._autoGrow();
		}
	},

	/**
	 * Set the range of the iframe document
	 *
	 * @private
	 */
	_setRange: function () {
		var ifrmWindow = this._getIframeWindow();
		var idoc = ifrmWindow.document || null;

		if (idoc && uaParser.getBrowser().name == "IE") {
			var selection = idoc.selection;
			if (selection != null) this._rangeSelection = selection.createRange();
		} else if (ifrmWindow) {
			var selection = ifrmWindow.getSelection();
			this._rangeSelection = selection.getRangeAt(selection.rangeCount - 1).cloneRange();
		}

		if (ifrmWindow && idoc && uaParser.getBrowser().name == "IE") {
			ifrmWindow.focus()

			// retrieve selected range
			var sel = idoc.selection;
			if (sel != null) {
				var newRng = sel.createRange();
				newRng = this._rangeSelection;
				newRng.select();
			}
		}
	},

	/**
	 * Handles the input blur event of the text area
	 *
	 * @param {DOMEvent} e        Reference to the DOM event being sent
	 * @private
	 */
	_handleInputBlur: function (e) {
		var result = {target: {value: this.getValue()}};

		if (this.props.onBlur) this.props.onBlur(result);
	},

	/**
	 * Handles the input change event of the text area
	 *
	 * @param {DOMEvent} e        Reference to the DOM event being sent
	 * @private
	 */
	_handleInputChange: function (e) {
		var result = {target: {value: this.getValue()}};
		if (this.props.onChange) this.props.onChange(result);
	},

	/**
	 * Handles the input focus of the text area
	 *
	 * @param {DOMEvent} e        Reference to the DOM event being sent
	 * @private
	 */
	_handleInputFocus: function (e) {
		var result = {target: {value: this.getValue()}};

		if (this.props.onFocus) {
			this.props.onFocus(result);
		}
	},

	/**
	 * Handles the input key down of the text area
	 *
	 * @param {DOMEvent} e        Reference to the DOM event being sent
	 * @private
	 */
	_handleInputKeyUp: function (e) {
		var result = {target: {value: this.getValue()}};

		if (this.props.autoGrow) {
			this._autoGrow();
		}

		if (e.keyCode == 13 && this.props.onEnterKeyDown) {
			this.props.onEnterKeyDown(result);
		}

		// Handle onkeydown event
		if (this.props.onKeyUp) {
			this.props.onKeyUp(result);
		}

		// Handle onChange event
		if (this.props.onChange) {
			this.props.onChange(result);
		}
	},

	/**
	 * Handles the change of height event of the text area
	 *
	 * @param {DOMEvent} e        Reference to the DOM event being sent
	 * @param {int} height    T    The height to be set
	 * @private
	 */
	_handleTextAreaHeightChange: function (e, height) {
		var newHeight = height + 24;
		if (this.props.floatingLabelText) {
			newHeight += 24;
		}
		ReactDOM.findDOMNode(this).style.height = newHeight + 'px';
	},

	/**
	 * Check if the component is controlled
	 *
	 * @private
	 */
	_isControlled: function () {
		return this.props.hasOwnProperty('value') || this.props.hasOwnProperty('valueLink');
	},

	/**
	 * Enables the editor if it is already mounted
	 *
	 * @private
	 */
	_enableDesign: function (on) {

		// Only enable after mounted into the dom
		if (!this.isMounted()) {
			return false;
		}

		// Get the iframe document
		var ifrmWindow = this._getIframeWindow();
		var idoc = ifrmWindow.document || null;

		// Make sure document is defined
		if (!idoc) {
			throw "Could not get the document of the iframe";
		}

		var designModeOn = on || true;

		var editorBody = idoc.body;

		// Turn on spellcheck if available
		if ('spellcheck' in editorBody && designModeOn) {
			editorBody.spellcheck = true;
		}

		// Make content editable
		if ('contentEditable' in editorBody && designModeOn) {
			editorBody.contentEditable = true;

		}
		else {
			// Firefox earlier than version 3 uses document rather than body
			if ('designMode' in idoc && designModeOn) {
				idoc.designMode = "on";
			}
		}

		// Set document events
		var evtObj = (uaParser.getBrowser().name == "IE") ? ReactDOM.findDOMNode(this.refs.rte) : this._getIframeWindow();

		if (evtObj.addEventListener) { // W3C DOM

			// on blur
			evtObj.addEventListener("blur", function (evt) {
				this._handleInputBlur(evt);
			}.bind(this), false);

			// on keyup
			evtObj.addEventListener("keyup", function (evt) {
				this._handleInputKeyUp(evt);
			}.bind(this), false);

			// on focus
			evtObj.addEventListener("focus", function (evt) {
				this._handleInputFocus(evt);
			}.bind(this), false);

			/*
			 * For some reason onchange is not working. We will be using onkeydown function instead.
			 *
			 evtObj.addEventListener("change",function(evt) {
			 this._handleInputChange(evt);
			 }.bind(this),false);
			 */
		}
		else if (evtObj.attachEvent) { // IE DOM

			// on blur
			evtObj.attachEvent("onblur", function (evt) {
				this._handleInputBlur(evt);
			}.bind(this));

			// on keydown
			evtObj.attachEvent("onkeyup", function (evt) {
				this._handleInputKeyUp(evt);
			}.bind(this));

			// on focus
			evtObj.attachEvent("onfocus", function (evt) {
				this._handleInputFocus(evt);
			}.bind(this));

			/*
			 * For some reason onchange is not working. We will be using onkeydown function instead.
			 *
			 evtObj.attachEvent("onchange",function(evt) {
			 this._handleInputChange(evt);
			 }.bind(this),false);
			 */
		}

		return true;
	},

	/**
	 * Autogrow the editor to match the contents
	 *
	 * @private
	 */
	_autoGrow: function () {

		// We cannot autogrow if we are not mounted in the DOM
		if (!this.isMounted()) {
			return false;
		}

		var ifrmWindow = this._getIframeWindow();
		var idoc = ifrmWindow.document || null;

		if (idoc) {
			var contentHeight = idoc.body.scrollHeight;

			var iframe = ReactDOM.findDOMNode(this.refs.rte);
			iframe.style.height = contentHeight + "px";
		}
	},
});

// Check for commonjs
if (module) {
  module.exports = TextFieldRich;
}

export default TextFieldRich;
