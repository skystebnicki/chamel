var React = require('react');
var Classable = require("../mixins/classable");
var Toolbar = require("../toolbar/Toolbar");
var ToolbarGroup = require("../toolbar/ToolbarGroup");
var FontIcon = require("../FontIcon");
var IconButton = require("../IconButton");
var DropDownIcon = require("../DropDownIcon");
var Dialog = require("../Dialog");
var TextField = require("../TextField");
var ColorPicker = require("../ColorPicker");
var ContentRte = require("./ContentRte");
var ContentSrc = require("./ContentSrc");

var fontStyleOptions = [
	{ payload: '<p>', text: 'Body' },
	{ payload: '<h1>', text: 'Heading 1' },
	{ payload: '<h2>', text: 'Heading 2' },
	{ payload: '<h3>', text: 'Heading 3' },
	{ payload: '<h4>', text: 'Heading 4' }
];

var fontNameOptions = [
	{ payload: 'Arial', text: 'Arial' },
	{ payload: 'Georgia', text: 'Georgia' },
	{ payload: 'Tahoma', text: 'Tahoma' },
	{ payload: 'Courier New', text: 'Courier New' },
	{ payload: 'Times New Roman', text: 'Times New Roman' },
	{ payload: 'Verdana', text: 'Verdana' }
];

var fontSizeOptions = [
	{payload: 1, text: 'Smallest'},
	{payload: 2, text: 'X-Small'},
	{payload: 3, text: 'Small'},
	{payload: 4, text: 'Normal'},
	{payload: 5, text: 'Large'},
	{payload: 6, text: 'X-Large'},
	{payload: 7, text: 'Huge'}
];

var Editor = React.createClass({

	mixins: [Classable],

	propTypes: {
		onBlur: React.PropTypes.func,
		onFocus: React.PropTypes.func,
		onChange: React.PropTypes.func,
		value: React.PropTypes.string,
	},

	getDefaultProps: function() {
		return {
			value: "Enter description here.",
		};
	},

	getInitialState: function() {
		return {
			sourceViewMode: false,
			value: this.props.value,
		};
	},

	render: function() {
		var dialogActions = [
			{ text: 'Cancel' },
			{ text: 'Submit', onClick: this._handleDialogSubmit, ref: 'submit' }
		];

		var displayEditor = null;

		// Determine what should be displayed
		if(this.state.sourceViewMode) {
			displayEditor = <ContentSrc
				ref="contentSource"
				onFocus={this._handleFocus}
				onBlur={this._handleBlur}
				onChange={this._handleChange}
				value={this.state.value}
				options={{lineNumbers: true,  mode: "text/html"}} />
		}
		else {
			displayEditor = <ContentRte
				ref="rte"
				onFocus={this._handleFocus}
				onBlur={this._handleBlur}
				onChange={this._handleChange}
				value={this.state.value} />
		}

		return (
			<div>
				<Toolbar>
					<ToolbarGroup key={1} float="left">
						<FontIcon onClick={this._handleToolbarClick.bind(this, "bold")} className="cfi cfi-bold" />
						<FontIcon onClick={this._handleToolbarClick.bind(this, "italic")} className="cfi cfi-italic" />
						<FontIcon onClick={this._handleToolbarClick.bind(this, "underline")} className="cfi cfi-underline" />
					</ToolbarGroup>
					<ToolbarGroup key={2} float="left">
						<FontIcon onClick={this._handleToolbarClick.bind(this, "justifyleft")} className="cfi cfi-align-left" />
						<FontIcon onClick={this._handleToolbarClick.bind(this, "justifycenter")} className="cfi cfi-align-center" />
						<FontIcon onClick={this._handleToolbarClick.bind(this, "justifyright")} className="cfi cfi-align-right" />
					</ToolbarGroup>
					<ToolbarGroup key={3} float="left">
						<FontIcon onClick={this._handleToolbarClick.bind(this, "src")} className="cfi cfi-files-o" />
						<FontIcon onClick={this._handleToolbarClick.bind(this, "inserthorizontalrule")} className="cfi cfi-minus" />
						<FontIcon onClick={this._handleToolbarClick.bind(this, "link")} className="cfi cfi-link" />
						<FontIcon onClick={this._handleToolbarClick.bind(this, "table")} className="cfi cfi-table" />
					</ToolbarGroup>
					<ToolbarGroup key={4} float="left">
						<FontIcon onClick={this._handleToolbarClick.bind(this, "insertorderedlist")} className="cfi cfi-list-ol" />
						<FontIcon onClick={this._handleToolbarClick.bind(this, "insertunorderedlist")} className="cfi cfi-list-ul" />
						<FontIcon onClick={this._handleToolbarClick.bind(this, "forecolor")} className="cfi cfi-eyedropper" />
						<ColorPicker ref="forecolorPicker" label="Pick a font color" onColorPick={this._handleColorPick} />
						<FontIcon onClick={this._handleToolbarClick.bind(this, "backcolor")} className="cfi cfi-magic" />
						<ColorPicker ref="backcolorPicker" label="Pick a background color" onColorPick={this._handleColorPick} />
					</ToolbarGroup>
					<ToolbarGroup key={5} float="right">
						<DropDownIcon
							iconClassName="cfi cfi-header"
							menuItems={fontStyleOptions}
							onChange={this._handleMenuClick.bind(this, "formatblock")} />
						<DropDownIcon
							iconClassName="cfi cfi-text-height"
							menuItems={fontSizeOptions}
							onChange={this._handleMenuClick.bind(this, "fontsize")} />
						<DropDownIcon
							iconClassName="cfi cfi-font"
							menuItems={fontNameOptions}
							onChange={this._handleMenuClick.bind(this, "fontname")} />
					</ToolbarGroup>
				</Toolbar>
				<div>
					{displayEditor}
				</div>
				<Dialog ref="linkDialog" title="Enter the link path" actions={dialogActions} modal={true} >
					<TextField ref="linkInput" />
				</Dialog>
			</div>
		)
	},

	/**
	 * Callback used to handle commands when button is clicked on the toolbar
	 *
	 * @param {string} type		The name of the command to execute
	 * @private
	 */
	_handleToolbarClick: function(type) {
		if (!this.isMounted()) {
			return;
		}

		// If current display is source view, we dont need to continue unless toggle src is clicked
		if(this.state.sourceViewMode && type != "src") {
			return;
		}

		switch(type) {
			case "src":
				this._toggleEditorView();
				break;
			case "link":
				this.refs.linkDialog.show();
				break;
			case "table":
				this.refs.rte.insertHtml('<table style="border: 1px solid; padding: 10px;"><tbody><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>');
				break;
			case "backcolor":
				this.refs["forecolorPicker"].close();
			case "forecolor":
				// Hide the currently opened color pickers
				this.refs["backcolorPicker"].close();

				this.refs[type + "Picker"].show();
				this._colorFontType = type;
				break;
			default:
				this.refs.rte.sendCommand(type, '');
				break;
		}
	},

	/**
	 * Callback used to handle commands when button is clicked on the toolbar
	 *
	 * @param {string} type		The name of the command that triggered the menu click
	 * @param {DOMEvent} e 		Reference to the DOM event being sent
	 * @param {Integer} key		The index of the menu clicked
	 * @param {Object} payload	The object value of the menu clicked
	 * @private
	 */
	_handleMenuClick: function(type, e, key, payload) {

		// Only send commands if the display is RTE
		if(!this.state.sourceViewMode) {
			this.refs.rte.sendCommand(type, payload.payload);
		}
	},

	/**
	 * Accepts the link from the dialog box and sends a command to create the a href link
	 *
	 * @private
	 */
	_handleDialogSubmit: function() {

		// Do not process the action if the RTE is NOT displayed
		if(this.state.sourceViewMode) {
			return;
		}

		var input = this.refs.linkInput.getValue();

		this.refs.rte.insertLink(input);
		this.refs.linkInput.clearValue();
		this.refs.linkDialog.dismiss();
	},

	/**
	 * Toggles the view to either RTE or View Source (Code Mirror)
	 *
	 * @private
	 */
	_toggleEditorView: function () {
		if(!this.isMounted()) {
			return;
		}

		var currentValue = null;

		if(this.state.sourceViewMode) { // Current display is source view
			currentValue = this.refs.contentSource.getValue();
		}
		else { // Current display is RTE
			currentValue = this.refs.rte.getValue();
		}

		// Update the state values
		this.setState({
			sourceViewMode: !this.state.sourceViewMode,
			value: currentValue
		});
	},

	/**
	 * Handles the color picking event. This will trigger when the user chooses a color
	 *
	 * @param {string} color	The color that was selected
	 * @private
	 */
	_handleColorPick: function(color) {
		this.refs.rte.setColor(this._colorFontType, "#" + color.hex);
	},

	/**
	 * Callback used to handle onblur on the current editor displayed
	 *
	 * @param {DOMEvent} e 		Reference to the DOM event being sent
	 * @private
	 */
	_handleBlur: function(e) {
		if (this.props.onBlur) this.props.onBlur(e);
	},

	/**
	 * Callback used to handle onfocus on the current editor displayed
	 *
	 * @param {DOMEvent} e 		Reference to the DOM event being sent
	 * @private
	 */
	_handleFocus: function(e) {
		if (this.props.onFocus) this.props.onFocus(e);
	},

	/**
	 * Callback used to handle onchange on the current editor displayed
	 *
	 * @param {DOMEvent} e 		Reference to the DOM event being sent
	 * @private
	 */
	_handleChange: function(e) {
		if (this.props.onChange) this.props.onChange(e);
	}
});

module.exports = Editor;
