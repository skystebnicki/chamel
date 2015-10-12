var React = require('react');
var Editor = require("../../src/editor/Editor.jsx");
var CodeExample = require("../CodeExample.jsx");

var code =
    '<Editor onChange={this.handleChange_} />';

var EditorDemo = React.createClass({

    render: function() {

        return (
            <div>
                <CodeExample code={code}>
                    <Editor />
                </CodeExample>
            </div>
        );
    }

});

module.exports = EditorDemo;
