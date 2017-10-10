"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableRowItem = function TableRowItem(props) {

  return _react2.default.createElement(
    "div",
    { className: "chamel-table-rows-item" },
    "(TableRowItem)",
    _react2.default.createElement(
      "div",
      { className: "chamel-table-rows-actions" },
      "(Actions)"
    )
  );
};

exports.default = TableRowItem;
module.exports = exports["default"];