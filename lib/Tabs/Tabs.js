'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _InkBar = require('../InkBar');

var _InkBar2 = _interopRequireDefault(_InkBar);

var _TabTemplate = require('./TabTemplate');

var _TabTemplate2 = _interopRequireDefault(_TabTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Outer container for tabs
 */
/**
 * Tabs component
 *
 */
var Tabs = _react2.default.createClass({
    displayName: 'Tabs',


    propTypes: {
        initialSelectedIndex: _react2.default.PropTypes.number,
        onActive: _react2.default.PropTypes.func,
        tabWidth: _react2.default.PropTypes.number
    },

    getInitialState: function getInitialState() {
        var selectedIndex = 0;
        if (this.props.initialSelectedIndex && this.props.initialSelectedIndex < this.props.children.length) {
            selectedIndex = this.props.initialSelectedIndex;
        }
        return {
            selectedIndex: selectedIndex
        };
    },

    getEvenWidth: function getEvenWidth() {
        return parseInt(window.getComputedStyle(_reactDom2.default.findDOMNode(this)).getPropertyValue('width'), 10);
    },

    getTabCount: function getTabCount() {
        return _react2.default.Children.count(this.props.children);
    },

    componentDidMount: function componentDidMount() {
        if (this.props.tabWidth) {
            if (!(this.props.children.length * this.props.tabWidth > this.getEvenWidth())) {
                this.setState({
                    width: this.props.tabWidth,
                    fixed: false
                });
                return;
            }
        }

        this.setState({
            width: this.getEvenWidth(),
            fixed: true
        });
    },

    /**
     * Handle touch or click
     *
     * @param tabIndex
     * @param tab
     */
    handleTouchTap: function handleTouchTap(tabIndex, tab) {
        if (this.props.onChange && this.state.selectedIndex !== tabIndex) {
            this.props.onChange(tabIndex, tab);
        }

        this.setState({ selectedIndex: tabIndex });
        //default CB is _onActive. Can be updated in tab
        if (tab.props.onActive) tab.props.onActive(tab);
    },

    render: function render() {

        var _this = this;
        var width = 100 / this.getTabCount() + '%';
        /*
        var width = this.state.fixed ?
        this.state.width/this.props.children.length :
            this.props.tabWidth;*/
        var left = 'calc(' + width + '*' + this.state.selectedIndex + ')';
        //var left = width * this.state.selectedIndex || 0;
        var currentTemplate;
        var tabs = _react2.default.Children.map(this.props.children, function (tab, index) {
            if (tab.type.displayName === "Tab") {
                // Generic UI implementation
                if (_this.state.selectedIndex === index) currentTemplate = tab.props.children;
                return _react2.default.cloneElement(tab, {
                    key: index,
                    selected: _this.state.selectedIndex === index,
                    tabIndex: index,
                    width: width,
                    handleTouchTap: _this.handleTouchTap
                });
            } else {
                var type = tab.type.displayName || tab.type;
                throw "Tabs only accepts Tab Components as children. Found " + type + " as child number " + (index + 1) + " of Tabs";
            }
        });

        return _react2.default.createElement(
            'div',
            { className: 'chamel-tabs-container' },
            _react2.default.createElement(
                'div',
                { className: 'chamel-tab-item-container' },
                tabs
            ),
            _react2.default.createElement(_InkBar2.default, { left: left, width: width }),
            _react2.default.createElement(
                _TabTemplate2.default,
                null,
                currentTemplate
            )
        );
    }
});

// Check for commonjs
if (module) {
    module.exports = Tabs;
}

exports.default = Tabs;
module.exports = exports['default'];