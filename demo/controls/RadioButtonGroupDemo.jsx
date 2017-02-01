import React from 'react';
import RadioButtonGroup from 'chamel/RadioButtonGroup/RadioButtonGroup';
import RadioButton from 'chamel/RadioButton/RadioButton';

var RadioButtonGroupDemo = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <RadioButtonGroup
            inline={true}
            defaultSelected={1}
            onChange={this._handleTypeChange}>
            <RadioButton
              value={1}
              label='Radio'/>
            <RadioButton
              value={2}
              label='Button'/>
          </RadioButtonGroup>
        </div>
      </div>
    );
  }
});

module.exports = RadioButtonGroupDemo;
