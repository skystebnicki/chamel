import React from 'react';
import FlatButton from 'chamel/Button/FlatButton';
import RaisedButton from 'chamel/Button/RaisedButton';
import FloatingButton from 'chamel/Button/FloatingButton';
import IconButton from 'chamel/Button/IconButton';
import CloseIcon from 'chamel/icons/font/CloseIcon';

var ButtonDemo = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <h2>{"Buttons"}</h2>

                    <h3>{"Flat"}</h3>
                    <FlatButton onClick={this._handleClick}>Default</FlatButton>
                    <FlatButton primary onClick={this._handleClick}>Primary</FlatButton>
                    <FlatButton accent onClick={this._handleClick}>Accent</FlatButton>
                    <FlatButton disabled onClick={this._handleClick}>Accent</FlatButton>
                    <FlatButton onClick={this._handleClick}>
                        <CloseIcon />
                        With Icon
                    </FlatButton>

                    <h3>{"Raised"}</h3>
                    <RaisedButton onClick={this._handleClick}>Default</RaisedButton>
                    <RaisedButton primary onClick={this._handleClick}>Primary</RaisedButton>
                    <RaisedButton accent onClick={this._handleClick}>Accent</RaisedButton>
                    <RaisedButton disabled onClick={this._handleClick}>Disabled</RaisedButton>
                    <RaisedButton onClick={this._handleClick}>With Icon</RaisedButton>

                    <h3>{"Floating"}</h3>
                    <FloatingButton onClick={this._handleClick}><CloseIcon /></FloatingButton>
                    <FloatingButton type={'floating'} primary onClick={this._handleClick}><CloseIcon /></FloatingButton>
                    <FloatingButton type={'floating'} accent onClick={this._handleClick}><CloseIcon /></FloatingButton>
                    <FloatingButton type={'floating'} disabled onClick={this._handleClick}><CloseIcon /></FloatingButton>

                    <h3>{"Icon"}</h3>
                    <IconButton onClick={this._handleClick}><CloseIcon /></IconButton>
                </div>
            </div>
        );
    },

    _handleClick: function(e) {
        console.log("Tapped");
        return true;
    }
});

module.exports = ButtonDemo;
