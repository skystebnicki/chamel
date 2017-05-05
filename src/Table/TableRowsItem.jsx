import React from 'react';
import Classable from '../mixins/classable';

const TableRowItem = (props) => {

    // mixins: [Classable],

  const classes = this.getClasses('chamel-table-rows-item');

  return (
    <div className={classes}>
      (TableRowItem)
      <div className="chamel-table-rows-actions">
        (Actions)
      </div>
    </div>
  );

}

export default TableRowItem;
