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
    render: function(){

        return (
            <div className='chamel-tab-template'>
                {this.props.children}
            </div>
        );
    }
});

module.exports = TabTemplate;