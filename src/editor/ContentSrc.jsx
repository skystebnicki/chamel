var React = require('react');
var CM = require('codemirror');

var CodeMirror = React.createClass({
	propTypes: {
		options: React.PropTypes.object,
		value: React.PropTypes.string
	},

	getInitialState: function getInitialState() {
		return {
			value: ""
		};
	},

	componentDidMount: function componentDidMount() {
		var textareaNode = this.refs.textarea.getDOMNode();
		this.codeMirror = CM.fromTextArea(textareaNode, this.props.options);
	},

	componentWillUnmount: function componentWillUnmount() {
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
	},
	
	render: function render() {
		var className = 'ReactCodeMirror';
		if (this.state.isFocused) {
			className += ' ReactCodeMirror--focused';
		}
		
		return React.createElement('textarea', 
				{ ref: 'textarea', defaultValue: this.props.value, autoComplete: 'off' }
				);
	},
	
	/**
	 * Get the current value of the iframe document / code mirror editor
	 * 
	 * @private
	 */
	_getValue: function() {
		return this.codeMirror.getDoc().getValue();
	},
	
	/**
	 * Set the value of the iframe document / code mirror editor
	 *
	 * @param {string} newValue		The value to be saved in the editor 
	 * @private
	 */
	_setValue: function(newValue) {
		this.codeMirror.getDoc().setValue(newValue);
	},

});

module.exports = CodeMirror;