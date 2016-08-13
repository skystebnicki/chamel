var React = require('react'),
    Classable = require('../mixins/classable');

var TableRowItem = React.createClass({

    mixins: [Classable],

    propTypes: {
    },

    getDefaultProps: function() {
        return {
        };
    },

    render: function() {
        var classes = this.getClasses('chamel-table-rows-item');

        return (
            <div className={classes}>
                (TableRowItem)
                <div className="chamel-table-rows-actions">
                    (Actions)
                </div>
            </div>
        );
    }

});

module.exports = TableRowItem;
