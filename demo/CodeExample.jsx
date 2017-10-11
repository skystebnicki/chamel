var CodeBlock = require('./CodeBlock'),
    Paper = require("../src/Paper");
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CodeExample extends Component {

    static propTypes = {
        code: PropTypes.string.isRequired
    }

    render() {
        return (
            <div>
                <h6>Example</h6>
                <div className="example-block">
                    {this.props.children}
                </div>
                <CodeBlock>{this.props.code}</CodeBlock>
            </div>
        );
    }

}

module.exports = CodeExample;