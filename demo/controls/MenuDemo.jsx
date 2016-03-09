var React = require("react");
var DropDownMenu = require("../../src/DropDownMenu.jsx");
var Menu = require("../../src/menu/Menu.jsx");
var MenuItem = require("../../src/menu/MenuItem.jsx");
var NestedMenuItem = require("../../src/menu/NestedMenuItem.jsx");
var CodeExample = require("../CodeExample.jsx");

var labelMenuItems = [
    { payload: '1', text: 'ID', data: '1234567890', icon: 'home' },
    { payload: '2', text: 'Type', data: 'Announcement', icon: 'home' },
    { payload: '3', text: 'Caller ID', data: '(123) 456-7890', icon: 'home' }
];

var numberMenuItems = [
    { payload: '1', text: 'All', number: '22'},
    { payload: '3', text: 'Uncategorized', number: '6'},
    { payload: '4', text: 'Trash', number: '11' }
];

var iconMenuItems = [
    { payload: '1', text: 'Live Answer', iconClassName: 'muidocs-icon-communication-phone', number: '10' },
    { payload: '2', text: 'Voicemail', iconClassName: 'muidocs-icon-communication-voicemail',  number: '5' },
    { payload: '3', text: 'Starred', iconClassName: 'muidocs-icon-action-stars', number: '3' },
    { payload: '4', text: 'Shared', iconClassName: 'muidocs-icon-action-thumb-up',  number: '12' }
];

var filterMenuItems = [
    { payload: '1', text: 'Text Opt-In', toggle: true},
    { payload: '2', text: 'Text Opt-Out', toggle: true, defaultToggled: true},
    { payload: '3', text: 'Voice Opt-Out', toggle: true, disabled: true}
];

var nestedMenuItems = [
    { type: MenuItem.Types.NESTED, text: 'Reports', items: [
        { payload: '1', text: 'Nested Item 1' },
        { type: MenuItem.Types.NESTED, text: 'Nested Item 2', items: [
            { payload: '1', text: 'Nested Item 2.1' },
            { type: MenuItem.Types.NESTED, text: 'Nested Item 2.2', items: [
                { payload: '1', text: 'Nested Item 2.2.1' },
                { payload: '3', text: 'Nested Item 2.2.2' }
            ] },
            { payload: '3', text: 'Nested Item 2.3' }
        ] },
        { payload: '3', text: 'Nested Item 3' },
        { type: MenuItem.Types.NESTED, text: 'Nested Item 4', items: [
            { payload: '1', text: 'Nested Item 4.1' },
            { type: MenuItem.Types.NESTED, text: 'Nested Item 4.2', items: [
                { payload: '1', text: 'Nested Item 4.2.1', disabled: true },
                { payload: '3', text: 'Nested Item 4.2.2' }
            ] },
            { payload: '3', text: 'Nested Item 4.3' }
        ] },
        { payload: '4', text: 'Nested Item 5' }
    ] },
    { payload: '1', text: 'Audio Library'},
    { payload: '2', text: 'Settings'},
    { payload: '3', text: 'Logout', disabled: true}
];


var MenusPage = React.createClass({

    render: function() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <h2 className="mui-font-style-headline">Declaritive</h2>
                    <DropDownMenu
                        menuItems={[]}
                        onItemClick={this._onItemClick}>
                        <NestedMenuItem text={"Parent"}>
                            <MenuItem payload={'1'}>Child</MenuItem>
                            <MenuItem payload={'1'}>Child</MenuItem>
                            <MenuItem payload={'1'}>Child</MenuItem>
                            <MenuItem payload={'1'}>Child</MenuItem>
                        </NestedMenuItem>
                        <MenuItem payload={'1'}>Child</MenuItem>
                    </DropDownMenu>
                </div>

                <div className="col-md-3">
                    <h2 className="mui-font-style-headline">Label Menu</h2>
                    {this._getLabelMenuExample()}
                </div>

                <div className="col-md-3">
                    <h2 className="mui-font-style-headline">Number Menu</h2>
                    {this._getNumberMenuExample()}
                </div>

                <div className="col-md-3">
                    <h2 className="mui-font-style-headline">Filter Menu</h2>
                    {this._getFilterMenuExample()}
                    <h2 className="mui-font-style-headline">Nested Menu</h2>
                    {this._getNestedMenuExample()}
                </div>

                <div className="col-md-3">
                    <h2 className="mui-font-style-headline">Icon Menu</h2>
                    {this._getIconMenuExample()}
                </div>



            </div>
        );
    },

    _getLabelMenuExample: function() {
        var code =
            "var labelMenuItems = [\n" +
            "   { payload: '1', text: 'ID', data: '1234567890', icon: 'home' },\n" +
            "   { payload: '2', text: 'Type', data: 'Announcement', icon: 'home' },\n" +
            "   { payload: '3', text: 'Caller ID', data: '(123) 456-7890', icon: 'home' }\n" +
            "];\n\n" +
            "//You can also pass an onItemTap or onItemClick callback prop.\n"
        "<Menu menuItems={labelMenuItems} />";

        return (
            <CodeExample code={code}>
                <div className="example-menu">
                    <Menu menuItems={labelMenuItems} onItemClick={this._onItemClick} />
                </div>
            </CodeExample>
        );
    },

    _getNumberMenuExample: function() {
        var code =
            "var numberMenuItems = [\n" +
            "   { payload: '1', text: 'All', number: '22' },\n" +
            "   { payload: '3', text: 'Uncategorized', number: '6'},\n" +
            "   { payload: '4', text: 'Trash', number: '11' }\n" +
            "];\n\n"  +
            "<Menu menuItems={numberMenuItems} />";

        return (
            <CodeExample code={code}>
                <div className="example-menu">
                    <Menu menuItems={numberMenuItems} onItemClick={this._onItemClick} />
                </div>
            </CodeExample>
        );
    },

    _getIconMenuExample: function() {
        var code =
            "//iconClassName is the classname for our icon that will get passed into mui.FontIcon\n" +
            "iconMenuItems = [\n" +
            "   { payload: '1', text: 'Live Answer', iconClassName: 'muidocs-icon-communication-phone', number: '10' },\n" +
            "   { payload: '2', text: 'Voicemail', iconClassName: 'muidocs-icon-communication-voicemail',  number: '5' },\n" +
            "   { payload: '3', text: 'Starred', iconClassName: 'muidocs-icon-action-stars', number: '3' },\n" +
            "   { payload: '4', text: 'Shared', iconClassName: 'muidocs-icon-action-thumb-up',  number: '12' }\n" +
            "];\n\n" +
            "<Menu menuItems={iconMenuItems} />";

        return (
            <CodeExample code={code}>
                <div className="example-menu">
                    <Menu menuItems={iconMenuItems} onItemClick={this._onItemClick} />
                </div>
            </CodeExample>
        );
    },

    _getFilterMenuExample: function() {
        var code =
            "// Include toggle properties as keys so that they are passed into the toggle component\n" +
            "filterMenuItems = [\n" +
            "   { payload: '1', text: 'Text Opt-In', toggle: true},\n" +
            "   { payload: '2', text: 'Text Opt-Out', toggle: true, defaultToggled: true},\n" +
            "   { payload: '3', text: 'Voice Opt-Out', toggle: true, disabled: true}\n" +
            "];\n\n" +
            "<Menu menuItems={filterMenuItems} />";

        return (
            <CodeExample code={code}>
                <div className="example-menu">
                    <Menu menuItems={filterMenuItems} onItemToggle={this._onFilterMenuToggle}  onItemClick={this._onItemClick} />
                </div>
            </CodeExample>
        );
    },

    _getNestedMenuExample: function() {
        var code =
            "nestedMenuItems = [\n" +
            "    { type: MenuItem.Types.NESTED, text: 'Reports', items: [\n" +
            "      { payload: '1', text: 'Nested Item 1' },\n" +
            "      { type: MenuItem.Types.NESTED, text: 'Nested Item 2', items: [\n" +
            "        { payload: '1', text: 'Nested Item 2.1' },\n" +
            "        { type: MenuItem.Types.NESTED, text: 'Nested Item 2.2', items: [\n" +
            "          { payload: '1', text: 'Nested Item 2.2.1' },\n" +
            "          { payload: '3', text: 'Nested Item 2.2.2' }\n" +
            "        ] },\n" +
            "        { payload: '3', text: 'Nested Item 2.3' }\n" +
            "      ] },\n" +
            "      { payload: '3', text: 'Nested Item 3' },\n" +
            "      { type: MenuItem.Types.NESTED, text: 'Nested Item 4', items: [\n" +
            "        { payload: '1', text: 'Nested Item 4.1' },\n" +
            "        { type: MenuItem.Types.NESTED, text: 'Nested Item 4.2', items: [\n" +
            "          { payload: '1', text: 'Nested Item 4.2.1', disabled: true },\n" +
            "          { payload: '3', text: 'Nested Item 4.2.2' }\n" +
            "        ] },\n" +
            "        { payload: '3', text: 'Nested Item 4.3' }\n" +
            "      ] },\n" +
            "      { payload: '4', text: 'Nested Item 5' }\n" +
            "    ] },\n" +
            "    { payload: '1', text: 'Audio Library'},\n" +
            "    { payload: '2', text: 'Settings'},\n" +
            "    { payload: '3', text: 'Logout', disabled: true}\n" +
            "  ];\n\n" +
            '<Menu menuItems={nestedMenuItems} />';

        return (
            <CodeExample code={code}>
                <div className="example-menu-nested">
                    <Menu menuItems={nestedMenuItems} onItemClick={this._onItemClick} onItemTap={this._onItemTap} />
                </div>
            </CodeExample>
        );
    },

    _onFilterMenuToggle: function(e, key, menuItem, toggled) {
        console.log('Filter Menu Toggled: ', key, menuItem, toggled)
    },

    _onItemClick: function(e, key, menuItem) {
        console.log("Menu Item Click: ", menuItem);
    },

    _onItemTap: function(e, key, menuItem) {
        console.log("Menu Item Tap: ", menuItem);
    }

});

module.exports = MenusPage;
