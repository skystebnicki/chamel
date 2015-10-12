var React = require("react");

var FlatButton = require("../../src/FlatButton.jsx");
var RaisedButton = require("../../src/RaisedButton.jsx");

var Button = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <h2>{"Buttons"}</h2>
                    <h3>{"Flat"}</h3>
                    <FlatButton label="Default" />
                    <FlatButton label="Primary" primary={true} />
                    <FlatButton label="Secondary" secondary={true} />
                    <FlatButton label="Disabled" disabled={true} />
                    <h3>{"Raised"}</h3>
                    <RaisedButton label="Default" />
                    <RaisedButton label="Primary" primary={true} />
                    <RaisedButton label="Secondary" secondary={true} />
                    <RaisedButton label="Disabled" disabled={true} />
                </div>
            </div>
        );
    }
});

module.exports = Button;
