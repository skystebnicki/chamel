var React = require('react');
var TextField = require("../../src/TextField.jsx");
var Callout = require("../../src/Callout.jsx");
var CodeExample = require("../CodeExample.jsx");
var ComponentDoc = require('../ComponentDoc.jsx');

var code =
    '<Callout suggestions={suggestions} inputAttributes={inputAttributes} />';

var componentInfo = [
    {
        name: 'Props',
        infoArray: [
            {
                name: 'suggestions',
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
                name: 'inputAttributes',
                type: 'array',
                desc: 'Array of input attributes.',
                sample: "var inputAttributes = [\n" +
                "id: 'callout-input',\n" +
                "className: 'callout-input-class',\n" +
                "onChange: this._handleChange,\n" +
                "];"
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

        var displayCallout = null;
        var suggestions = [
            {payload: 1, text: 'banana'},
            {payload: 2, text: 'apple'},
            {payload: 3, text: 'orange'},
            {payload: 4, text: 'star apple'},
        ];

        var inputAttributes = {
            id: 'callout-input',
            onChange: this._handleChange,
        };


        displayCallout = (<Callout suggestions={suggestions} inputAttributes={inputAttributes}/>);

        return (
            <ComponentDoc
                name="Callout"
                code={code}
                componentInfo={componentInfo}>

                {displayCallout}

            </ComponentDoc>
        );
    },

    _handleChange: function (e) {
        console.log('input changed');
    }

});

module.exports = EditorDemo;
