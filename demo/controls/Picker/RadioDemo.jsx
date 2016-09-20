var React = require("react");

import RadioPicker from 'chamel/Picker/RadioPicker';
import RadioButton from 'chamel/Picker/RadioButton';

class RadioDemo extends React.Component {

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call parent constructor
    super(props);

    this.state = {
      value: "2"
    }
  }

  render () {
    return (
      <div>
        <RadioPicker onChange={this._handleChange} value={this.state.value}>
          <RadioButton label={"Option 1"} value={"1"} />
          <RadioButton label={"Option 2"} value={"2"} />
          <RadioButton label={"Option 3"} value={"3"} />
        </RadioPicker>
      </div>
    );
  }

  _handleChange = (value) => {
    this.setState({value: value});
  }
};

export default RadioDemo;
