'use strict';

/**
 * The ink bar is a thin bar that floats below tabs to indicate which is active
 *

 */
var React = require('react');

/**
 * Small application component
 */
var InkBar = React.createClass({
    displayName: 'InkBar',


    propTypes: {
        position: React.PropTypes.string
    },

    render: function render() {

        var styles = {
            left: this.props.left,
            width: this.props.width
        };

        return React.createElement(
            'div',
            { className: 'chamel-ink-bar', style: styles },
            ' '
        );
    }
});

module.exports = InkBar;