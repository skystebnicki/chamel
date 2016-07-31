'use strict';

var React = require('react'),
    Classable = require('../mixins/classable');

var TableHeader = React.createClass({
    displayName: 'TableHeader',


    mixins: [Classable],

    propTypes: {
        headerItems: React.PropTypes.array.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {};
    },

    render: function render() {
        var classes = this.getClasses('chamel-table-header');

        return React.createElement(
            'div',
            { className: classes },
            this._getChildren(),
            React.createElement(
                'div',
                { className: 'chamel-table-header-pagify' },
                '(Pagify)'
            )
        );
    },

    _getChildren: function _getChildren() {
        var children = [],
            headerItem,
            itemComponent;

        for (var i = 0; i < this.props.headerItems.length; i++) {
            headerItem = this.props.headerItems[i];

            itemComponent = React.createElement(
                'div',
                { key: i, className: 'chamel-table-header-column' },
                headerItem.text
            );

            children.push(itemComponent);
        }

        return children;
    }

});

module.exports = TableHeader;