var React = require('react');
var TextField = require("../../src/TextField.jsx");
var AutoComplete = require("../../src/AutoComplete.jsx");
var CodeExample = require("../CodeExample.jsx");
var ComponentDoc = require('../ComponentDoc.jsx');

var code =
    '<AutoComplete suggestions={suggestions} inputAttributes={inputAttributes} />';

var componentInfo = [
    {
        name: 'Props',
        infoArray: [
            {
                name: 'autoComplete',
                type: 'bool',
                desc: 'Array of input attributes.'
            },
            {
                name: 'autoCompleteData',
                type: 'array',
                desc: 'Array of suggestions to be displayed in the list.',
                sample: "var suggestions = [\n" +
                "{payload: 1, text: 'banana'},\n" +
                "{payload: 2, text: 'apple'},\n" +
                "{payload: 3, text: 'orange'},\n" +
                "{payload: 4, text: 'star apple'},\n" +
                "];"
            },
            {
                name: 'autoCompleteDelimiter',
                type: 'string',
                desc: "Delimiter will give us the ability to make it ';' or ',' for things like email input but defaults to space/words"
            },
            {
                name: 'autoCompleteTrigger',
                type: 'string|array',
                desc: 'The trigger key to display the autoComplete list. Default value is null'
            },
            {
                name: 'autoCompleteTransform',
                type: 'function',
                desc: "Optional callback for transforming words like '@user' into '[user:123]'"
            },
            {
                name: 'autoCompleteGetData',
                type: 'function',
                desc: "As an alternate to autoCompleteData, this callback could be used for ajax server requests"
            },
        ]
    },
    {
        name: 'Methods',
        infoArray: [
            {
                name: 'getValue',
                header: 'Callout.getValue()',
                desc: 'Returns the current input value.'
            },
            {
                name: 'setValue',
                header: 'Callout.setValue(value)',
                desc: 'Sets the default input value'
            }
        ]
    }
];

var EditorDemo = React.createClass({

    render: function () {

        var suggestions = [
            {payload: 1, text: 'banana'},
            {payload: 2, text: 'apple'},
            {payload: 3, text: 'orange'},
            {payload: 4, text: 'star apple'},
        ];

        var trigger = ['@', '#', '$'];

        return (
            <ComponentDoc
                name="AutoComplete"
                code={code}
                componentInfo={componentInfo}>

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
                    /*autoCompleteGetData={
                        function(keyword, doneCallback) {
                            doneCallback(suggestions);
                        }
                    }*/
                    />

            </ComponentDoc>
        );
    },

    _handleChange: function (e) {
        console.log('input changed');
    }

});

module.exports = EditorDemo;
