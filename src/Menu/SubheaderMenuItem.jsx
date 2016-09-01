import React from 'react';

var SubheaderMenuItem = React.createClass({
    
    propTypes: {
        index: React.PropTypes.number.isRequired,
        text: React.PropTypes.string.isRequired
    },
    
    render: function() {
        return (
            <div key={this.props.index} className="chamel-subheader">{this.props.text}</div>
        );
    }
    
});

module.exports = SubheaderMenuItem;