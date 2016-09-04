import React from 'react';
import AppBar from '../../src/AppBar';
import IconButton from '../../src/Button/IconButton';
import CloseIcon from 'chamel/icons/font/CloseIcon';
var CodeExample = require("../CodeExample");

var AppBarDemo = React.createClass({

    render: function() {

        var leftIcon = (
            <IconButton>
                <CloseIcon />
            </IconButton>
        );

        var rightIcon = (
            <IconButton>
                <CloseIcon />
            </IconButton>
        );

        // Make the div scrollable so that we can test the fixed behavior
        let scrollStyle = {height: "3000px"};

        return (
            <div className="row">
                <div className="col-xs-12">
                    <AppBar
                        title="Test"
                        iconElementLeft={leftIcon}
                        iconElementRight={rightIcon}
                        fixed={true}
                    />
                    <div style={scrollStyle}>Long scrolled content container</div>
                </div>
            </div>
        );
    }

});

module.exports = AppBarDemo;
