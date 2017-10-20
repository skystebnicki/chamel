import React from 'react';
import SelectButton from 'chamel/Picker/SelectButton';

class SelectButtonDemo extends React.Component {
  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call parent constructor
    super(props);

    this.state = {
      value: '2',
    };
  }

  render() {
    const menuItems = [
      { payload: '1', text: 'Never' },
      { payload: '2', text: 'Every Night' },
      { payload: '3', text: 'Weeknights' },
      { payload: '4', text: 'Weekends' },
      { payload: '5', text: 'Weekly' },
    ];

    return (
      <div>
        <SelectButton menuItems={menuItems} />
      </div>
    );
  }

  _handleChange = value => {
    this.setState({ value: value });
  };
}

export default SelectButtonDemo;
