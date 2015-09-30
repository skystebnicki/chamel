/**
 * Render a single tab
 *
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

/**
 * Render a tab
 */
var Tab = React.createClass({

    propTypes: {
        handleTouchTap: React.PropTypes.func,
        selected: React.PropTypes.bool
    },

    handleTouchTap: function(){
        this.props.handleTouchTap(this.props.tabIndex, this);
    },

    render: function(){
        var styles = {
            width: this.props.width
        };

        var classes = "tab-item";
        if (this.props.selected) {
            classes += " tab-is-active";
        }

        return (
            <div
                className={classes}
                style={styles}
                onClick={this.handleTouchTap}
                routeName={this.props.route}
            >
                {this.props.label}
            </div>
        );
    }
});

module.exports = Tab;
