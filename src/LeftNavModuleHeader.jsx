/**
 * Header view for the left nav when loaded from a module
 *
 * @jsx React.DOM
 */
'use strict';
var React = require('react');
var Classable = require("./mixins/classable.jsx");
var Paper = require("./Paper.jsx");
var Menu = require("./menu/Menu.jsx");

/**
 * Module shell
 */
var LeftNavModuleHeader = React.createClass({

    mixins: [Classable],

    getInitialState: function() {
        return {
            open: false,
            selectedIndex: 0,
        };
    },

    getDefaultProps: function() {
        return {
            moduleTitle: "Untitled Module"
        };
    },

    componentDidMount: function() {

        /*
        netric.module.loader.get("messages", function(mdl){
            this.setState({name: mdl.name});
        }.bind(this));
        */

    },

    render: function() {

        var headerTitle = this.props.title;

        var menuClass = this.getClasses('left-nav-header-menu', { 
          'is-closed': (this.state.open) ? false : true
        });

        var headerIcon = null;
        if (this.props.deviceIsSmall) {
            if (this.state.open) {
                headerTitle = "Modules";
            } else {
                headerIcon = <i className="fa fa-chevron-left" />;
            }
        } 
        
        // TODO: make this dynamic
        var menuItems = [];
        for (var i in this.props.modules) {
            var module = this.props.modules[i];
            menuItems.push({
                text: module.title,
                moduleName: module.name,
                iconClassName: "fa fa-" + module.icon
            });
        }

        // Get the current selected index
        var selectedIndex = null;
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].moduleName == this.props.moduleName) {
                selectedIndex = i;
            }
        }

        return (
            <div className="left-nav-header">
                <h2 onClick={this._handleMenuClick}>
                    {headerIcon}{headerTitle} 
                </h2>
                <div className={menuClass}>
                    <Menu 
                        ref="menuItems"
                        zDepth={0}
                        menuItems={menuItems}
                        selectedIndex={selectedIndex}
                        onItemClick={this._handleModuleClick} />
                </div>
            </div>
        );
    },

    _handleMenuClick:function(evt) {

        if (this.props.deviceIsSmall) {
            this.setState({ open: (this.state.open) ? false : true });
        }
    },

    _handleModuleClick:function(e, key, payload) {

        // If we clicked on the curent module again, then just close this menu
        if (this.props.moduleName === payload.moduleName) {
            this.setState({ open: false });
        } else if (this.props.onModuleChange) {
            this.props.onModuleChange(e, payload.moduleName);
            //console.log("Go to module:" + payload.moduleName);
        }
    }

});

module.exports = LeftNavModuleHeader;
