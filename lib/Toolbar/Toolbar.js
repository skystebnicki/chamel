"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _FontIcon = require("../FontIcon/FontIcon");

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _ToolbarGroup = require("../Toolbar/ToolbarGroup");

var _ToolbarGroup2 = _interopRequireDefault(_ToolbarGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This variable will hold all the icons to be displayed in the toolbar
 *
 * If we are in mobile mode display, then we will evaluate the icon's width
 *  to determine how many icons will fit in the current toolbar.
 * Arrow navigation icons will be displayed if we have more icons to display
 *
 * @type {Array}
 */
var toolbarIcons = [];

/**
 * Main popover class handles absolute positioning paper relative to an element
 */

var Toolbar = function (_React$Component) {
    _inherits(Toolbar, _React$Component);

    /**
     * Class constructor
     *
     * @param {Object} props Properties to send to the render function
     */
    function Toolbar(props) {
        _classCallCheck(this, Toolbar);

        var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));
        // Call paprent constructor


        _this.state = {
            /**
             * The width of the toolbar icons container
             *
             * This will determine if the icons to be displayed will fit in the toolbar
             */
            chamelToolbarWidth: 0,

            /**
             * The starting index of the icon that we are going to display
             *
             * This will be used if we are displaying the arrow navigation keys in the toolbar
             */
            startIconIndex: 0
        };
        return _this;
    }

    /**
     * Set accepted properties
     */


    /**
     * An alternate theme may be passed down by a provider
     */


    _createClass(Toolbar, [{
        key: "componentDidMount",
        value: function componentDidMount() {

            // Get the offsetWidth of the main container for the toolbar icons
            var container = _reactDom2.default.findDOMNode(this.refs.chamelToolbar);

            this.setState({
                chamelToolbarWidth: container.offsetWidth
            });
        }
    }, {
        key: "componentWillUpdate",
        value: function componentWillUpdate() {

            /*
             * If the toolbarIcons length is 0, then we will get the toolbar icons from _getToolbarIcons()
             *
             * We need to get the icons here (componentWillUpdate)
             *  because the icons should be rendered first before we can get the icons (html nodes)
             */
            if (toolbarIcons.length == 0) {
                var level = 0;
                var container = _reactDom2.default.findDOMNode(this.refs.chamelToolbar);

                // Get the toolbar icons
                this._getToolbarIcons(this.props.children, container, level);
            }
        }
    }, {
        key: "render",
        value: function render() {
            // Determine which theme to use
            var theme = this.context.chamelTheme && this.context.chamelTheme.toolbar ? this.context.chamelTheme.toolbar : {};

            /*
             * This will contain the total icons width to be displayed in the toolbar
             * And will be evaluated later to determine if we will display the arrow navigation keys
             */
            var totalIconsWidth = 0;

            // Let's calculate the total toolbar icons width, so we can evaluate if we need to display the arrow buttons
            toolbarIcons.map(function (icon) {
                totalIconsWidth += icon.width;
            });

            var classes = theme.toolbar;
            if (this.props.secondary) {
                classes += " " + theme.toolbarSecondary;
            }

            /*
             * Check if we should try to dynamically resize the toolbar
             */
            if (toolbarIcons.length != 0 && totalIconsWidth > this.state.chamelToolbarWidth) {

                /*
                 * If the width of the totalIcons is greater than our toolbarWidth
                 * then we need to evaluate how many icons should be displayed
                 *
                 * We will also display here the arrow navigation keys to browse the toolbars that are not displayed
                 */
                var displayArrowLeft = null,
                    displayArrowRight = null,
                    totalDisplayIconWidth = 0,
                    displayIcons = [],
                    idx = this.state.startIconIndex;

                // Loop thru the toolbarIcons and evaluate how many icons will fit in the current toolbar's width
                for (var i = 1; i <= toolbarIcons.length; i++, idx++) {
                    // Make sure that we will only evaluate if we have a toolbar icon
                    if (toolbarIcons[idx]) {
                        // Calculate the width of the total icons displayed
                        totalDisplayIconWidth += toolbarIcons[idx].width;

                        /*
                         * If the width of the total icons displayed reaches the limit (chamelToolbarWidth)
                         * Then we will break this for loop and will not add more toolbar icons to displayIcons
                         *
                         * We need to minus the toolbarWidth with 96 to accommodate the arrow navigation buttons
                         */
                        if (totalDisplayIconWidth > this.state.chamelToolbarWidth - 96) {
                            break;
                        }

                        /*
                         * The number of icons to be displayed are limited because we need to make sure that
                         *  they will fit in the toolbar main container's width
                         */
                        displayIcons.push(toolbarIcons[idx].icon);
                    }
                }

                // This will determine if we need to display the left arrow icon
                if (this.state.startIconIndex > 0) {
                    displayArrowLeft = _react2.default.createElement(
                        "div",
                        { className: "chamel-toolbar-left-arrow" },
                        _react2.default.createElement(_FontIcon2.default, { onClick: this._handleArrowClick.bind(this, -1),
                            className: "cfi cfi-chevron-left" })
                    );
                }

                // This will determine if we need to display the right arrow icon
                if (this.state.startIconIndex + displayIcons.length < toolbarIcons.length) {
                    displayArrowRight = _react2.default.createElement(
                        "div",
                        { className: "chamel-toolbar-right-arrow" },
                        _react2.default.createElement(_FontIcon2.default, { onClick: this._handleArrowClick.bind(this, 1),
                            className: "cfi cfi-chevron-right" })
                    );
                }

                // Modify the toolbar main container's style so we can properly display the toolbar icons
                var iconContainerStyle = {
                    float: 'left',
                    display: 'inline-width'
                };

                return _react2.default.createElement(
                    "div",
                    { ref: "chamelToolbar", className: classes },
                    displayArrowLeft,
                    _react2.default.createElement(
                        "div",
                        { ref: "chamelToolbar", className: "chamel-toolbar-group", style: iconContainerStyle },
                        displayIcons
                    ),
                    displayArrowRight
                );
            } else {

                // If the toolbar main container is wide enough to display all the icons, then just display the props.children
                return _react2.default.createElement(
                    "div",
                    { ref: "chamelToolbar", className: classes },
                    this.props.children
                );
            }
        }

        /**
         * Callback used to handle the clicking of the navigation arrow icons
         *
         * @param {int} value The number that will be used to modify the div's left value (negative value = left key; positive value = right key)
         * @private
         */

    }, {
        key: "_handleArrowClick",
        value: function _handleArrowClick(value) {

            // Update the startIconIndex
            var startIconIndex = this.state.startIconIndex + value;
            this.setState({ startIconIndex: startIconIndex });
        }

        /**
         * Function that will get the icon's width
         *
         * @param {DOMNode} element The icon element that we want to get the width
         * @returns {int} The icon's width
         * @private
         */

    }, {
        key: "_getIconWidth",
        value: function _getIconWidth(element) {
            var style = element.currentStyle || window.getComputedStyle(element);

            var width = parseInt(style.width, 10) + parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10) + parseInt(style.paddingLeft, 10) + parseInt(style.paddingRight, 10);

            if (width == 0 || isNaN(width)) {
                width = element.offsetWidth;
            }

            return width;
        }

        /**
         * Function that will get all the toolbar icons
         *
         * @param {React.Children} children The children of the react component that contains the possible toolbar icons
         * @param {DOMNode} elementContainer The parent node of the elemeent
         * @param {int} level Determine how deep we have checked to look for toolbar icons
         * @private
         */

    }, {
        key: "_getToolbarIcons",
        value: function _getToolbarIcons(children, elementContainer, level) {

            // Limitation: Currently, we can handle 1 level deep (which is the <ToolbarGroup> as the element container)
            if (level > 1) {

                // TODO: If level 2 or more, then we need to be able to check if the child element is an icon or not
                return;
            }

            for (var idx in children) {
                var child = children[idx];
                var element = elementContainer.childNodes[idx];

                // If we do not have an element, then we do not need to continue
                if (!element) {
                    continue;
                }

                // If the current element is a div and has child nodes, then we will assume that it contains toolbar icons
                if (element.nodeType && element.tagName.toLowerCase() === 'div' && child.props.children) {
                    this._getToolbarIcons(child.props.children, element, level + 1);
                } else if (element.nodeType) {

                    toolbarIcons.push({
                        icon: child,
                        width: this._getIconWidth(element)
                    });
                }
            }
        }
    }]);

    return Toolbar;
}(_react2.default.Component);

Toolbar.propTypes = {
    /**
     * If this is a secondary menu then it might be used inline in the document
     */
    secondary: _react2.default.PropTypes.bool
};
Toolbar.contextTypes = {
    chamelTheme: _react2.default.PropTypes.object
};
exports.default = Toolbar;
module.exports = exports['default'];