import React from 'react';
import ReactDOM from 'react-dom';
import CssEvent from '../utils/CssEvent';
import Dom from '../utils/Dom';
import KeyLine from '../utils/KeyLine';
import Classable from '../mixins/classable';
import ClickAwayable from '../mixins/ClickAwayable';
import Paper from '../Paper';
import Menu from './Menu';
import MenuItem from './MenuItem';
import LinkMenuItem from './LinkMenuItem';
import SubheaderMenuItem from './SubheaderMenuItem';

/***********************
 * Nested Menu Component
 ***********************/
var NestedMenuItem = React.createClass({

    mixins: [Classable, ClickAwayable],

    propTypes: {
        index: React.PropTypes.number,
        text: React.PropTypes.string,
        menuItems: React.PropTypes.array,
        zDepth: React.PropTypes.number,
        disabled: React.PropTypes.bool,
        onItemClick: React.PropTypes.func,
        onItemTap: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            disabled: false,
            zDepth: 1,
            index: -1
        };
    },

    getInitialState: function () {
        return {open: false}
    },

    componentClickAway: function () {
        this._closeNestedMenu();
    },

    componentDidMount: function () {
        this._positionNestedMenu();
    },

    componentDidUpdate: function (prevProps, prevState) {
        this._positionNestedMenu();
    },

    render: function () {
        var classes = this.getClasses('chamel-nested-menu-item', {
            'chamel-open': this.state.open,
            'chamel-is-disabled': this.props.disabled
        });

        return (
            <div className={classes} onMouseEnter={this._openNestedMenu} onMouseLeave={this._closeNestedMenu}>
                <MenuItem index={this.props.index} disabled={this.props.disabled}
                          iconRightClassName="chamel-icon-custom-arrow-drop-right" onClick={this._onParentItemClick}>
                    {this.props.text}
                </MenuItem>
                <Menu
                    ref="nestedMenu"
                    menuItems={this.props.menuItems}
                    onItemClick={this._onMenuItemClick}
                    onItemTap={this._onMenuItemTap}
                    hideable={true}
                    visible={this.state.open}
                    zDepth={this.props.zDepth + 1}
                >
                    {this.props.children}
                </Menu>
            </div>
        );
    },

    _positionNestedMenu: function () {
        var el = ReactDOM.findDOMNode(this),
            nestedMenu = ReactDOM.findDOMNode(this.refs.nestedMenu);

        nestedMenu.style.left = el.offsetWidth + 'px';
    },

    _openNestedMenu: function () {
        if (!this.props.disabled) this.setState({open: true});
    },

    _closeNestedMenu: function () {
        this.setState({open: false});
    },

    _toggleNestedMenu: function () {
        if (!this.props.disabled) this.setState({open: !this.state.open});
    },

    _onParentItemClick: function () {
        this._toggleNestedMenu();
    },

    _onMenuItemClick: function (e, index, menuItem) {
        if (this.props.onItemClick) this.props.onItemClick(e, index, menuItem);
        this._closeNestedMenu();
    },

    _onMenuItemTap: function (e, index, menuItem) {
        if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
        this._closeNestedMenu();
    }

});

module.exports = NestedMenuItem;
