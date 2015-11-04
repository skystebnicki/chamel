/**
 * Tabs component
 *
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var InkBar = require("../InkBar.jsx");
var TabTemplate = require("./TabTemplate.jsx");

/**
 * Outer container for tabs
 */
var Tabs = React.createClass({

    propTypes: {
        initialSelectedIndex: React.PropTypes.number,
        onActive: React.PropTypes.func,
        tabWidth: React.PropTypes.number
    },

    getInitialState: function(){
        var selectedIndex = 0;
        if (this.props.initialSelectedIndex && this.props.initialSelectedIndex < this.props.children.length) {
            selectedIndex = this.props.initialSelectedIndex;
        }
        return {
            selectedIndex: selectedIndex
        };
    },

    getEvenWidth: function(){
        return (
            parseInt(window
                .getComputedStyle(ReactDOM.findDOMNode(this))
                .getPropertyValue('width'), 10)
        );
    },

    componentDidMount: function(){
        if(this.props.tabWidth) {
            if(!(this.props.children.length * this.props.tabWidth > this.getEvenWidth())){
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
    handleTouchTap: function(tabIndex, tab){
        if (this.props.onChange && this.state.selectedIndex !== tabIndex) {
            this.props.onChange(tabIndex, tab);
        }

        this.setState({selectedIndex: tabIndex});
        //default CB is _onActive. Can be updated in tab.jsx
        if(tab.props.onActive) tab.props.onActive(tab);
    },

    render: function(){

        var _this = this;
        var width = this.state.fixed ?
        this.state.width/this.props.children.length :
            this.props.tabWidth;
        var left = width * this.state.selectedIndex || 0;
        var currentTemplate;
        var tabs = React.Children.map(this.props.children, function(tab, index){
            if(tab.type.displayName === "UiXmlElement"){

                /*
                 * Entity form implementation is a bit more complex because the FormBuilder
                 * element will not contain any children until render is called so there
                 * are no children to print. The netric.entity.form.Tab checks props for
                 * renderChildren to decide if it will render the ui.tabs.Tab (which does not 
                 * render children) or just render children directly.
                 */
                if(_this.state.selectedIndex === index) {
                    currentTemplate = tab;
                    currentTemplate.props.renderChildren = true;
                }

                return React.cloneElement(tab, {
                    key: index,
                    selected: _this.state.selectedIndex === index,
                    tabIndex: index,
                    width: width,
                    renderChildren: false,
                    handleTouchTap: _this.handleTouchTap
                });
                
            } else if(tab.type.displayName === "Tab"){
                // Generic UI implementation
                if(_this.state.selectedIndex === index) currentTemplate = tab.props.children;
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

        return (
            <div className="chamel-tabs-container">
                <div className="chamel-tab-item-container">
                    {tabs}
                </div>
                <InkBar left={left} width={width}/>
                <TabTemplate>
                    {currentTemplate}
                </TabTemplate>
            </div>
        )
    }
});

module.exports = Tabs;
