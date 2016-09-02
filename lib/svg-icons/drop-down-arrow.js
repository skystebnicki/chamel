'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _svgIcon = require('./svg-icon');

var _svgIcon2 = _interopRequireDefault(_svgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropDownArrow = _react2.default.createClass({
  displayName: 'DropDownArrow',


  render: function render() {
    return _react2.default.createElement(
      _svgIcon2.default,
      this.props,
      _react2.default.createElement('polygon', { points: '7,9.5 12,14.5 17,9.5 ' })
    );
  }

});

module.exports = DropDownArrow;