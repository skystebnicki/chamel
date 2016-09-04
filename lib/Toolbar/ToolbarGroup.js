'use strict';

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToolbarGroup = _react2.default.createClass({
    displayName: 'ToolbarGroup',


    propTypes: {
        float: _react2.default.PropTypes.string
    },

    mixins: [_classable2.default],

    render: function render() {

        var classes = this.getClasses('chamel-toolbar-group', {
            'chamel-left': this.props.float === 'left',
            'chamel-right': this.props.float === 'right'
        });

        return _react2.default.createElement(
            'div',
            { className: classes },
            this.props.children
        );
    }

});

module.exports = ToolbarGroup;