import React, { Component } from 'react';
import Row from 'chamel/Grid/Row';
import Column from 'chamel/Grid/Column';

import AppBarFixedDemo from './AppBar/AppBarFixedDemo';

var CodeExample = require("../CodeExample");

class AppBarDemo extends Component {

    render() {
        return (
            <Row>
                <Column small={12}>
                  <AppBarFixedDemo />
                </Column>
            </Row>
        );
    }

}

module.exports = AppBarDemo;
