'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableRowItem = _react2.default.createClass({
    displayName: 'TableRowItem',


    mixins: [_classable2.default],

    propTypes: {},

    getDefaultProps: function getDefaultProps() {
        return {};
    },

    render: function render() {
        var classes = this.getClasses('chamel-table-rows-item');

        return _react2.default.createElement(
            'div',
            { className: classes },
            '(TableRowItem)',
            _react2.default.createElement(
                'div',
                { className: 'chamel-table-rows-actions' },
                '(Actions)'
            )
        );
    }

});

module.exports = TableRowItem;