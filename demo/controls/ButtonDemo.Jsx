var React = require("react");

import Button from 'chamel/Button';
var FlatButton = require("chamel/FlatButton");
var RaisedButton = require("chamel/RaisedButton");

var ButtonDemo = React.createClass({
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

                    <h3>{"New Flat"}</h3>
                    <Button type={'flat'} onTap={this._handleClick}>Default</Button>
                    <Button type={'flat'} primary onTap={this._handleClick}>Primary</Button>
                    <Button type={'flat'} accent onTap={this._handleClick}>Accent</Button>
                    <Button type={'flat'} disabled onTap={this._handleClick}>Accent</Button>
                    <Button type={'flat'} onTap={this._handleClick}>With Icon</Button>

                    <h3>{"New Raised"}</h3>
                    <Button type={'raised'} onTap={this._handleClick}>Default</Button>
                    <Button type={'raised'} primary onTap={this._handleClick}>Primary</Button>
                    <Button type={'raised'} accent onTap={this._handleClick}>Accent</Button>
                    <Button type={'raised'} disabled onTap={this._handleClick}>Disabled</Button>
                    <Button type={'raised'} onTap={this._handleClick}>With Icon</Button>

                    <h3>{"New Floating"}</h3>
                    <Button type={'floating'} onTap={this._handleClick}>Default</Button>
                    <Button type={'floating'} primary onTap={this._handleClick}>Primary</Button>
                    <Button type={'floating'} accent onTap={this._handleClick}>Accent</Button>
                    <Button type={'floating'} disabled onTap={this._handleClick}>Disabled</Button>
                    <Button type={'floating'} onTap={this._handleClick}>With Icon</Button>
                </div>
            </div>
        );
    },

    _handleClick: function(e) {
        console.log("Clicked", e);
        return false;
    }
});

module.exports = ButtonDemo;
