var React = require('react');
var CodeMirror = require('codemirror');

var ContentSrc = React.createClass({
	propTypes: {
		onBlur: React.PropTypes.func,
		onFocus: React.PropTypes.func,
		onChange: React.PropTypes.func,
		options: React.PropTypes.object,
		value: React.PropTypes.string
	},

	getInitialState: function() {
		return {
			value: ""
		};
	},

	componentDidMount: function componentDidMount() {
		var textareaNode = this.refs.textarea.getDOMNode();
		
		this._codeMirror = CodeMirror.fromTextArea(textareaNode, this.props.options);
		this._codeMirror.on('change', this._handleChange);
		this._codeMirror.on('focus', this._handleFocus);
		this._codeMirror.on('blur', this._handleBlur);
	},

	componentWillUnmount: function componentWillUnmount() {
		if (this._codeMirror) {
			this._codeMirror.toTextArea();
		}
	},
	
	render: function render() {
		return React.createElement('textarea', { ref: 'textarea', defaultValue: this.props.value, autoComplete: 'off' })
	},
	
	/**
	 * Get the current value of the iframe document / code mirror editor
	 * 
	 * @public
	 */
	getValue: function() {
		return this._codeMirror.getDoc().getValue();
	},
	
	/**
	 * Set the value of the iframe document / code mirror editor
	 *
	 * @param {string} newValue		The value to be saved in the editor 
	 * @public
	 */
	setValue: function(newValue) {
		this._codeMirror.getDoc().setValue(newValue);
	},
	
	/**
     * Callback used to handle onblur on textarea
     *
     * @param {DOMEvent} e 		Reference to the DOM event being sent
     * @private
     */
	_handleBlur: function(e) {
	    this.setState({isFocused: false});
	    if (this.props.onBlur) this.props.onBlur(e);
	},
	
	/**
     * Callback used to handle onfocus on textarea
     *
     * @param {DOMEvent} e 		Reference to the DOM event being sent
     * @private
     */
	_handleFocus: function(e) {
		this.setState({isFocused: true});
		if (this.props.onFocus) this.props.onFocus(e);
	},
	
	/**
     * Callback used to handle onchange on the textarea
     *
     * @param {DOMEvent} e 		Reference to the DOM event being sent
     * @private
     */
	_handleChange: function(e) {
		if (this.props.onChange) this.props.onChange(e);
	},

});

module.exports = ContentSrc;