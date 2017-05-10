'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TableRowsItem = require('./TableRowsItem');

var _TableRowsItem2 = _interopRequireDefault(_TableRowsItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableRow = function TableRow(props) {
  var children = [],
      rowItem = void 0,
      itemComponent = void 0;

  for (var i = 0; i < props.rowItems.length; i++) {
    rowItem = props.rowItems[i];

    itemComponent = _react2.default.createElement(_TableRowsItem2.default, null);

    children.push(itemComponent);
  }

  return _react2.default.createElement(
    'div',
    { className: 'chamel-table-rows' },
    children
  );
};

TableRow.propTypes = {
  rowItems: _propTypes2.default.array.isRequired
};

exports.default = TableRow;
module.exports = exports['default'];