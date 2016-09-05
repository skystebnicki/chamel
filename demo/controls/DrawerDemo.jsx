var React = require("react");

import Button from 'chamel/Button';
import IconButton from 'chamel/Button/IconButton';
import FontIcon from 'chamel/FontIcon';
import CloseIcon from 'chamel/icons/font/CloseIcon';

var FlatButton = require("chamel/FlatButton");
var RaisedButton = require("chamel/RaisedButton");

var DrawerDemo = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <h2>{"Buttons"}</h2>

                    <h3>{"Flat"}</h3>
                    <Button type={'flat'} onTap={this._handleClick}>Default</Button>
                    <Button type={'flat'} primary onTap={this._handleClick}>Primary</Button>
                    <Button type={'flat'} accent onTap={this._handleClick}>Accent</Button>
                    <Button type={'flat'} disabled onTap={this._handleClick}>Accent</Button>
                    <Button type={'flat'} onTap={this._handleClick}>
                        <CloseIcon />
                        With Icon
                    </Button>

                    <h3>{"Raised"}</h3>
                    <Button type={'raised'} onTap={this._handleClick}>Default</Button>
                    <Button type={'raised'} primary onTap={this._handleClick}>Primary</Button>
                    <Button type={'raised'} accent onTap={this._handleClick}>Accent</Button>
                    <Button type={'raised'} disabled onTap={this._handleClick}>Disabled</Button>
                    <Button type={'raised'} onTap={this._handleClick}>With Icon</Button>

                    <h3>{"Floating"}</h3>
                    <Button type={'floating'} onTap={this._handleClick}><CloseIcon /></Button>
                    <Button type={'floating'} primary onTap={this._handleClick}><CloseIcon /></Button>
                    <Button type={'floating'} accent onTap={this._handleClick}><CloseIcon /></Button>
                    <Button type={'floating'} disabled onTap={this._handleClick}><CloseIcon /></Button>

                    <h3>{"Icon"}</h3>
                    <IconButton onTap={this._handleClick}><CloseIcon /></IconButton>
                </div>
            </div>
        );
    },

    _handleClick: function(e) {
        console.log("Clicked", e);
        return false;
    }
});

module.exports = DrawerDemo;
