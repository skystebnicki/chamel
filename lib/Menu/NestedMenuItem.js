'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CssEvent = require('../utils/CssEvent');

var _CssEvent2 = _interopRequireDefault(_CssEvent);

var _Dom = require('../utils/Dom');

var _Dom2 = _interopRequireDefault(_Dom);

var _KeyLine = require('../utils/KeyLine');

var _KeyLine2 = _interopRequireDefault(_KeyLine);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _ClickAwayable = require('../mixins/ClickAwayable');

var _ClickAwayable2 = _interopRequireDefault(_ClickAwayable);

var _Paper = require('../Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _LinkMenuItem = require('./LinkMenuItem');

var _LinkMenuItem2 = _interopRequireDefault(_LinkMenuItem);

var _SubheaderMenuItem = require('./SubheaderMenuItem');

var _SubheaderMenuItem2 = _interopRequireDefault(_SubheaderMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***********************
 * Nested Menu Component
 ***********************/
var NestedMenuItem = _react2.default.createClass({
    displayName: 'NestedMenuItem',


    mixins: [_classable2.default, _ClickAwayable2.default],

    propTypes: {
        index: _react2.default.PropTypes.number,
        text: _react2.default.PropTypes.string,
        menuItems: _react2.default.PropTypes.array,
        zDepth: _react2.default.PropTypes.number,
        disabled: _react2.default.PropTypes.bool,
        onItemClick: _react2.default.PropTypes.func,
        onItemTap: _react2.default.PropTypes.func
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

        return _react2.default.createElement(
            'div',
            { className: classes, onMouseEnter: this._openNestedMenu, onMouseLeave: this._closeNestedMenu },
            _react2.default.createElement(
                _MenuItem2.default,
                { index: this.props.index, disabled: this.props.disabled,
                    iconRightClassName: 'chamel-icon-custom-arrow-drop-right', onClick: this._onParentItemClick },
                this.props.text
            ),
            _react2.default.createElement(
                _Menu2.default,
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
        var el = _reactDom2.default.findDOMNode(this),
            nestedMenu = _reactDom2.default.findDOMNode(this.refs.nestedMenu);

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