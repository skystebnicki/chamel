import React from 'react';
import List from 'chamel/List';
import ListItem from 'chamel/List/ListItem';


var FlatButton = require("chamel/FlatButton");
var RaisedButton = require("chamel/RaisedButton");

var ListDemo = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <h2>{"Simple"}</h2>
                    <List>
                        <ListItem primaryText={"Primary text goes here 1"} secondaryText={"Secondary text goes here"} />
                        <ListItem primaryText={"Primary text goes here 2"} secondaryText={"Secondary text goes here"} />
                    </List>

                    <h2>{"Selectable"}</h2>
                    <List>
                        <ListItem>Test 1</ListItem>
                        <ListItem>Test 2</ListItem>
                    </List>
                </div>
            </div>
        );
    },

    _handleClick: function(e) {
        console.log("Clicked", e);
        return false;
    }
});

module.exports = ListDemo;
