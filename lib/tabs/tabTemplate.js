/**
 * Template for rendering tabs
 *

 */
'use strict';

var React = require('react');

/**
 * Outer container for tabs
 */
var TabTemplate = React.createClass({
    displayName: 'TabTemplate',

    render: function render() {

        return React.createElement(
            'div',
            { className: 'chamel-tab-template' },
            this.props.children
        );
    }
});

module.exports = TabTemplate;