'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _svgIcon = require('./svg-icon');

var _svgIcon2 = _interopRequireDefault(_svgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavigationChevronLeft = _react2.default.createClass({
  displayName: 'NavigationChevronLeft',


  render: function render() {
    return _react2.default.createElement(
      _svgIcon2.default,
      this.props,
      _react2.default.createElement('path', { d: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' })
    );
  }

});

module.exports = NavigationChevronLeft;