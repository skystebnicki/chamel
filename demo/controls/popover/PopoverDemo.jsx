var React = require("react");
var AppBar = require("../../../src/AppBar");

var CodeExample = require("../../CodeExample");
import ExampleSimple from './ExampleSimple';

var PopoverDemo = React.createClass({

    render: function() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <ExampleSimple />
                </div>
            </div>
        );
    }

});

module.exports = PopoverDemo;
