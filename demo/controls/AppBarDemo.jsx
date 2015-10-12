var React = require("react");
var AppBar = require("../../src/AppBar.jsx");
var IconButton = require("../../src/IconButton.jsx");
var CodeExample = require("../CodeExample.jsx");

var AppBarDemo = React.createClass({

    render: function() {

        var leftIcon = (<IconButton
            iconClassName="cfi cfi-close">
        </IconButton>);

        var rightIcon = (<IconButton
            iconClassName="cfi cfi-pencil">
        </IconButton>);

        return (
            <div className="row">
                <div className="col-xs-12">
                    <AppBar
                        title="Test"
                        iconElementLeft={leftIcon}
                        iconElementRight={rightIcon}
                        />
                </div>
            </div>
        );
    }

});

module.exports = AppBarDemo;
