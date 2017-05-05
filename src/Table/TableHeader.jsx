import React from 'react';
import PropTypes from 'prop-types';
import Classable from '../mixins/classable';

const TableHeader = (props) => {

    // mixins: [Classable],

    render() {
      var classes = this.getClasses('chamel-table-header');

      return (
        <div className={classes}>
          {this._getChildren()}
          <div className="chamel-table-header-pagify">
            (Pagify)
          </div>
        </div>
      );
    }

    _getChildren = () => {
      let children = [],
        headerItem,
        itemComponent

      for (let i=0; i < this.props.headerItems.length; i++) {
        headerItem = this.props.headerItems[i];

        itemComponent = (
          <div key={i} className="chamel-table-header-column">{headerItem.text}</div>
        );

        children.push(itemComponent);
      }

      return children;
    }

}

TableHeader.propTypes = {
    headerItems: PropTypes.array.isRequired
};

export default TableHeader;
