import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = (props) => {
  return (
    <div className="chamel-table-header">
      {this._getChildren()}
      <div className="chamel-table-header-pagify">
        (Pagify)
      </div>
    </div>
  );

  _getChildren = () => {
    let children = [],
      headerItem,
      itemComponent

    for (let i = 0; i < this.props.headerItems.length; i++) {
      headerItem = this.props.headerItems[i];

      itemComponent = (
        <div key={i} className="chamel-table-header-column">{headerItem.text}</div>
      );

      children.push(itemComponent);
    }

    return children;
  };

  getClasses = (initialClasses, additionalClassObj) => {
    let classString = '';

    //Initialize the classString with the classNames that were passed in
    if (this.props.className) classString += ' ' + this.props.className;

    //Add in initial classes
    if (typeof initialClasses === 'object') {
      classString += ' ' + classNames(initialClasses);
    } else {
      classString += ' ' + initialClasses;
    }

    //Add in additional classes
    if (additionalClassObj) classString += ' ' + classNames(additionalClassObj);

    //Convert the class string into an object and run it through the class set
    return classNames(this.getClassSet(classString));
  };

  getClassSet = (classString) => {
    let classObj = {};

    if (classString) {
      classString.split(' ').forEach(function (className) {
        if (className) classObj[className] = true;
      });
    }

    return classObj;
  };
}

TableHeader.propTypes = {
  headerItems: PropTypes.array.isRequired
};

export default TableHeader;
