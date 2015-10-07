var React = require('react');
var Editor = require("../../src/editor/Editor.jsx");
var CodeExample = require("../CodeExample.jsx");

var EditorDemo = React.createClass({

    render: function() {

        var code = '// TODO: put code example here';


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
