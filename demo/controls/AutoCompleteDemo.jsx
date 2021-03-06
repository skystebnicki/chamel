import React, { Component } from 'react';
var TextField = require("chamel/Input/TextField");
var AutoComplete = require("chamel/AutoComplete");
var CodeExample = require("../CodeExample.jsx");
var ComponentDoc = require('../ComponentDoc.jsx');

class EditorDemo extends Component {

  render() {

    var suggestions = [
        {payload: 1, text: 'banna'},
        {payload: 2, text: 'apple'},
        {payload: 3, text: 'Orange'},
        {payload: 4, text: 'pineapple'},
        {payload: 5, text: 'banna-orange'},
    ];

    var trigger = ['@', '#', '$'];

    return (
      <div>
        <h1>AutoComplete</h1>

        <TextField
          autoComplete={true}
          autoCompleteData={suggestions}
          autoCompleteDelimiter=''
          autoCompleteTrigger={trigger}
          autoCompleteTransform={
            function(data) {
              return "[" + data.payload + ":" + data.text + "]";
            }
          }
          value="@ban"
          /*autoCompleteGetData={
              function(keyword, doneCallback) {
                  doneCallback(suggestions);
              }
          }*/
          />
      </div>
    );
  }

  _handleChange = (e) => {
      console.log('input changed');
  }

}

export default EditorDemo;
