import React from 'react';
import List from 'chamel/List';
import ListItem from 'chamel/List/ListItem';
import MoreVerticon from 'chamel/icons/font/MoreVertIcon';
import RefreshIcon from 'chamel/icons/font/RefreshIcon';

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
                    <List selectable selectedIndex={1}>
                        <ListItem primaryText={"Test 1"} />
                        <ListItem primaryText={"Test 2"} />
                    </List>

                    <h2>{"With Icons"}</h2>
                    <List>
                        <ListItem
                          primaryText={"Primary text goes here 1"}
                          secondaryText={"Secondary text goes here"}
                          leftElement={<RefreshIcon />}
                          rightElement={<MoreVerticon />}
                        />
                        <ListItem
                          primaryText={"Primary text goes here 2"}
                          secondaryText={"Secondary text goes here"}
                          leftElement={<RefreshIcon />}
                          rightElement={<MoreVerticon />}
                        />
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
