var React = require("react");
var AppBar = require("../../src/AppBar");
var IconButton = require("../../src/IconButton");
var FlatButton = require("../../src/FlatButton");
var CodeExample = require("../CodeExample");

var AppBarDemo = React.createClass({

    render: function() {

        var leftIcon = (
            <IconButton
                iconClassName="cfi cfi-close">
            </IconButton>
        );

        var rightIcon = (
            <IconButton
                iconClassName="cfi cfi-pencil">
            </IconButton>
        );

        // Make the div scrollable so that we can test the fixed behavior
        let scrollStyle = {height: "3000px"};

        return (
            <div className="row">
                <div className="col-xs-12">
                    <AppBar
                        title="Test"
                        iconElementLeft={leftIcon}
                        iconElementRight={rightIcon}
                        fixed={true}
                    />
                    <div style={scrollStyle}>Long scrolled content container</div>
                </div>
            </div>
        );
    }

});

module.exports = AppBarDemo;
