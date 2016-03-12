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
                    <FlatButton label="Default" onClick={this._handleClick} />
                    <FlatButton label="Primary" onClick={this._handleClick} primary={true} />
                    <FlatButton label="Secondary" onClick={this._handleClick} secondary={true} />
                    <FlatButton label="Disabled" onClick={this._handleClick} disabled={true} />
                    <h3>{"Raised"}</h3>
                    <RaisedButton label="Default" onClick={this._handleClick} />
                    <RaisedButton label="Primary" onClick={this._handleClick} primary={true} />
                    <RaisedButton label="Secondary" onClick={this._handleClick} secondary={true} />
                    <RaisedButton label="Disabled" onClick={this._handleClick} disabled={true} />
                </div>
            </div>
        );
    },

    _handleClick: function(e) {
      console.log("Clicked", e);
    }
});

module.exports = Button;
