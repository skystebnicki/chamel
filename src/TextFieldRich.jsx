var React = require('react');
var UAParser = require('ua-parser-js');
var CodeMirror = require("./editor/ContentSrc.jsx");

var uaParser = new UAParser();

var RichText = React.createClass({

	propTypes: {
		id: React.PropTypes.string,
		onBlur: React.PropTypes.func,
		onChange: React.PropTypes.func,
		onFocus: React.PropTypes.func,
		onKeyDown: React.PropTypes.func,
		onEnterKeyDown: React.PropTypes.func,
		autoGrow: React.PropTypes.bool,
		height: React.PropTypes.number,
		value: React.PropTypes.string,
	},

	getDefaultProps: function() {
		return {
			autoGrow: true,
			value: "Enter description here.",
		};
	},
	
	getInitialState: function() {
    	return {
    		displayCodeMirror: false,
    	};
    },

	componentDidMount: function() {
		var iframe = this.refs.rte.getDOMNode();
		iframe.style.width = "100%"; // temporary
		
		// If height has been passed then set the iframe height
		if (this.props.height) {
			iframe.style.height = height;
		}
				
		// Make the contents of the iframe editable
		var cls = this;
		setTimeout(function() { 
					cls._enableDesign(true);
					cls._setValue(cls.props.value);
				}, 1);
		
		//this._setupIframeDocument(true); // this has issue when executing the function instantly
	},
	
	componentDidUpdate: function() {
		
		// Re enable the content editable of the iframe document
		var cls = this;
		setTimeout(function() {
					cls._enableDesign(true);
					cls._setValue(cls._currentValue);
				}, 1);
		
	},

	render: function() {
		
		var display = null;
		
		// Determine what should be displayed
		if(this.state.displayCodeMirror) {
			display = <CodeMirror ref="codemirror" options={{lineNumbers: true,  mode: "text/html"}} />;
		}
		else {
			display = <iframe ref="rte" src="about:blank" />;
		}
		
		return ( 
				<div className="chamel-text-field-rich" >{display}</div>
		);
	},
	
	/**
	 * Public interface to send commands to the RTE
	 *
	 * @param {string} command The name of the RTE command to execute
	 * @public
	 */
	_sendCommand: function (command, option) {
		try {
			var idoc = this._getIframeDoc();
			var iwnd = this._getIframeWindow();
		
			iwnd.focus();
		  	idoc.execCommand(command, false, option);
			iwnd.focus();
		} 
		catch (e) {
			alert(e);
		}
	},

	/**
	 * Blur event of the text area
	 * 
	 * @private
	 */
	_blur: function() {
		if (this.isMounted()) {
			//this._getInputNode().blur();
		}
	},

	/**
	 * Clear the value of the iframe document
	 *
	 */
	_clearValue: function() {
		this._setValue('');
	},

	/**
	 * Set the focus to the iframe document
	 *  
	 * @private
	 */
	_focus: function() {
		if (this.isMounted()) {
		}
	},

	/**
	 * Get the current value of the iframe document / code mirror editor
	 * 
	 * @private
	 */
	_getValue: function() {
		if (!this.isMounted()) {
			return undefined;
		}
		
		if(this.state.displayCodeMirror) {
			return this.refs.codemirror._getValue();
		}
		else {
			var idoc = this._getIframeDoc();
			return idoc.body.innerHTML;
		}
	},

	/**
	 * Set the value of the iframe document / code mirror editor
	 *
	 * @param {string} newValue		The value to be saved in the editor 
	 * @private
	 */
	_setValue: function(newValue) {
		
		if(this.state.displayCodeMirror) {
			return this.refs.codemirror._setValue(newValue);
		}
		else {
			var idoc = this._getIframeDoc();
			idoc.body.innerHTML = newValue;
			
			if (this.isMounted()) {
				this._autoGrow();
			}
		}
	},

	/**
	 * Handles the input blur event of the text area
	 *
	 * @param {DOMEvent} e		Reference to the DOM event being sent 
	 * @private
	 */
	_handleInputBlur: function(e) {

		if (typeof e.target === "undefied") {
			e.target = {};
		}
			
		e.target.value = this._getValue();

		this._handleInputChange(e);

		if (this.props.onBlur) this.props.onBlur(e);

	},

	/**
	 * Handles the input change event of the text area
	 *
	 * @param {DOMEvent} e		Reference to the DOM event being sent 
	 * @private
	 */
	_handleInputChange: function(e) {
		if (this.props.onChange) this.props.onChange(e);
	},

	/**
	 * Handles the input focus of the text area
	 *
	 * @param {DOMEvent} e		Reference to the DOM event being sent 
	 * @private
	 */
	_handleInputFocus: function(e) {
		if (this.props.onFocus) {
			this.props.onFocus(e);
		}
	},

	/**
	 * Handles the input key down of the text area
	 *
	 * @param {DOMEvent} e		Reference to the DOM event being sent 
	 * @private
	 */
	_handleInputKeyDown: function(e) {
		if (this.props.autoGrow) {
			this._autoGrow();
		}

		if (e.keyCode === 13 && this.props.onEnterKeyDown) {
			this.props.onEnterKeyDown(e);
		}
    
		if (this.props.onKeyDown) {
			this.props.onKeyDown(e);
		}
	},

	/**
	 * Handles the change of height event of the text area
	 *
	 * @param {DOMEvent} e		Reference to the DOM event being sent 
	 * @param {int} height	T	The height to be set
	 * @private
	 */
	_handleTextAreaHeightChange: function(e, height) {
		var newHeight = height + 24;
		if (this.props.floatingLabelText) {
			newHeight += 24;
		}
		this.getDOMNode().style.height = newHeight + 'px';
	},

	/**
	 * Check if the component is controlled
	 * 
	 * @private
	 */
	_isControlled: function() {
		return this.props.hasOwnProperty('value') || this.props.hasOwnProperty('valueLink');
	},

	/**
	 * Get the iframe window/document
	 * 
	 * @private
	 */
	_getIframeWindow: function() {
		var ifrm = this.refs.rte.getDOMNode();
		return ifrm.contentWindow || ifrm.contentDocument;
	},

	/**
	 * Get the diframe window document
	 * 
	 * @private
	 */
	_getIframeDoc: function() {
		var iwnd = this._getIframeWindow();

		if (iwnd && iwnd.document) {
			return iwnd.document;
		}
		else {
			return false;
		}
	},

	/**
	 * Enables the editor if it is already mounted
	 * 
	 * @private
	 */
	_enableDesign: function(on) {
		
		// Only enable after mounted into the dom
		if (!this.isMounted() || this.state.displayCodeMirror) {
			return false;
		}

		// Get the iframe document
		var idoc = this._getIframeDoc();

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
		
		// Set blur event
		// TODO: For some reason it is always firing twice... we should investigate
		var evtObj = (uaParser.getBrowser().name == "IE") ? this.refs.rte.getDOMNode() : this._getIframeWindow();

		// W3C DOM
		if (evtObj.addEventListener) {
			evtObj.addEventListener("blur",function(evt) {
				this._handleInputBlur(evt);
			}.bind(this),false);
		}
		else if (evtObj.attachEvent) {
			// IE DOM
			evtObj.attachEvent("onblur", function(evt) {
				this._handleInputBlur(evt);
			}.bind(this));
		}
		
		var evtObj = (uaParser.getBrowser().name == "IE") ? this.refs.rte.getDOMNode() : this._getIframeWindow();

		// Set keydown event
		if (evtObj.addEventListener) {
			evtObj.addEventListener("keydown",function(evt) {
				this._handleInputKeyDown(evt);
			}.bind(this),false);
		}
		else if (evtObj.attachEvent) {
			// IE DOM
			evtObj.attachEvent("onkeydown", function(evt) {
				this._handleInputKeyDown(evt);
			}.bind(this));
		}
		
		var evtObj = (uaParser.getBrowser().name == "IE") ? this.refs.rte.getDOMNode() : this._getIframeWindow();
		
		// Set onfocus event
		if (evtObj.addEventListener) {
			evtObj.addEventListener("focus",function(evt) {
				this._handleInputFocus(evt);
			}.bind(this),false);
		}
		else if (evtObj.attachEvent) {
			// IE DOM
			evtObj.attachEvent("onfocus", function(evt) {
				this._handleInputFocus(evt);
			}.bind(this));
		}
      
		return true;
	},
	
	/**
	 * Toggle the source view
	 * 
	 * @private
	 */
	_toggleSrc: function() {
		this._currentValue = this._getValue();
		this.setState(
				{ 
					displayCodeMirror: !this.state.displayCodeMirror,
				});
	},
	
	/**
	 * Prompts the dialog box for user input
	 * 
	 * @param {string} path		The url path to be linked on text
	 * @private
	 */
	_insertLink: function(path) {
		
		if (uaParser.getBrowser().name == "IE") {
			this._getIframeWindow().focus()
			
			//retrieve selected range
			var sel = this._getIframeDoc().selection; 
			if (sel != null) 
			{
				var newRng = sel.createRange();
				newRng = this.rng;
				newRng.select();
			}
		}
		
		this._sendCommand("unlink", null);
		this._sendCommand("createlink", path);
	},
	
	/**
	 * Inserts the html string
	 * 
	 * @param {string} html		The string that will be inserted		
	 * @private
	 */
	_insertHtml: function(html) {
		if (uaParser.getBrowser().name == "IE") {
			
			//retrieve selected range
			var sel = this._getIframeDoc().selection; 
			if (sel != null) {
				var newRng = sel.createRange();
				newRng = this.rng;
				newRng.select();
			}
			
			this._sendCommand('paste', html);
		}
		else {
			this._sendCommand('insertHtml', html);
		}
	},

	/**
	 * Autogrow the editor to match the contents
	 * 
	 * @private
	 */
	_autoGrow: function() {

		// We cannot autogrow if we are not mounted in the DOM
		if (!this.isMounted()) {
			return false;
		}

		var idoc = this._getIframeDoc();
		var contentHeight = idoc.body.scrollHeight;

		var iframe = this.refs.rte.getDOMNode();
		iframe.style.height = contentHeight + "px";
	},
});

module.exports = RichText;