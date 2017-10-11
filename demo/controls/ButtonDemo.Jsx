import React, { Component } from 'react';
import FlatButton from 'chamel/Button/FlatButton';
import RaisedButton from 'chamel/Button/RaisedButton';
import FloatingButton from 'chamel/Button/FloatingButton';
import IconButton from 'chamel/Button/IconButton';
import CloseIcon from 'chamel/icons/font/CloseIcon';

class ButtonDemo extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <h2>{"Buttons"}</h2>

                    <h3>{"Flat"}</h3>
                    <FlatButton onTap={this._handleClick}>Default</FlatButton>
                    <FlatButton primary onTap={this._handleClick}>Primary</FlatButton>
                    <FlatButton accent onTap={this._handleClick}>Accent</FlatButton>
                    <FlatButton disabled onTap={this._handleClick}>Accent</FlatButton>
                    <FlatButton onTap={this._handleClick}>
                        <CloseIcon />
                        With Icon
                    </FlatButton>

                    <h3>{"Raised"}</h3>
                    <RaisedButton onTap={this._handleClick}>Default</RaisedButton>
                    <RaisedButton primary onTap={this._handleClick}>Primary</RaisedButton>
                    <RaisedButton accent onTap={this._handleClick}>Accent</RaisedButton>
                    <RaisedButton disabled onTap={this._handleClick}>Disabled</RaisedButton>
                    <RaisedButton onTap={this._handleClick}>With Icon</RaisedButton>

                    <h3>{"Floating"}</h3>
                    <FloatingButton onTap={this._handleClick}><CloseIcon /></FloatingButton>
                    <FloatingButton type={'floating'} primary onTap={this._handleClick}><CloseIcon /></FloatingButton>
                    <FloatingButton type={'floating'} accent onTap={this._handleClick}><CloseIcon /></FloatingButton>
                    <FloatingButton type={'floating'} disabled onTap={this._handleClick}><CloseIcon /></FloatingButton>

                    <h3>{"Icon"}</h3>
                    <IconButton onTap={this._handleClick}><CloseIcon /></IconButton>
                </div>
            </div>
        );
    }

    _handleClick = (e) => {
        console.log("Tapped");
        return true;
    }
}

module.exports = ButtonDemo;
