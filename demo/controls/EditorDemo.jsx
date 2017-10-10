var React = require('react');
var Editor = require("chamel/Editor");
var CodeExample = require("../CodeExample");

var code =
    '<Editor onChange={this.handleChange_} />';

var EditorDemo = React.createClass({

    render: function() {

        return (
            <div>
                <CodeExample code={code}>
                    <Editor
                        onFocus={this._handleFocus}
                        onBlur={this._handleBlur}
                        onChange={this._handleChange}
                        value="<b>Insert value here...</b>" />
                </CodeExample>
            </div>
        );
    },
    
    _handleBlur: function(value) {
        console.log("onBlur event. Editor Value: " + value);
    },
    
    _handleFocus: function(value) {
        console.log("onFocus event. Editor Value: " + value);
    },
    
    _handleChange: function(value) {
    	console.log("onChange event. Editor Value: " + value);
    }

});

module.exports = EditorDemo;
