import React from 'react';
import PropTypes from 'prop-types';
import TableRowsItem from './TableRowsItem';

const TableRow = (props) => {
  let children = [],
    rowItem,
    itemComponent

  for (let i = 0; i < props.rowItems.length; i++) {
    rowItem = props.rowItems[i];

    itemComponent = (
      <TableRowsItem />
    );

    children.push(itemComponent);
  }
  
  return (
    <div className="chamel-table-rows">
      {children}
    </div>
  );
}

TableRow.propTypes = {
  rowItems: PropTypes.array.isRequired
};

export default TableRow;
