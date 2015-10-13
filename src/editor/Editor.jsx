var React = require('react');
var Classable = require("../mixins/classable.jsx");
var Toolbar = require("../toolbar/Toolbar.jsx");
var ToolbarGroup = require("../toolbar/ToolbarGroup.jsx");
var TextFieldRich = require("../TextFieldRich.jsx");
var FontIcon = require("../FontIcon.jsx");
var IconButton = require("../IconButton.jsx");
var DropDownIcon = require("../DropDownIcon.jsx");
var Dialog = require("../Dialog.jsx");

var fontStyleOptions = [
    { payload: 'p', text: 'Body' },
    { payload: 'h1', text: 'Heading 1' },
    { payload: 'h2', text: 'Heading 2' },
    { payload: 'h3', text: 'Heading 3' },
    { payload: 'h4', text: 'Heading 4' }
];

var fontOptions = [
                        { payload: 'p', text: 'Arial' },
                        { payload: 'h1', text: 'Georgia' },
                        { payload: 'h2', text: 'Tahoma' },
                        { payload: 'h3', text: 'Courier New' },
                        { payload: 'h4', text: 'Times New Roman' },
                        { payload: 'h4', text: 'Verdana' }
                    ];

var Editor = React.createClass({

    mixins: [Classable],

    propTypes: {
        onCheck: React.PropTypes.func
    },

    render: function() {
    	
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup key={1} float="left">
                        <FontIcon onClick={this._handleClick.bind(this, "bold")} className="cfi cfi-bold" />
                        <FontIcon onClick={this._handleClick.bind(this, "italic")} className="cfi cfi-italic" />
                        <FontIcon onClick={this._handleClick.bind(this, "underline")} className="cfi cfi-underline" />
                    </ToolbarGroup>
                    <ToolbarGroup key={2} float="left">
                        <FontIcon onClick={this._handleClick.bind(this, "justifyleft")} className="cfi cfi-align-left" />
                        <FontIcon onClick={this._handleClick.bind(this, "justifycenter")} className="cfi cfi-align-center" />
                        <FontIcon onClick={this._handleClick.bind(this, "justifyright")} className="cfi cfi-align-right" />
                    </ToolbarGroup>
                    <ToolbarGroup key={3} float="left">
                    	<FontIcon onClick={this._handleClick.bind(this, "src")} className="cfi cfi-file-text-o" />
                    	<FontIcon onClick={this._handleClick.bind(this, "inserthorizontalrule")} className="cfi cfi-minus" />
                    	<FontIcon onClick={this._handleClick.bind(this, "link")} className="cfi cfi-link" />
                    	<FontIcon onClick={this._handleClick.bind(this, "table")} className="cfi cfi-table" />
                    </ToolbarGroup>
                    <ToolbarGroup key={4} float="right">
                        <DropDownIcon iconClassName="cfi cfi-font" menuItems={fontStyleOptions} />
                    </ToolbarGroup>
                </Toolbar>
                <div>
                    <TextFieldRich ref="rte" />
                </div>
                <Dialog title="test" />
            </div>
        )
    },

    /**
     * Callback used to handle commands when button is clicked on the toolbar
     *
     * @param {string} type		The name of the command to execute
     * @private
     */
    _handleClick: function(type) {
    	switch(type) {
    		case "src":
    			this.refs.rte._toggleSrc();
    			break;
    		case "link":
    			this.refs.rte._promptDialog();	
    			break;
    		case "table":
    			this.refs.rte._insertHtml('<table style="border: 1px solid; padding: 10px;"><tbody><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>');
    			break;
    		default:
    			this.refs.rte._sendCommand(type, '');
    			break;
    	}
    },
});

module.exports = Editor;
