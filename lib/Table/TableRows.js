'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _TableRowsItem = require('./TableRowsItem');

var _TableRowsItem2 = _interopRequireDefault(_TableRowsItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableRow = _react2.default.createClass({
    displayName: 'TableRow',


    mixins: [_classable2.default],

    propTypes: {
        rowItems: _react2.default.PropTypes.array.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {};
    },

    render: function render() {
        var classes = this.getClasses('chamel-table-rows');

        return _react2.default.createElement(
            'div',
            { className: classes },
            this._getChildren()
        );
    },

    _getChildren: function _getChildren() {
        var children = [],
            rowItem,
            itemComponent;

        for (var i = 0; i < this.props.rowItems.length; i++) {
            rowItem = this.props.rowItems[i];

            /*
             for(var prop in rowItem) {
             if(rowItem.hasOwnProperty(prop)) {
             console.log(prop);
             }
             }
             console.log("--");
             */

            itemComponent = _react2.default.createElement(_TableRowsItem2.default, null);

            children.push(itemComponent);
        }

        return children;
    }

});

module.exports = TableRow;