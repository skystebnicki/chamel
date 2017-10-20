import React, { Component } from 'react';
import List from 'chamel/List';
import ListItem from 'chamel/List/ListItem';
import ListItemCheckbox from 'chamel/List/ListItemCheckbox';
import ListDivider from 'chamel/List/ListDivider';
import MoreVerticon from 'chamel/icons/font/MoreVertIcon';
import RefreshIcon from 'chamel/icons/font/RefreshIcon';
import Checkbox from 'chamel/Toggle/Checkbox';
import ListItemCheckboxDemo from './ListItemCheckboxDemo';
import ListItemSelectDemo from './ListItemSelectDemo';

class ListDemo extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <h2>{'Simple'}</h2>
          <List>
            <ListItem
              primaryText={'Primary text goes here 1'}
              secondaryText={'Secondary text goes here'}
            />
            <ListItem
              primaryText={'Primary text goes here 2'}
              secondaryText={'Secondary text goes here'}
            />
            <ListDivider />
            <ListItem
              primaryText={'Unread item with divider above'}
              secondaryText={
                'This is an unread item with added emphases and we are also testing to make sure that long text trails right'
              }
              emphasized={true}
            />
          </List>

          <h2>{'Selectable'}</h2>
          <List selectable selectedIndex={1}>
            <ListItem primaryText={'Test 1'} />
            <ListItem primaryText={'Test 2'} />
          </List>

          <h2>{'With Icons and Secondary Actions'}</h2>
          <List>
            <ListItem
              primaryText={'Primary text goes here 1'}
              secondaryText={'Secondary text goes here'}
              leftElement={<RefreshIcon />}
              rightElement={<MoreVerticon />}
            />
            <ListItem
              primaryText={'Primary text goes here 2'}
              secondaryText={'Secondary text goes here'}
              leftElement={<RefreshIcon />}
              rightElement={<MoreVerticon />}
            />
          </List>

          <h2>{'With Icons and Checkbox (tap icon)'}</h2>
          <ListItemSelectDemo />

          <h2>{'Checkbox List'}</h2>
          <ListItemCheckboxDemo />
        </div>
      </div>
    );
  }

  _handleClick = e => {
    console.log('Clicked', e);
    return false;
  };
}

module.exports = ListDemo;
