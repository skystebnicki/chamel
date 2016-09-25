import React from 'react';

import Row from 'chamel/Grid/Row';
import Column from 'chamel/Grid/Column';

import AppBarFixedDemo from './AppBar/AppBarFixedDemo';

var CodeExample = require("../CodeExample");

var AppBarDemo = React.createClass({

    render: function() {
        return (
            <Row>
                <Column small={12}>
                  <AppBarFixedDemo />
                </Column>
            </Row>
        );
    }

});

module.exports = AppBarDemo;
