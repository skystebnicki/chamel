import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = (props) => {

  let children = [],
    headerItem,
    itemComponent

  for (let i = 0; i < props.headerItems.length; i++) {
    headerItem = props.headerItems[i];

    itemComponent = (
      <div key={i} className="chamel-table-header-column">{headerItem.text}</div>
    );

    children.push(itemComponent);
  }

  return (
    <div className="chamel-table-header">
      {children}
      <div className="chamel-table-header-pagify">
        (Pagify)
      </div>
    </div>
  );
}

TableHeader.propTypes = {
  headerItems: PropTypes.array.isRequired
};

export default TableHeader;
