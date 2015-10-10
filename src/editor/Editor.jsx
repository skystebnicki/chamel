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

var Checkbox = React.createClass({

    mixins: [Classable],

    propTypes: {
        onCheck: React.PropTypes.func,
    },

    render: function() {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup key={1} float="left">
                        <IconButton className="fa fa-bold" />
                        <FontIcon className="fa fa-italic" />
                        <FontIcon className="fa fa-underline" />
                    </ToolbarGroup>
                    <ToolbarGroup key={2} float="left">
                        <FontIcon className="fa fa-align-left" />
                        <FontIcon className="fa fa-align-center" />
                        <FontIcon className="fa fa-align-right" />
                    </ToolbarGroup>
                    <ToolbarGroup key={3} float="right">
                        <DropDownIcon iconClassName="fa fa-font" menuItems={fontStyleOptions} />
                    </ToolbarGroup>
                </Toolbar>
                <div>
                    <TextFieldRich />
                </div>
            </div>
        )
    },

});

module.exports = Checkbox;
