'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHeader = function TableHeader(props) {

  var children = [],
      headerItem = void 0,
      itemComponent = void 0;

  for (var i = 0; i < props.headerItems.length; i++) {
    headerItem = props.headerItems[i];

    itemComponent = _react2.default.createElement(
      'div',
      { key: i, className: 'chamel-table-header-column' },
      headerItem.text
    );

    children.push(itemComponent);
  }

  return _react2.default.createElement(
    'div',
    { className: 'chamel-table-header' },
    children,
    _react2.default.createElement(
      'div',
      { className: 'chamel-table-header-pagify' },
      '(Pagify)'
    )
  );
};

TableHeader.propTypes = {
  headerItems: _propTypes2.default.array.isRequired
};

exports.default = TableHeader;
module.exports = exports['default'];