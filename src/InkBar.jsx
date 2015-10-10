/**
 * The ink bar is a thin bar that floats below tabs to indicate which is active
 *
 * @jsx React.DOM
 */
var React = require('react');

/**
 * Small application component
 */
var InkBar = React.createClass({

    propTypes: {
        position: React.PropTypes.string
    },

    render: function() {

        var styles = {
            left: this.props.left,
            width: this.props.width
        }

        return (
            <div className='chamel-ink-bar' style={styles}>
            &nbsp;
            </div>
        );
    }
});

module.exports = InkBar;