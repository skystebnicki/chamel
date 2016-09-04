'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _LinkMenuItem = require('./LinkMenuItem');

var _LinkMenuItem2 = _interopRequireDefault(_LinkMenuItem);

var _SubheaderMenuItem = require('./SubheaderMenuItem');

var _SubheaderMenuItem2 = _interopRequireDefault(_SubheaderMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Menu = _react2.default.createClass({
    displayName: 'Menu',


    mixins: [_classable2.default],

    propTypes: {
        autoWidth: _react2.default.PropTypes.bool,
        onItemTap: _react2.default.PropTypes.func,
        onItemClick: _react2.default.PropTypes.func,
        onToggleClick: _react2.default.PropTypes.func,
        menuItems: _react2.default.PropTypes.array,
        selectedIndex: _react2.default.PropTypes.number,
        hideable: _react2.default.PropTypes.bool,
        visible: _react2.default.PropTypes.bool,
        zDepth: _react2.default.PropTypes.number,

        /**
         * The index that is currently being focused.
         *
         * This is used when moving the list up/down using the keyboard instead of hovering using the mouse
         *
         * @param {int}
         */
        focusedIndex: _react2.default.PropTypes.number,

        /**
         * Custom classes that will be applied to the paper container
         *
         * @param {string}
         */
        classes: _react2.default.PropTypes.string
    },

    getInitialState: function getInitialState() {
        return {
            nestedMenuShown: false,
            focusedIndex: this.props.focusedIndex
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            focusedIndex: null,
            autoWidth: true,
            hideable: false,
            visible: true,
            zDepth: 1,
            menuItems: []
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({ focusedIndex: nextProps.focusedIndex });
    },

    componentDidMount: function componentDidMount() {
        var el = _reactDom2.default.findDOMNode(this);

        //Set the menu with
        this._setKeyWidth(el);

        //Save the initial menu height for later
        this._initialMenuHeight = el.offsetHeight + _KeyLine2.default.Desktop.GUTTER_LESS;

        //Show or Hide the menu according to visibility
        this._renderVisibility();
    },

    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {

        if (this.props.visible !== prevProps.visible) this._renderVisibility();
    },

    render: function render() {
        var classes = this.getClasses('chamel-menu', {
            'chamel-menu-hideable': this.props.hideable,
            'chamel-visible': this.props.visible
        });

        // If we have custom classes in the props, then let's include it
        if (this.props.classes) {
            classes += " " + this.props.classes;
        }

        var children = this.props.menuItems.length ? this._getChildren() : this.props.children;

        return _react2.default.createElement(
            _Paper2.default,
            { ref: 'paperContainer', onMouseEnter: this._handleMouseEnter, onMouseLeave: this._handleMouseLeave,
                zDepth: this.props.zDepth, className: classes },
            children
        );
    },

    /**
     * Callback used to handle the hovering of mouse into the menu list
     *
     * @private
     */
    _handleMouseEnter: function _handleMouseEnter() {
        this.setState({ focusedIndex: null });
    },

    _getChildren: function _getChildren() {
        var children = [],
            menuItem,
            itemComponent,
            isSelected,
            isDisabled,
            isFocused;

        //This array is used to keep track of all nested menu refs
        this._nestedChildren = [];

        for (var i = 0; i < this.props.menuItems.length; i++) {
            menuItem = this.props.menuItems[i];
            isSelected = i === this.props.selectedIndex;
            isDisabled = menuItem.disabled === undefined ? false : menuItem.disabled;

            if (this.state.focusedIndex == null) {
                isFocused = false;
            } else {
                isFocused = i === this.props.focusedIndex;
            }

            var _menuItem = menuItem;
            var icon = _menuItem.icon;
            var data = _menuItem.data;
            var attribute = _menuItem.attribute;
            var number = _menuItem.number;
            var toggle = _menuItem.toggle;
            var onClick = _menuItem.onClick;

            var other = _objectWithoutProperties(_menuItem, ['icon', 'data', 'attribute', 'number', 'toggle', 'onClick']);

            switch (menuItem.type) {

                case _MenuItem2.default.Types.LINK:
                    itemComponent = _react2.default.createElement(_LinkMenuItem2.default, {
                        key: i,
                        index: i,
                        payload: menuItem.payload,
                        target: menuItem.target,
                        text: menuItem.text,
                        disabled: isDisabled });
                    break;

                case _MenuItem2.default.Types.SUBHEADER:
                    itemComponent = _react2.default.createElement(_SubheaderMenuItem2.default, {
                        key: i,
                        index: i,
                        text: menuItem.text });
                    break;

                case _MenuItem2.default.Types.NESTED:
                    var NestedMenuItem = require("./NestedMenuItem");
                    itemComponent = _react2.default.createElement(NestedMenuItem, {
                        ref: i,
                        key: i,
                        index: i,
                        text: menuItem.text,
                        disabled: isDisabled,
                        menuItems: menuItem.items,
                        zDepth: this.props.zDepth,
                        onItemClick: this._onNestedItemClick,
                        onItemTap: this._onNestedItemClick });
                    this._nestedChildren.push(i);
                    break;

                default:
                    itemComponent = _react2.default.createElement(
                        _MenuItem2.default,
                        _extends({}, other, {
                            selected: isSelected,
                            focused: isFocused,
                            key: i,
                            index: i,
                            icon: menuItem.icon,
                            data: menuItem.data,
                            attribute: menuItem.attribute,
                            number: menuItem.number,
                            toggle: menuItem.toggle,
                            disabled: isDisabled,
                            onClick: this._onItemClick }),
                        menuItem.text
                    );
            }
            children.push(itemComponent);
        }

        return children;
    },

    _setKeyWidth: function _setKeyWidth(el) {
        var menuWidth = this.props.autoWidth ? _KeyLine2.default.getIncrementalDim(el.offsetWidth) + 'px' : '100%';

        //Update the menu width
        _Dom2.default.withoutTransition(el, function () {
            // Changed the below to use auto width because
            // it was causing text to extnd beyond the menu
            // if items were added after the fact.
            // - Sky Stebnicki
            // el.style.width = menuWidth;
            el.style.width = "auto";
        });
    },

    _renderVisibility: function _renderVisibility() {
        var el;

        if (this.props.hideable) {
            el = _reactDom2.default.findDOMNode(this);
            var innerContainer = _reactDom2.default.findDOMNode(this.refs.paperContainer.getInnerContainer());

            if (this.props.visible) {
                // Update the width
                this._setKeyWidth(el);

                //Open the menu
                /*
                 This was not dealing with added menu items well at all. Changed the height
                 to auto to fix the problems.
                 - Sky Stebnicki
                 */
                el.style.height = "auto"; //this._initialMenuHeight + 'px';

                //Set the overflow to visible after the animation is done so
                //that other nested menus can be shown
                _CssEvent2.default.onTransitionEnd(el, function () {
                    //Make sure the menu is open before setting the overflow.
                    //This is to accout for fast clicks
                    if (this.props.visible) innerContainer.style.overflow = 'visible';
                }.bind(this));
            } else {

                //Close the menu
                el.style.height = '0px';

                //Set the overflow to hidden so that animation works properly
                innerContainer.style.overflow = 'hidden';
            }
        }
    },

    _onNestedItemClick: function _onNestedItemClick(e, index, menuItem) {
        if (this.props.onItemClick) this.props.onItemClick(e, index, menuItem);
    },

    _onNestedItemTap: function _onNestedItemTap(e, index, menuItem) {
        if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
    },

    _onItemClick: function _onItemClick(e, index) {
        if (this.props.onItemClick) this.props.onItemClick(e, index, this.props.menuItems[index]);
    },

    _onItemTap: function _onItemTap(e, index) {
        if (this.props.onItemTap) this.props.onItemTap(e, index, this.props.menuItems[index]);
    },

    _onItemToggle: function _onItemToggle(e, index, toggled) {
        if (this.props.onItemToggle) this.props.onItemToggle(e, index, this.props.menuItems[index], toggled);
    }

});

module.exports = Menu;