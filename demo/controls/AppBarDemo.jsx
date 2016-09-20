import React from 'react';
import AppBar from '../../src/AppBar';
import IconButton from '../../src/Button/IconButton';
import CloseIcon from 'chamel/icons/font/CloseIcon';
import Row from 'chamel/Grid/Row';
import Column from 'chamel/Grid/Column';

var CodeExample = require("../CodeExample");

var AppBarDemo = React.createClass({

    render: function() {

        var leftIcon = (
            <IconButton onTap={(e) => { console.log("Left close clicked"); }}>
                <CloseIcon />
            </IconButton>
        );

        var rightIcon = (
            <IconButton onTap={(e) => { console.log("Right close clicked"); }}>
                <CloseIcon />
            </IconButton>
        );

        // Make the div scrollable so that we can test the fixed behavior
        let scrollStyle = {height: "3000px"};

        return (
            <Row>
                <Column small={12}>
                    <AppBar
                        title="Test"
                        iconElementLeft={leftIcon}
                        iconElementRight={rightIcon}
                        fixed={true}
                    />
                    <div style={scrollStyle}>Long scrolled content container</div>
                </Column>
            </Row>
        );
    }

});

module.exports = AppBarDemo;
