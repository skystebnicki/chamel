"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Render a tab
 */
var Tab = _react2.default.createClass({
    displayName: "Tab",


    propTypes: {
        handleTouchTap: _react2.default.PropTypes.func,
        selected: _react2.default.PropTypes.bool
    },

    handleTouchTap: function handleTouchTap() {
        this.props.handleTouchTap(this.props.tabIndex, this);
    },

    render: function render() {
        var styles = {
            width: this.props.width
        };

        var classes = "chamel-tab-item";
        if (this.props.selected) {
            classes += " chamel-tab-is-active";
        }

        return _react2.default.createElement(
            "div",
            {
                className: classes,
                style: styles,
                onClick: this.handleTouchTap
            },
            this.props.label
        );
    }
}); /**
     * Render a single tab
     *
     */

module.exports = Tab;