/**
 * Template for rendering tabs
 *
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

/**
 * Outer container for tabs
 */
var TabTemplate = React.createClass({
    render: function(){

        return (
            <div className='tab-template'>
                {this.props.children}
            </div>
        );
    }
});

module.exports = TabTemplate;