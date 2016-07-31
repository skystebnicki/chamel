'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Classable = require('../mixins/classable');

var LinkMenuItem = React.createClass({
    displayName: 'LinkMenuItem',


    mixins: [Classable],

    propTypes: {
        index: React.PropTypes.number.isRequired,
        payload: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        target: React.PropTypes.string,
        disabled: React.PropTypes.bool
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

        return React.createElement(
            'a',
            _extends({ key: this.props.index, className: classes }, link, { target: this.props.target, onClick: onClickHandler }),
            this.props.text
        );
    },

    _stopLink: function _stopLink(event) {
        event.preventDefault();
    }
});