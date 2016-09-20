var React = require('react');
var TextField = require("../../src/Input/TextField");
var AutoComplete = require("../../src/AutoComplete");
var CodeExample = require("../CodeExample.jsx");
var ComponentDoc = require('../ComponentDoc.jsx');

var EditorDemo = React.createClass({

  render: function () {

    var suggestions = [
        {payload: 1, text: 'marl@tumulak.com'},
        {payload: 2, text: 'm@rlon'},
        {payload: 3, text: '@rley'},
        {payload: 4, text: 'Bob M@rley'},
        {payload: 5, text: 'tumulak'},
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
          value="marl@tum"
          /*autoCompleteGetData={
              function(keyword, doneCallback) {
                  doneCallback(suggestions);
              }
          }*/
          />
      </div>
    );
  },

  _handleChange: function (e) {
      console.log('input changed');
  }

});

export default EditorDemo;
