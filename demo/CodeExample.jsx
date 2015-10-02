var React = require('react'),
    CodeBlock = require('./CodeBlock.jsx'),
    Paper = require("../src/Paper.jsx");

var CodeExample = React.createClass({

    propTypes: {
        code: React.PropTypes.string.isRequired
    },

    render: function() {
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

});

module.exports = CodeExample;