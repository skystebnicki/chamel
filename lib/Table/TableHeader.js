'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHeader = _react2.default.createClass({
    displayName: 'TableHeader',


    mixins: [_classable2.default],

    propTypes: {
        headerItems: _react2.default.PropTypes.array.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {};
    },

    render: function render() {
        var classes = this.getClasses('chamel-table-header');

        return _react2.default.createElement(
            'div',
            { className: classes },
            this._getChildren(),
            _react2.default.createElement(
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

            itemComponent = _react2.default.createElement(
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