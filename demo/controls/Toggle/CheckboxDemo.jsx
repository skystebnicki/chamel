var React = require('react');

import Checkbox from 'chamel/Toggle/Checkbox';

class CheckboxDemo extends React.Component {
  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call paprent constructor
    super(props);

    this.state = {
      checked: false,
    };
  }

  render() {
    return (
      <div>
        <Checkbox
          checked={this.state.checked}
          onChange={this._handleChange}
          label={'Checkbox with label'}
        />
      </div>
    );
  }

  _handleChange = (e, checked) => {
    this.setState({ checked: checked });
  };
}

export default CheckboxDemo;
