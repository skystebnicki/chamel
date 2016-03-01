var React = require("react");

var FlatButton = require("../../src/FlatButton.jsx");
var RaisedButton = require("../../src/RaisedButton.jsx");
var DropDownMenu = require("../../src/DropDownMenu.jsx");
var TextField = require("../../src/TextField.jsx");

var dropDownData = [
    { payload: 'test1', text: 'Test Entry 1' },
    { payload: 'test2', text: 'Test Entry 2' },
    { payload: 'test3', text: 'Test Entry 3' },
    { payload: 'test4', text: 'Test Entry 4' },
    { payload: 'test5', text: 'Test Entry 5' },
    { payload: 'test6', text: 'Test Entry 6' },
    { payload: 'test7', text: 'Test Entry 7' },
    { payload: 'test8', text: 'Test Entry 8' },
    { payload: 'test9', text: 'Test Entry 9' },
    { payload: 'test10', text: 'Test Entry 10' },
    { payload: 'test11', text: 'Test Entry 11' },
    { payload: 'test12', text: 'Test Entry 12' },
    { payload: 'test13', text: 'Test Entry 13' },
    { payload: 'test14', text: 'Test Entry 14' },
    { payload: 'test15', text: 'Test Entry 15' },
    { payload: 'test16', text: 'Test Entry 16' }
];

var InputDemo = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <h2>Text</h2>
                    <TextField onChange={this._handleTextChange} hintText="Text Field" />

                    <h2>Drop Down Menu</h2>
                    <DropDownMenu
                        menuItems={dropDownData}
                        onChange={this._handleDropDownChange}
                    />

                    <h2>Side by Side</h2>
                    <div>
                        <TextField onChange={this._handleTextChange} hintText="Text Field" />
                        <DropDownMenu
                            menuItems={dropDownData}
                            onChange={this._handleDropDownChange}
                        />
                    </div>
                </div>
            </div>
        );
    },

    /**
     * Log changed value of a DropDown menu
     */
    _handleDropDownChange: function(evt)
    {
        console.log("Dropdown value changed to", evt.target.value);
    },

    /**
     * Log changed value of a DropDown menu
     */
    _handleTextChange: function(evt)
    {
        console.log("Text field value changed to", evt.target.value);
    }
});

module.exports = InputDemo;
