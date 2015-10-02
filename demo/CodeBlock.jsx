var React = require('react');

var CodeBlock = React.createClass({

    componentDidMount: function() {
        //hljs.highlightBlock(React.findDOMNode(this));
    },

    componentDidUpdate: function(prevProps, prevState) {
        //hljs.highlightBlock(React.findDOMNode(this));
    },

    render: function() {
        return (
            <pre className="code-block">
                <code>{this.props.children}</code>
            </pre>
        );
    }

});

module.exports = CodeBlock;
