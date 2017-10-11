import React, { Component } from 'react';

class CodeBlock extends Component {

    componentDidMount() {
        //hljs.highlightBlock(React.findDOMNode(this));
    }

    componentDidUpdate(prevProps, prevState) {
        //hljs.highlightBlock(React.findDOMNode(this));
    }

    render() {
        return (
            <pre className="code-block">
                <code>{this.props.children}</code>
            </pre>
        );
    }

}

module.exports = CodeBlock;
