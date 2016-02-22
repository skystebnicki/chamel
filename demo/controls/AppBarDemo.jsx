var React = require("react");
var AppBar = require("../../src/AppBar.jsx");
var IconButton = require("../../src/IconButton.jsx");
var FlatButton = require("../../src/FlatButton.jsx");
var CodeExample = require("../CodeExample.jsx");

var rightBarItems = [

];

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
                    <div style={scrollStyle} />
                </div>
            </div>
        );
    }

});

module.exports = AppBarDemo;
