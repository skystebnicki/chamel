var React = require('react');
var Checkbox = require("chamel/Checkbox");
var CodeExample = require("../CodeExample");

var code =
    '//Checkboxes\n' +
    '<Checkbox\n' +
    '  name="checkboxName1"\n' +
    '  value="checkboxValue1"\n' +
    '  label="went for a run today" />\n' +
    '<Checkbox\n' +
    '  name="checkboxName2"\n' +
    '  value="checkboxValue2"\n' +
    '  label="fed the dog"\n' +
    '  defaultSwitched={true} />\n' +
    '<Checkbox\n' +
    '  name="checkboxName3"\n' +
    '  value="checkboxValue3"\n' +
    '  label="built a house on the moon"\n' +
    '  disabled={true} />\n\n' +
    '//Radio Buttons\n' +
    '<RadioButtonGroup \n' +
    '  name="shipSpeed"\n' +
    '  defaultSelected="not_light">\n' +
    '    <RadioButton\n' +
    '      value="light"\n' +
    '      label="prepare for light speed" />\n' +
    '    <RadioButton\n' +
    '      value="not_light"\n' +
    '      label="light speed too slow"\n' +
    '      defaultChecked={true} />\n' +
    '   <RadioButton\n' +
    '      value="ludicrous"\n' +
    '      label="go to ludicous speed"\n'+
    '      disabled={true}/>\n' +
    '</RadioButtonGroup>\n\n' +
    '//Toggle\n' +
    '<Toggle\n' +
    '  name="toggleName1"\n' +
    '  value="toggleValue1"\n' +
    '  label="activate thrusters" />\n' +
    '<Toggle\n' +
    '  name="toggleName2"\n' +
    '  value="toggleValue2"\n' +
    '  label="auto-pilot"\n' +
    '  defaultToggled={true} />\n' +
    '<Toggle\n' +
    '  name="toggleName3"\n' +
    '  value="toggleValue3"\n' +
    '  label="initiate self-destruct sequence"\n' +
    '  disabled={true} />\n\n';

var EditorDemo = React.createClass({

    render: function() {

        return (
            <div>
                <Checkbox
                    name="myCheckbox"
                    value="myCheckboxValue"
                    label="Test Checkbox"
                    defaultSwitched={true} />
            </div>
        );
    }

});

module.exports = EditorDemo;
