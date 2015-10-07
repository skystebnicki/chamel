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
                    <div className="row">
                        <div className="col-xs-3">
                            <RaisedButton label="Default" />
                        </div>
                        <div className="col-xs-3">
                            <RaisedButton label="Primary" primary={true} />
                        </div>
                        <div className="col-xs-3">
                            <RaisedButton label="Secondary" secondary={true} />
                        </div>
                        <div className="col-xs-3">
                            <RaisedButton label="Disabled" disabled={true} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Button;
