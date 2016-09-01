import React from 'react';
import Classable from '../mixins/classable';
import FontIcon from '../FontIcon';
import Toggle from '../Toggle';

var Types = {
    LINK: 'LINK',
    SUBHEADER: 'SUBHEADER',
    NESTED: 'NESTED'
};

var MenuItem = React.createClass({

    mixins: [Classable],

    propTypes: {
        index: React.PropTypes.number,
        iconClassName: React.PropTypes.string,
        iconRightClassName: React.PropTypes.string,
        attribute: React.PropTypes.string,
        number: React.PropTypes.string,
        data: React.PropTypes.string,
        toggle: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        onClick: React.PropTypes.func,
        onToggle: React.PropTypes.func,
        selected: React.PropTypes.bool,
        indent: React.PropTypes.number
    },

    statics: {
        Types: Types
    },

    getDefaultProps: function () {
        return {
            toggle: false,
            disabled: false,
            index: -1
        };
    },

    render: function () {

        var classes = this.getClasses('chamel-menu-item', {
            'chamel-is-selected': this.props.selected,
            'chamel-is-focused': this.props.focused,
            'chamel-is-disabled': this.props.disabled
        });
        var icon;
        var data;
        var iconRight;
        var attribute;
        var number;
        var toggle;

        if (this.props.iconClassName) icon =
            <FontIcon className={'chamel-menu-item-icon ' + this.props.iconClassName}/>;
        if (this.props.iconRightClassName) iconRight =
            <FontIcon className={'chamel-menu-item-icon-right ' + this.props.iconRightClassName}/>;
        if (this.props.data) data = <span className="chamel-menu-item-data">{this.props.data}</span>;
        if (this.props.number !== undefined) number =
            <span className="chamel-menu-item-number">{this.props.number}</span>;
        if (this.props.attribute !== undefined) attribute =
            <span className="chamel-menu-item-attribute">{this.props.attribute}</span>;

        // Add indentations for hierarchical menus
        var numIndents = this.props.indent || 0;
        var indentItems = (numIndents) ? [] : null;
        for (var i = 0; i < numIndents; i++) {
            indentItems.push(
                <span className="chamel-menu-item-indent" key={i}>{" "}</span>
            );
        }

        if (this.props.toggle) {
            var {
                toggle,
                onClick,
                onToggle,
                children,
                label,
                ...other
                } = this.props;
            toggle = <Toggle {...other} onToggle={this._handleToggle}/>;
        }

        return (
            <div
                key={this.props.index}
                className={classes}
                onClick={this._handleOnClick}>

                {indentItems}
                {icon}
                {this.props.children}
                {data}
                {attribute}
                {number}
                {toggle}
                {iconRight}
            </div>
        );
    },

    _handleTouchTap: function (e) {
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick(e, this.props.index);
        } else if (!this.props.disabled && this.props.onClick) {
            this._handleOnClick(e);
        }
    },

    _handleOnClick: function (e) {
        if (!this.props.disabled && this.props.onClick) this.props.onClick(e, this.props.index);
    },

    _handleToggle: function (e, toggled) {
        if (!this.props.disabled && this.props.onToggle) this.props.onToggle(e, this.props.index, toggled);
    }

});

module.exports = MenuItem;
