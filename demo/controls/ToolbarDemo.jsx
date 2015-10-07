var React = require('react');
var DropDownIcon = require("../../src/DropDownIcon.jsx");
var DropDownMenu = require("../../src/DropDownMenu.jsx");
var IconButton = require("../../src/IconButton.jsx");
var RaisedButton = require("../../src/RaisedButton.jsx");
var Toolbar = require("../../src/toolbar/Toolbar.jsx");
var ToolbarGroup = require("../../src/toolbar/ToolbarGroup.jsx");
var CodeExample = require("../CodeExample.jsx");
//var ComponentDoc = require('../../component-doc.jsx');

var ToolbarPage = React.createClass({

    render: function() {

        var code =
            'var filterOptions = [\n' +
            '  { payload: \'1\', text: \'All Broadcasts\' },\n' +
            '  { payload: \'2\', text: \'All Voice\' },\n' +
            '  { payload: \'3\', text: \'All Text\' },\n' +
            '  { payload: \'4\', text: \'Complete Voice\' },\n' +
            '  { payload: \'5\', text: \'Complete Text\' },\n' +
            '  { payload: \'6\', text: \'Active Voice\' },\n' +
            '  { payload: \'7\', text: \'Active Text\' },\n' +
            '];\n' +
            'var iconMenuItems = [\n' +
            '  { payload: \'1\', text: \'Download\' },\n' +
            '  { payload: \'2\', text: \'More Info\' }\n' +
            '];\n\n' +
            '<Toolbar>\n' +
            '  <ToolbarGroup key={0} float="left">\n' +
            '    <DropDownMenu menuItems={filterOptions} />\n' +
            '  </ToolbarGroup>\n' +
            '  <ToolbarGroup key={1} float="right">\n' +
            '    <IconButton className="fa fa-align-center" />\n' +
            '    <DropDownIcon iconClassName="fa fa-caret-square-o-down" menuItems={iconMenuItems} />\n' +
            '    <span className="chamel-toolbar-separator">&nbsp;</span>\n' +
            '  </ToolbarGroup>\n' +
            '</Toolbar>';

        var componentInfo = [{
            name: 'ToolbarGroup',
            infoArray: [
                {
                    name: 'float',
                    type: 'string',
                    header: 'optional',
                    desc: 'Optional pull "left" or "right"'
                }
            ]
        }];

        var filterOptions = [
            { payload: '1', text: 'All Broadcasts' },
            { payload: '2', text: 'All Voice' },
            { payload: '3', text: 'All Text' },
            { payload: '4', text: 'Complete Voice' },
            { payload: '5', text: 'Complete Text' },
            { payload: '6', text: 'Active Voice' },
            { payload: '7', text: 'Active Text' },
        ];
        var iconMenuItems = [
            { payload: '1', text: 'Download' },
            { payload: '2', text: 'More Info' }
        ];

        return (

            <div>
                <Toolbar>
                    <ToolbarGroup key={0} float="left">
                        <DropDownMenu menuItems={filterOptions} />
                    </ToolbarGroup>
                    <ToolbarGroup key={1} float="right">
                        <IconButton className="fa fa-align-center" />
                        <DropDownIcon iconClassName="fa fa-caret-square-o-down" menuItems={iconMenuItems} />
                        <span className="chamel-toolbar-separator">&nbsp;</span>
                    </ToolbarGroup>
                </Toolbar>
                <CodeExample code={code}>
                </CodeExample>
            </div>

        );
    }

});

module.exports = ToolbarPage;
