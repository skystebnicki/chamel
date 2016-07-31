/**
 * Render a single tab
 *

 */
'use strict';

var React = require('react');

/**
 * Render a tab
 */
var Tab = React.createClass({
    displayName: 'Tab',


    propTypes: {
        handleTouchTap: React.PropTypes.func,
        selected: React.PropTypes.bool
    },

    handleTouchTap: function handleTouchTap() {
        this.props.handleTouchTap(this.props.tabIndex, this);
    },

    render: function render() {
        var styles = {
            width: this.props.width
        };

        var classes = "chamel-tab-item";
        if (this.props.selected) {
            classes += " chamel-tab-is-active";
        }

        return React.createElement(
            'div',
            {
                className: classes,
                style: styles,
                onClick: this.handleTouchTap,
                routeName: this.props.route
            },
            this.props.label
        );
    }
});

module.exports = Tab;