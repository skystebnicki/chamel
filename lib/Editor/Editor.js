"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classable = require("../mixins/classable");

var _classable2 = _interopRequireDefault(_classable);

var _Toolbar = require("../Toolbar/Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _ToolbarGroup = require("../Toolbar/ToolbarGroup");

var _ToolbarGroup2 = _interopRequireDefault(_ToolbarGroup);

var _FontIcon = require("../FontIcon/FontIcon");

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _IconButton = require("../Button/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _DropDownIcon = require("../DropDownIcon");

var _DropDownIcon2 = _interopRequireDefault(_DropDownIcon);

var _Dialog = require("../Dialog/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _TextField = require("../Input/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _ColorPicker = require("../ColorPicker/ColorPicker");

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

var _ContentRte = require("./ContentRte");

var _ContentRte2 = _interopRequireDefault(_ContentRte);

var _ContentSrc = require("./ContentSrc");

var _ContentSrc2 = _interopRequireDefault(_ContentSrc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fontStyleOptions = [{ payload: '<p>', text: 'Body' }, { payload: '<h1>', text: 'Heading 1' }, { payload: '<h2>', text: 'Heading 2' }, { payload: '<h3>', text: 'Heading 3' }, { payload: '<h4>', text: 'Heading 4' }];

var fontNameOptions = [{ payload: 'Arial', text: 'Arial' }, { payload: 'Georgia', text: 'Georgia' }, { payload: 'Tahoma', text: 'Tahoma' }, { payload: 'Courier New', text: 'Courier New' }, { payload: 'Times New Roman', text: 'Times New Roman' }, { payload: 'Verdana', text: 'Verdana' }];

var fontSizeOptions = [{ payload: 1, text: 'Smallest' }, { payload: 2, text: 'X-Small' }, { payload: 3, text: 'Small' }, { payload: 4, text: 'Normal' }, { payload: 5, text: 'Large' }, { payload: 6, text: 'X-Large' }, { payload: 7, text: 'Huge' }];

var Editor = _react2.default.createClass({
	displayName: "Editor",


	mixins: [_classable2.default],

	propTypes: {
		onBlur: _react2.default.PropTypes.func,
		onFocus: _react2.default.PropTypes.func,
		onChange: _react2.default.PropTypes.func,
		value: _react2.default.PropTypes.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			value: "Enter description here."
		};
	},

	getInitialState: function getInitialState() {
		return {
			sourceViewMode: false,
			value: this.props.value
		};
	},

	render: function render() {
		var dialogActions = [{ text: 'Cancel' }, { text: 'Submit', onClick: this._handleDialogSubmit, ref: 'submit' }];

		var displayEditor = null;

		// Determine what should be displayed
		if (this.state.sourceViewMode) {
			displayEditor = _react2.default.createElement(_ContentSrc2.default, {
				ref: "contentSource",
				onFocus: this._handleFocus,
				onBlur: this._handleBlur,
				onChange: this._handleChange,
				value: this.state.value,
				options: { lineNumbers: true, mode: "text/html" } });
		} else {
			displayEditor = _react2.default.createElement(_ContentRte2.default, {
				ref: "rte",
				onFocus: this._handleFocus,
				onBlur: this._handleBlur,
				onChange: this._handleChange,
				value: this.state.value });
		}

		return _react2.default.createElement(
			"div",
			null,
			_react2.default.createElement(
				_Toolbar2.default,
				null,
				_react2.default.createElement(
					_ToolbarGroup2.default,
					{ key: 1, float: "left" },
					_react2.default.createElement(_FontIcon2.default, { onClick: this._handleToolbarClick.bind(this, "bold"), className: "cfi cfi-bold" }),
					_react2.default.createElement(_FontIcon2.default, { onClick: this._handleToolbarClick.bind(this, "italic"), className: "cfi cfi-italic" }),
					_react2.default.createElement(_FontIcon2.default, { onClick: this._handleToolbarClick.bind(this, "underline"), className: "cfi cfi-underline" })
				),
				_react2.default.createElement(
					_ToolbarGroup2.default,
					{ key: 2, float: "left" },
					_react2.default.createElement(_FontIcon2.default, { onClick: this._handleToolbarClick.bind(this, "justifyleft"), className: "cfi cfi-align-left" }),
					_react2.default.createElement(_FontIcon2.default, { onClick: this._handleToolbarClick.bind(this, "justifycenter"), className: "cfi cfi-align-center" }),
					_react2.default.createElement(_FontIcon2.default, { onClick: this._handleToolbarClick.bind(this, "justifyright"), className: "cfi cfi-align-right" })
				),
				_react2.default.createElement(
					_ToolbarGroup2.default,
					{ key: 3, float: "left" },
					_react2.default.createElement(_FontIcon2.default, { onClick: this._handleToolbarClick.bind(this, "src"), className: "cfi cfi-files-o" }),
					_react2.default.createElement(_FontIcon2.default, { onClick: this._handleToolbarClick.bind(this, "inserthorizontalrule"), className: "cfi cfi-minus" }),
					_react2.default.createElement(_FontIcon2.default, { onClick: this._handleToolbarClick.bind(this, "link"), className: "cfi cfi-link" }),
					_react2.default.createElement(_FontIcon2.default, { onClick: this._handleToolbarClick.bind(this, "table"), className: "cfi cfi-table" })
				),
				_react2.default.createElement(
					_ToolbarGroup2.default,
					{ key: 4, float: "left" },
					_react2.default.createElement(_FontIcon2.default, { onClick: this._handleToolbarClick.bind(this, "insertorderedlist"), className: "cfi cfi-list-ol" }),
					_react2.default.createElement(_FontIcon2.default, { onClick: this._handleToolbarClick.bind(this, "insertunorderedlist"), className: "cfi cfi-list-ul" }),
					_react2.default.createElement(_FontIcon2.default, { onClick: this._handleToolbarClick.bind(this, "forecolor"), className: "cfi cfi-eyedropper" }),
					_react2.default.createElement(_ColorPicker2.default, { ref: "forecolorPicker", label: "Pick a font color", onColorPick: this._handleColorPick }),
					_react2.default.createElement(_FontIcon2.default, { onClick: this._handleToolbarClick.bind(this, "backcolor"), className: "cfi cfi-magic" }),
					_react2.default.createElement(_ColorPicker2.default, { ref: "backcolorPicker", label: "Pick a background color", onColorPick: this._handleColorPick })
				),
				_react2.default.createElement(
					_ToolbarGroup2.default,
					{ key: 5, float: "right" },
					_react2.default.createElement(_DropDownIcon2.default, {
						iconClassName: "cfi cfi-header",
						menuItems: fontStyleOptions,
						onChange: this._handleMenuClick.bind(this, "formatblock") }),
					_react2.default.createElement(_DropDownIcon2.default, {
						iconClassName: "cfi cfi-text-height",
						menuItems: fontSizeOptions,
						onChange: this._handleMenuClick.bind(this, "fontsize") }),
					_react2.default.createElement(_DropDownIcon2.default, {
						iconClassName: "cfi cfi-font",
						menuItems: fontNameOptions,
						onChange: this._handleMenuClick.bind(this, "fontname") })
				)
			),
			_react2.default.createElement(
				"div",
				null,
				displayEditor
			),
			_react2.default.createElement(
				_Dialog2.default,
				{ ref: "linkDialog", title: "Enter the link path", actions: dialogActions, modal: true },
				_react2.default.createElement(_TextField2.default, { ref: "linkInput" })
			)
		);
	},

	/**
  * Callback used to handle commands when button is clicked on the toolbar
  *
  * @param {string} type		The name of the command to execute
  * @private
  */
	_handleToolbarClick: function _handleToolbarClick(type) {
		if (!this.isMounted()) {
			return;
		}

		// If current display is source view, we dont need to continue unless toggle src is clicked
		if (this.state.sourceViewMode && type != "src") {
			return;
		}

		switch (type) {
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
	_handleMenuClick: function _handleMenuClick(type, e, key, payload) {

		// Only send commands if the display is RTE
		if (!this.state.sourceViewMode) {
			this.refs.rte.sendCommand(type, payload.payload);
		}
	},

	/**
  * Accepts the link from the dialog box and sends a command to create the a href link
  *
  * @private
  */
	_handleDialogSubmit: function _handleDialogSubmit() {

		// Do not process the action if the RTE is NOT displayed
		if (this.state.sourceViewMode) {
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
	_toggleEditorView: function _toggleEditorView() {
		if (!this.isMounted()) {
			return;
		}

		var currentValue = null;

		if (this.state.sourceViewMode) {
			// Current display is source view
			currentValue = this.refs.contentSource.getValue();
		} else {
			// Current display is RTE
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
	_handleColorPick: function _handleColorPick(color) {
		this.refs.rte.setColor(this._colorFontType, "#" + color.hex);
	},

	/**
  * Callback used to handle onblur on the current editor displayed
  *
  * @param {DOMEvent} e 		Reference to the DOM event being sent
  * @private
  */
	_handleBlur: function _handleBlur(e) {
		if (this.props.onBlur) this.props.onBlur(e);
	},

	/**
  * Callback used to handle onfocus on the current editor displayed
  *
  * @param {DOMEvent} e 		Reference to the DOM event being sent
  * @private
  */
	_handleFocus: function _handleFocus(e) {
		if (this.props.onFocus) this.props.onFocus(e);
	},

	/**
  * Callback used to handle onchange on the current editor displayed
  *
  * @param {DOMEvent} e 		Reference to the DOM event being sent
  * @private
  */
	_handleChange: function _handleChange(e) {
		if (this.props.onChange) this.props.onChange(e);
	}
});

// Check for commonjs
if (module) {
	module.exports = Editor;
}

exports.default = Editor;
module.exports = exports['default'];