import React from 'react';
import PropTypes from 'prop-types';
import TableRowsItem from './TableRowsItem';

const TableRow = (props) => {
  return (
    <div className="chamel-table-rows">
      {this._getChildren()}
    </div>
  );

  _getChildren = () => {
    let children = [],
      rowItem,
      itemComponent

    for (let i = 0; i < this.props.rowItems.length; i++) {
      rowItem = this.props.rowItems[i];

      itemComponent = (
        <TableRowsItem />
      );

      children.push(itemComponent);
    }

    return children;
  };

}

TableRow.propTypes = {
  rowItems: PropTypes.array.isRequired
};

export default TableRow;
