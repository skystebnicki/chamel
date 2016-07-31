"use strict";

var React = require('react');

var SubheaderMenuItem = React.createClass({
    displayName: "SubheaderMenuItem",


    propTypes: {
        index: React.PropTypes.number.isRequired,
        text: React.PropTypes.string.isRequired
    },

    render: function render() {
        return React.createElement(
            "div",
            { key: this.props.index, className: "chamel-subheader" },
            this.props.text
        );
    }

});

module.exports = SubheaderMenuItem;