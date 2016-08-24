var React = require('react');
var Editor = require("../../src/Editor");
var CodeExample = require("../CodeExample");

var code =
    '<Editor onChange={this.handleChange_} />';

var EditorDemo = React.createClass({

    render: function() {

        return (
            <div>
                <CodeExample code={code}>
                    <Editor onFocus={this._handleFocus} onBlur={this._handleBlur} onChange={this._handleChange} />
                </CodeExample>
            </div>
        );
    },
    
    _handleBlur: function(e) {
    	console.log("editor on blur");
    },
    
    _handleFocus: function(e) {
    	console.log("editor on focus");
    },
    
    _handleChange: function(e) {
    	console.log("editor onChange event");
    }

});

module.exports = EditorDemo;
