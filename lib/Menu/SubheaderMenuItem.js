"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubheaderMenuItem = _react2.default.createClass({
    displayName: "SubheaderMenuItem",


    propTypes: {
        index: _react2.default.PropTypes.number.isRequired,
        text: _react2.default.PropTypes.string.isRequired
    },

    render: function render() {
        return _react2.default.createElement(
            "div",
            { key: this.props.index, className: "chamel-subheader" },
            this.props.text
        );
    }

});

module.exports = SubheaderMenuItem;