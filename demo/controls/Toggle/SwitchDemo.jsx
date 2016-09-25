var React = require("react");

import Switch from 'chamel/Toggle/Switch';

class SwitchDemo extends React.Component {

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call paprent constructor
    super(props);

    this.state = {
      checked: false
    }
  }

  render () {
    return (
      <div>
        <Switch
          checked={this.state.checked}
          onChange={this._handleChange}
          label={"Switch with label"}
        />
      </div>
    );
  }

  _handleChange = (e, checked) => {
    this.setState({checked: checked});
  }
};

export default SwitchDemo;
