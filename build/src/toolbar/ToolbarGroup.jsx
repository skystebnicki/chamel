var Classable = require('../mixins/classable.jsx');
var React = require('react');

var ToolbarGroup = React.createClass({

    propTypes: {
        float: React.PropTypes.string
    },

    mixins: [Classable],

    render: function() {

        var classes = this.getClasses('chamel-toolbar-group', {
            'chamel-left': this.props.float === 'left',
            'chamel-right': this.props.float === 'right'
        });

        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }

});

module.exports = ToolbarGroup;
