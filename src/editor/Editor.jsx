var React = require('react');
var Classable = require("../mixins/classable.jsx");
var Toolbar = require("../toolbar/Toolbar.jsx");
var ToolbarGroup = require("../toolbar/ToolbarGroup.jsx");
var TextFieldRich = require("../TextFieldRich.jsx");
var FontIcon = require("../FontIcon.jsx");
var IconButton = require("../IconButton.jsx");
var DropDownIcon = require("../DropDownIcon.jsx");
var Dialog = require("../Dialog.jsx");
var TextField = require("../TextField.jsx");
var ColorPicker = require('react-colorpickr');

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
        onCheck: React.PropTypes.func
    },
    
    render: function() {
    	var dialogActions = [
    	                     { text: 'Cancel' },
    	                     { text: 'Submit', onClick: this._onDialogSubmit, ref: 'submit' }
    	                 ]; 
    	
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup key={1} float="left">
                        <FontIcon onClick={this._onToolbarClick.bind(this, "bold")} className="cfi cfi-bold" />
                        <FontIcon onClick={this._onToolbarClick.bind(this, "italic")} className="cfi cfi-italic" />
                        <FontIcon onClick={this._onToolbarClick.bind(this, "underline")} className="cfi cfi-underline" />
                    </ToolbarGroup>
                    <ToolbarGroup key={2} float="left">
                        <FontIcon onClick={this._onToolbarClick.bind(this, "justifyleft")} className="cfi cfi-align-left" />
                        <FontIcon onClick={this._onToolbarClick.bind(this, "justifycenter")} className="cfi cfi-align-center" />
                        <FontIcon onClick={this._onToolbarClick.bind(this, "justifyright")} className="cfi cfi-align-right" />
                    </ToolbarGroup>
                    <ToolbarGroup key={3} float="left">
                    	<FontIcon onClick={this._onToolbarClick.bind(this, "src")} className="cfi cfi-files-o" />
                    	<FontIcon onClick={this._onToolbarClick.bind(this, "inserthorizontalrule")} className="cfi cfi-minus" />
                    	<FontIcon onClick={this._onToolbarClick.bind(this, "link")} className="cfi cfi-link" />
                    	<FontIcon onClick={this._onToolbarClick.bind(this, "table")} className="cfi cfi-table" />
                    </ToolbarGroup>
                    <ToolbarGroup key={4} float="left">
                    	<FontIcon onClick={this._onToolbarClick.bind(this, "insertorderedlist")} className="cfi cfi-list-ol" />
                    	<FontIcon onClick={this._onToolbarClick.bind(this, "insertunorderedlist")} className="cfi cfi-list-ul" />
                    	<FontIcon onClick={this._onToolbarClick.bind(this, "forecolor")} className="cfi cfi-eyedropper" />
                    	<FontIcon onClick={this._onToolbarClick.bind(this, "backcolor")} className="cfi cfi-magic" />
                    	<div ref="colorPickerContainer" className="chamel-color-picker">
                    		<div className="chamel-color-picker-close">
                    			<FontIcon onClick={this._displayColorPicker.bind(this, false, true)} className="cfi cfi-times" />
                    		</div>
                    		<div>
                    			<ColorPicker onChange={this._onColorPick} />
                    		</div>
                    	</div>
                	</ToolbarGroup>
                    <ToolbarGroup key={5} float="right">
                        <DropDownIcon 
                        	iconClassName="cfi cfi-header" 
                        	menuItems={fontStyleOptions}
                        	onChange={this._onMenuClick.bind(this, "formatblock")} />
                        <DropDownIcon 
	                    	iconClassName="cfi cfi-text-height" 
	                    	menuItems={fontSizeOptions}
	                    	onChange={this._onMenuClick.bind(this, "fontsize")} />
                        <DropDownIcon 
                        	iconClassName="cfi cfi-font" 
                        	menuItems={fontNameOptions}
                    		onChange={this._onMenuClick.bind(this, "fontname")} />
                </ToolbarGroup>
                </Toolbar>
                <div>
                    <TextFieldRich ref="rte" />
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
    _onToolbarClick: function(type) {
    	if (!this.isMounted()) { 
    		return;
    	}
    	
    	switch(type) {
    		case "src":
    			this.refs.rte._toggleSrc();
    			break;
    		case "link":
    			this.refs.linkDialog.show();
    			break;
    		case "table":
    			this.refs.rte._insertHtml('<table style="border: 1px solid; padding: 10px;"><tbody><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>');
    			break;
    		case "backcolor":
    		case "forecolor":
    			this._displayColorPicker(this._colorFontType == type, false);
    			this._colorFontType = type;
    			break;
    		default: 
    			this.refs.rte._sendCommand(type, '');
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
    _onMenuClick: function(type, e, key, payload) {
    	this.refs.rte._sendCommand(type, payload.payload);
    },
    
    /**
     * Callback used to handle commands when button is clicked on the toolbar
     *
     * @param {string} color	The color that was selected
     * @private
     */
    _onColorPick: function (color) {
    	this.refs.rte._sendCommand(this._colorFontType, "#" + color.hex);
    	this._colorFontType = null;
    },
    
    /**
     * Callback used to handle commands when button is clicked on the toolbar
     *
     * @private
     */
    _onDialogSubmit: function() {
    	var input = this.refs.linkInput.getValue();
    	
    	this.refs.rte._insertLink(input);
    	this.refs.linkInput.clearValue();
    	this.refs.linkDialog.dismiss();
    },
    
    /**
     * Displays the color picker
     *
     * @param {bool} sameEvent		Check if the event was triggerred in same button
     * @param {bool} forceHide 		Force to hide the color picker
     * @private
     */
    _displayColorPicker: function(sameEvent, forceHide) {
    	
    	var cpStyle = this.refs.colorPickerContainer.getDOMNode().style;
		var style = "block";
		
		if(forceHide || (cpStyle.display == "block" && sameEvent))
			style = "none";
		
		cpStyle.display = style;
    }
});

module.exports = Editor;
