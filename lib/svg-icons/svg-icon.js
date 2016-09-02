'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvgIcon = _react2.default.createClass({
  displayName: 'SvgIcon',


  mixins: [_classable2.default],

  render: function render() {
    var classes = this.getClasses('chamel-svg-icon');

    return _react2.default.createElement(
      'svg',
      _extends({}, this.props, {
        className: classes,
        viewBox: '0 0 24 24' }),
      this.props.children
    );
  }

});

module.exports = SvgIcon;