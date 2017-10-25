import React from 'react';
import GroupingChip from '../../../src/Grouping/Chip';


class GroupingDemo extends React.Component {
  render() {
    return (
      <div style={{marginTop: "30px"}}>
        <GroupingChip>{"Basic Chip"}</GroupingChip>
        <GroupingChip deletable={true}>{"Deletable Chip"}</GroupingChip>
      </div>
    );
  }
}

export default GroupingDemo;
