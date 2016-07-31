/**
 * Tabs component
 *

 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var InkBar = require("../InkBar");
var TabTemplate = require("./TabTemplate");

/**
 * Outer container for tabs
 */
var Tabs = React.createClass({
    displayName: 'Tabs',


    propTypes: {
        initialSelectedIndex: React.PropTypes.number,
        onActive: React.PropTypes.func,
        tabWidth: React.PropTypes.number
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
        return parseInt(window.getComputedStyle(ReactDOM.findDOMNode(this)).getPropertyValue('width'), 10);
    },

    getTabCount: function getTabCount() {
        return React.Children.count(this.props.children);
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
        var tabs = React.Children.map(this.props.children, function (tab, index) {
            if (tab.type.displayName === "Tab") {
                // Generic UI implementation
                if (_this.state.selectedIndex === index) currentTemplate = tab.props.children;
                return React.cloneElement(tab, {
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

        return React.createElement(
            'div',
            { className: 'chamel-tabs-container' },
            React.createElement(
                'div',
                { className: 'chamel-tab-item-container' },
                tabs
            ),
            React.createElement(InkBar, { left: left, width: width }),
            React.createElement(
                TabTemplate,
                null,
                currentTemplate
            )
        );
    }
});

module.exports = Tabs;