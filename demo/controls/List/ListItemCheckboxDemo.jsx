import React from 'react';
import List from 'chamel/List/List';
import ListItemCheckbox from 'chamel/List/ListItemCheckbox';

class ListItemCheckboxDemo extends React.Component {
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
      <List>
        <ListItemCheckbox
          checked={this.state.checked}
          onChange={this._handleChange}
          primaryText={'Primary text goes here 1'}
          secondaryText={'Secondary text goes here'}
        />
      </List>
    );
  }

  _handleChange = (e, checked) => {
    this.setState({ checked: checked });
  };
}

export default ListItemCheckboxDemo;
