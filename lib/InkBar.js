'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Small application component
 */
var InkBar = _react2.default.createClass({
    displayName: 'InkBar',


    propTypes: {
        position: _react2.default.PropTypes.string
    },

    render: function render() {

        var styles = {
            left: this.props.left,
            width: this.props.width
        };

        return _react2.default.createElement(
            'div',
            { className: 'chamel-ink-bar', style: styles },
            ' '
        );
    }
});

// Check for commonjs
/**
 * The ink bar is a thin bar that floats below tabs to indicate which is active
 *
 */
if (module) {
    module.exports = InkBar;
}

exports.default = InkBar;
module.exports = exports['default'];