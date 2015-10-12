var React = require('react');
var Classable = require("../mixins/classable.jsx");
var Toolbar = require("../toolbar/Toolbar.jsx");
var ToolbarGroup = require("../toolbar/ToolbarGroup.jsx");
var TextFieldRich = require("../TextFieldRich.jsx");
var FontIcon = require("../FontIcon.jsx");
var IconButton = require("../IconButton.jsx");
var DropDownIcon = require("../DropDownIcon.jsx");


var fontStyleOptions = [
    { payload: 'p', text: 'Body' },
    { payload: 'h1', text: 'Heading 1' },
    { payload: 'h2', text: 'Heading 2' },
    { payload: 'h3', text: 'Heading 3' },
    { payload: 'h4', text: 'Heading 4' }
];

var Editor = React.createClass({

    mixins: [Classable],

    propTypes: {
        onCheck: React.PropTypes.func
    },
    
    _handleClick: function(type) {
        this.props.btnClick(type);
    },

    render: function() {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup key={1} float="left">
                        <FontIcon onClick={this._handleClick("bold")} className="cfi cfi-bold" />
                        <FontIcon className="cfi cfi-italic" />
                        <FontIcon className="cfi cfi-underline" />
                    </ToolbarGroup>
                    <ToolbarGroup key={2} float="left">
                        <FontIcon className="cfi cfi-align-left" />
                        <FontIcon className="cfi cfi-align-center" />
                        <FontIcon className="cfi cfi-align-right" />
                    </ToolbarGroup>
                    <ToolbarGroup key={3} float="right">
                        <DropDownIcon iconClassName="cfi cfi-font" menuItems={fontStyleOptions} />
                    </ToolbarGroup>
                </Toolbar>
                <div>
                    <TextFieldRich btnClick={this._handleClick} />
                </div>
            </div>
        )
    },

});

module.exports = Editor;
