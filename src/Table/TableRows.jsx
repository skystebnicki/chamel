import React from 'react';
import PropTypes from 'prop-types';
import Classable from '../mixins/classable';
import TableRowsItem from './TableRowsItem';

// TODO: Upgrade this to extends or pure
const TableRow = (props) => {
    // mixins: [Classable],

  const classes = this.getClasses('chamel-table-rows');

  return (
    <div className={classes}>
        {this._getChildren()}
    </div>
  );

  _getChildren = () => {
    let children = [],
      rowItem,
      itemComponent

    for (let i=0; i < this.props.rowItems.length; i++) {
      rowItem = this.props.rowItems[i];

      /*
       for(var prop in rowItem) {
       if(rowItem.hasOwnProperty(prop)) {
       console.log(prop);
       }
       }
       console.log("--");
       */

      itemComponent = (
        <TableRowsItem />
      );

      children.push(itemComponent);
    }

    return children;
  };

});

TableRow.propTypes = {
  rowItems: PropTypes.array.isRequired
};

// Check for commonjs
if (module) {
  module.exports = TableRow;
}

export default TableRow;
