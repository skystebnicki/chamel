'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

var _Paper = require('../Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _IconButton = require('../Button/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Dom = require('../utils/Dom');

var _Dom2 = _interopRequireDefault(_Dom);

var _Events = require('../utils/Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Main popover class handles absolute positioning paper relative to an element
 */
var AppBar = function (_React$Component) {
    _inherits(AppBar, _React$Component);

    /**
     * Class constructor
     *
     * @param {Object} props Properties to send to the render function
     */
    function AppBar(props) {
        _classCallCheck(this, AppBar);

        var _this = _possibleConstructorReturn(this, (AppBar.__proto__ || Object.getPrototypeOf(AppBar)).call(this, props));
        // Call paprent constructor


        _this._onWindowScroll = function (e) {

            // If the starting state was 0 then do nothing
            if (!_this.props.fixed) {
                return;
            }

            // Get the scroll offset of the window
            var windowOffset = _Dom2.default.scrollOffset();

            /*
             * If we have scrolled, then follow the scroll.
             * Because the left nav div is position:fixed, then we
             * can move all the way to 0 to be at the top no matter how
             * far down the page they scroll
             */
            var newTop = _this.state.startTopOffset - windowOffset.top;
            if (newTop < 0) {
                newTop = 0;
            }

            // Restore the original state if we are back in the viewport.
            if (windowOffset.top <= _this.state.startTopOffset) {
                newTop = -1; // Reset
            }

            // Set state
            _this.setState({ curTopOffset: newTop });
        };

        _this._addAppBarStyleToElements = function (element, theme) {

            // If this is not a react element, just return whatever we got
            if (!element.type) {
                return element;
            }

            // If an array, iterate over it for each element
            if (element.constructor === Array) {
                for (var i in element) {
                    // Apply any appBar custom styles to the elements
                    element[i] = _this._addAppBarStyleToElements(element[i], theme);
                }
                return element;
            } else {
                // Get existing className
                var className = element.props.className ? element.props.className : "";
                //let className = "";

                /*
                 * If the element is supported, then clone a new element and
                 * append appBar special class to the className
                 */
                switch (element.type.name) {
                    case 'IconButton':
                        return _react2.default.cloneElement(element, {
                            className: className + " " + theme.appBarIconButton
                        });
                    case 'Button':
                    default:
                        return _react2.default.cloneElement(element, {
                            className: className + " " + theme.button
                        });
                }
            }
        };

        _this.state = {
            startTopOffset: 0,
            startWidth: 0,
            curTopOffset: -1
        };
        return _this;
    }

    _createClass(AppBar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // If we are working with a device that supports status bar color, then set
            if (typeof cordova != "undefined" && typeof StatusBar != "undefined") {
                if (cordova.platformId == 'android') {
                    // StatusBar.backgroundColorByHexString("#fff");
                }
            }

            // Save the original top position of the menu
            if (this.props.fixed) {
                var offset = _Dom2.default.offset(_reactDom2.default.findDOMNode(this.refs.appBarInnerCon));
                this.setState({
                    startTopOffset: offset.top,
                    startWidth: offset.width,
                    startHeight: offset.height
                });

                // Now listen for window scroll events
                _Events2.default.on(window, 'scroll', this._onWindowScroll);
            }
        }
    }, {
        key: 'componentWillUnmout',
        value: function componentWillUnmout() {
            // Remove window scroll event
            if (this.props.fixed) {
                _Events2.default.off(window, 'scroll', this._onWindowScroll);
            }
        }
    }, {
        key: 'render',
        value: function render() {

            // Determine which theme to use
            var theme = this.context.chamelTheme && this.context.chamelTheme.appBar ? this.context.chamelTheme.appBar : _ChamelThemeService2.default.defaultTheme.appBar;

            var classes = theme.appBarOuter,
                title = void 0,
                menuElementLeft = void 0,
                menuElementRight = void 0;

            if (this.props.className) {
                classes += " " + this.props.className;
            }

            // Set the left elements
            if (this.props.iconElementLeft) {
                // Add any appBar custom styles to the icon
                var iconElementLeft = this._addAppBarStyleToElements(this.props.iconElementLeft, theme);

                menuElementLeft = _react2.default.createElement(
                    'div',
                    { className: theme.appBarLeft },
                    iconElementLeft
                );
            }

            // Set the right elements
            var rightElements = this.props.children ? this.props.children : this.props.iconElementRight ? this.props.iconElementRight : null;

            // If right elements exists, wrap in a toolbar
            if (rightElements) {
                // Add any appBar custom styles to the icon
                rightElements = this._addAppBarStyleToElements(rightElements, theme);

                menuElementRight = _react2.default.createElement(
                    'div',
                    { className: theme.appBarRight },
                    rightElements
                );
            }

            // Add title
            if (this.props.title) {
                // If the title is a string, wrap in an h1 tag.
                // If not, just use it as a node.
                title = toString.call(this.props.title) === '[object String]' ? _react2.default.createElement(
                    'h1',
                    { className: theme.appBarTitle },
                    this.props.title
                ) : this.props.title;
            }

            // Get the zDepth passed - we may increment if we are floating
            var zDepth = this.props.zDepth;

            // Handle offset when the document scrolls and the appbar is fixed
            var innerConStyle = null;
            var outerConStyle = null;
            if (this.props.fixed && this.state.curTopOffset !== -1) {
                innerConStyle = {
                    top: this.state.curTopOffset + "px",
                    width: this.state.startWidth + "px",
                    position: "fixed"
                };

                /*
                 * Set the outer con style since a fixed element will cause it to shrink
                 * which makes the UX pretty bad when elements suddenly jump
                 */
                outerConStyle = { height: this.state.startHeight + "px" };

                // Increment zDepth to indicate floating
                zDepth++;
            }

            return _react2.default.createElement(
                'div',
                { style: outerConStyle },
                _react2.default.createElement(
                    'div',
                    { style: innerConStyle },
                    _react2.default.createElement(
                        _Paper2.default,
                        { ref: 'appBarInnerCon', rounded: false, className: classes, zDepth: zDepth },
                        menuElementLeft,
                        menuElementRight,
                        title,
                        _react2.default.createElement('div', { className: theme.appBarClear })
                    )
                )
            );
        }

        /**
         * Handle when the document is scrolled while the
         * The starting top of this menu was not 0 so it means
         * the menu is a fixed position and docked. A menu can be docked
         * below the top of the page (like below an AppBar) so we
         * want to be able to reposition the leftnav when the user scrolls
         * so it scrolls with the document until 0 (top)
         */


        /**
         * Add appBar specific styles to elements
         *
         * @param {ReactElement} element
         * @param {Object} theme
         * @private
         * @return {ReactElement} Cloned element plus appbar style
         */

    }]);

    return AppBar;
}(_react2.default.Component);

/**
 * Set accepted properties
 */


AppBar.propTypes = {
    onNavBtnClick: _react2.default.PropTypes.func,
    className: _react2.default.PropTypes.string,
    iconElementLeft: _react2.default.PropTypes.element,
    iconElementRight: _react2.default.PropTypes.element,
    title: _react2.default.PropTypes.node,
    zDepth: _react2.default.PropTypes.number,
    fixed: _react2.default.PropTypes.bool
};

/**
 * Set property defaults
 */
AppBar.defaultProps = {
    title: '',
    zDepth: 1,
    fixed: true
};

/**
 * An alternate theme may be passed down by a provider
 */
AppBar.contextTypes = {
    chamelTheme: _react2.default.PropTypes.object
};

// Check for commonjs
if (module) {
    module.exports = AppBar;
}

exports.default = AppBar;
module.exports = exports['default'];