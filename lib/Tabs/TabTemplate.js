'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Outer container for tabs
 */
var TabTemplate = _react2.default.createClass({
    displayName: 'TabTemplate',

    render: function render() {

        return _react2.default.createElement(
            'div',
            { className: 'chamel-tab-template' },
            this.props.children
        );
    }
}); /**
     * Template for rendering tabs
     *
     */


module.exports = TabTemplate;