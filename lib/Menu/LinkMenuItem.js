'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkMenuItem = _react2.default.createClass({
    displayName: 'LinkMenuItem',


    mixins: [_classable2.default],

    propTypes: {
        index: _react2.default.PropTypes.number.isRequired,
        payload: _react2.default.PropTypes.string.isRequired,
        text: _react2.default.PropTypes.string.isRequired,
        target: _react2.default.PropTypes.string,
        disabled: _react2.default.PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            disabled: false
        };
    },

    render: function render() {
        var classes = this.getClasses('chamel-menu-item', {
            'chamel-is-disabled': this.props.disabled
        });
        var onClickHandler = this.props.disabled ? this._stopLink : undefined;
        // Prevent context menu 'Open In New Tab/Window'
        var linkAttribute = this.props.disabled ? 'data-href' : 'href';
        var link = {};
        link[linkAttribute] = this.props.payload;

        return _react2.default.createElement(
            'a',
            _extends({ key: this.props.index, className: classes }, link, { target: this.props.target, onClick: onClickHandler }),
            this.props.text
        );
    },

    _stopLink: function _stopLink(event) {
        event.preventDefault();
    }
});