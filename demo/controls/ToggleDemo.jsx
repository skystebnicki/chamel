import React from 'react';
import CheckboxDemo from './Toggle/CheckboxDemo';
import SwitchDemo from './Toggle/SwitchDemo';

class ToggleDemo extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <h2>{"Toggle Components"}</h2>
          <h3>{"Checkbox"}</h3>
          <CheckboxDemo />
          <h3>{"Switch"}</h3>
          <SwitchDemo />
        </div>
      </div>
    );
  }
}

export default ToggleDemo;
