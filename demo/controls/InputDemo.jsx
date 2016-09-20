import React from 'react';
import DropDownMenu from 'chamel/DropDownMenu';
import TextField from 'chamel/input/TextField';

var dropDownData = [
    { value: 'test1', text: 'Test Entry 1' },
    { value: 'test2', text: 'Test Entry 2' },
    { value: 'test3', text: 'Test Entry 3' },
    { value: 'test4', text: 'Test Entry 4' },
    { value: 'test5', text: 'Test Entry 5' },
    { value: 'test6', text: 'Test Entry 6' },
    { value: 'test7', text: 'Test Entry 7' },
    { value: 'test8', text: 'Test Entry 8' },
    { value: 'test9', text: 'Test Entry 9' },
    { value: 'test10', text: 'Test Entry 10' },
    { value: 'test11', text: 'Test Entry 11' },
    { value: 'test12', text: 'Test Entry 12' },
    { value: 'test13', text: 'Test Entry 13' },
    { value: 'test14', text: 'Test Entry 14' },
    { value: 'test15', text: 'Test Entry 15' },
    { value: 'test16', text: 'Test Entry 16 Test Entry 1 Test Entry 1' }
];

var InputDemo = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <h2>Text</h2>
                    <TextField onChange={this._handleTextChange} hintText="Hint Text" />
                    <TextField onChange={this._handleTextChange} floatingLabelText="Floated Label" />


                  <h2>Multi Line</h2>
                  <div>
                    <TextField multiLine onChange={this._handleTextChange} hintText="Hint Text" />
                  </div>
                  <div>
                    <TextField multiLine onChange={this._handleTextChange} floatingLabelText="Floated Label" />
                  </div>
                </div>
            </div>
        );
    },

    /**
     * Log changed value of a DropDown menu
     */
    _handleDropDownChange: function(e, key, payload)
    {
        console.log("Dropdown value changed to", payload);
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
