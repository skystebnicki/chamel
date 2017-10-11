import React, { Component } from 'react';
var Editor = require("chamel/Editor");
var CodeExample = require("../CodeExample");

var code =
    '<Editor onChange={this.handleChange_} />';

class EditorDemo extends Component {

    render() {

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
    }
    
    _handleBlur = (value) => {
        console.log("onBlur event. Editor Value: " + value);
    }
    
    _handleFocus = (value) => {
        console.log("onFocus event. Editor Value: " + value);
    }
    
    _handleChange = (value) => {
    	console.log("onChange event. Editor Value: " + value);
    }

}

module.exports = EditorDemo;
