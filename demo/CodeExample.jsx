var React = require('react'),
    CodeBlock = require('./CodeBlock'),
    Paper = require("../src/Paper");

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