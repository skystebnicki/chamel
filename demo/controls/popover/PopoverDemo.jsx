var React = require("react");
var AppBar = require("../../../src/AppBar.jsx");

var CodeExample = require("../../CodeExample.jsx");
import ExampleSimple from './ExampleSimple.jsx';

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
