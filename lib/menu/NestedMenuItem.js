'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var CssEvent = require('../utils/CssEvent');
var Dom = require('../utils/Dom');
var KeyLine = require('../utils/KeyLine');
var Classable = require('../mixins/classable');
var ClickAwayable = require('../mixins/ClickAwayable');
var Paper = require('../Paper');
var Menu = require('./Menu');
var MenuItem = require('./MenuItem');
var LinkMenuItem = require('./LinkMenuItem');
var SubheaderMenuItem = require('./SubheaderMenuItem');

/***********************
 * Nested Menu Component
 ***********************/
var NestedMenuItem = React.createClass({
    displayName: 'NestedMenuItem',


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

    getDefaultProps: function getDefaultProps() {
        return {
            disabled: false,
            zDepth: 1,
            index: -1
        };
    },

    getInitialState: function getInitialState() {
        return { open: false };
    },

    componentClickAway: function componentClickAway() {
        this._closeNestedMenu();
    },

    componentDidMount: function componentDidMount() {
        this._positionNestedMenu();
    },

    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        this._positionNestedMenu();
    },

    render: function render() {
        var classes = this.getClasses('chamel-nested-menu-item', {
            'chamel-open': this.state.open,
            'chamel-is-disabled': this.props.disabled
        });

        return React.createElement(
            'div',
            { className: classes, onMouseEnter: this._openNestedMenu, onMouseLeave: this._closeNestedMenu },
            React.createElement(
                MenuItem,
                { index: this.props.index, disabled: this.props.disabled,
                    iconRightClassName: 'chamel-icon-custom-arrow-drop-right', onClick: this._onParentItemClick },
                this.props.text
            ),
            React.createElement(
                Menu,
                {
                    ref: 'nestedMenu',
                    menuItems: this.props.menuItems,
                    onItemClick: this._onMenuItemClick,
                    onItemTap: this._onMenuItemTap,
                    hideable: true,
                    visible: this.state.open,
                    zDepth: this.props.zDepth + 1
                },
                this.props.children
            )
        );
    },

    _positionNestedMenu: function _positionNestedMenu() {
        var el = ReactDOM.findDOMNode(this),
            nestedMenu = ReactDOM.findDOMNode(this.refs.nestedMenu);

        nestedMenu.style.left = el.offsetWidth + 'px';
    },

    _openNestedMenu: function _openNestedMenu() {
        if (!this.props.disabled) this.setState({ open: true });
    },

    _closeNestedMenu: function _closeNestedMenu() {
        this.setState({ open: false });
    },

    _toggleNestedMenu: function _toggleNestedMenu() {
        if (!this.props.disabled) this.setState({ open: !this.state.open });
    },

    _onParentItemClick: function _onParentItemClick() {
        this._toggleNestedMenu();
    },

    _onMenuItemClick: function _onMenuItemClick(e, index, menuItem) {
        if (this.props.onItemClick) this.props.onItemClick(e, index, menuItem);
        this._closeNestedMenu();
    },

    _onMenuItemTap: function _onMenuItemTap(e, index, menuItem) {
        if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
        this._closeNestedMenu();
    }

});

module.exports = NestedMenuItem;