import React from 'react';
import List from 'chamel/List/List';
import ListItem from 'chamel/List/ListItem';
import RefreshIcon from 'chamel/icons/font/RefreshIcon';

class ListItemSelectDemo extends React.Component {

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    super(props);

    this.state = {
      firstChecked: true,
      secondChecked: false
    }
  }

  render () {
    return (
      <List>
        <ListItem
          primaryText={"Primary text goes here 1"}
          secondaryText={"Secondary text goes here"}
          leftElement={<RefreshIcon />}
          selected={this.state.firstChecked}
          onLeftElementTap={() => { this.setState({firstChecked: !this.state.firstChecked});}}
          selectedShowCheckbox={true}
        />
        <ListItem
          primaryText={"Primary text goes here 2"}
          secondaryText={"Secondary text goes here"}
          leftElement={<RefreshIcon />}
          selected={this.state.secondChecked}
          onLeftElementTap={() => { this.setState({secondChecked: !this.state.secondChecked});}}
          selectedShowCheckbox={true}
        />
      </List>
    );
  }

  _handleChange = (e, checked) => {
    this.setState({checked: checked});
  }
};

export default ListItemSelectDemo;
