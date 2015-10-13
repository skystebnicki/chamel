/**
 * Main application toolbar
 *
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Paper = require("./Paper.jsx");
var IconButton = require("./IconButton.jsx");

/**
 * Small application component
 */
var AppBar = React.createClass({

    propTypes: {
        onNavBtnClick: React.PropTypes.func,
        showMenuIconButton: React.PropTypes.bool,
        iconClassNameLeft: React.PropTypes.string,
        className: React.PropTypes.string,
        iconElementLeft: React.PropTypes.element,
        iconElementRight: React.PropTypes.element,
        title : React.PropTypes.node,
        zDepth: React.PropTypes.number,
    },

    getDefaultProps: function() {
        return {
            showMenuIconButton: true,
            title: '',
            iconClassNameLeft: 'fa fa-bars',
            zDepth: 1
        }
    },

    componentDidMount: function() {
        // If we are working with a device that supports status bar color, then set
        if (typeof cordova != "undefined" && typeof StatusBar != "undefined") {
            if (cordova.platformId == 'android') {
               // StatusBar.backgroundColorByHexString("#fff");
            }
        }
    },

	render: function() {

		// Set the back/menu button
		if (this.props.onNavBtnClick || this.props.iconElementLeft) {

            if (this.props.iconElementLeft) {
                menuElementLeft = (
                    <div className="chamel-app-bar-navigation-icon-button">
                        {this.props.iconElementLeft} 
                    </div>
                );
            } else {
                var child = (this.props.iconClassNameLeft) ? '' : <NavigationMenu/>;
                menuElementLeft = (
                    <IconButton
                        className="chamel-app-bar-navigation-icon-button"
                        iconClassName={this.props.iconClassNameLeft}
                        onClick={this.props.onNavBtnClick}>
                        {child}
                    </IconButton>
                );
            }
		}

        var classes = 'chamel-app-bar', title, menuElementLeft, menuElementRight;

        if (this.props.className) {
            classes += " " + this.props.className;
        }

        menuElementRight = (this.props.children) ? this.props.children : 
                       (this.props.iconElementRight) ? this.props.iconElementRight : '';

        // Add title
        if (this.props.title) {
            // If the title is a string, wrap in an h1 tag.
            // If not, just use it as a node.
            title = toString.call(this.props.title) === '[object String]' ?
                <h1 className="chamel-app-bar-title">{this.props.title}</h1> :
                this.props.title;
        }

		return (
            <Paper rounded={false} className={classes} zDepth={this.props.zDepth}>
                {menuElementLeft}

                <div className="chamel-app-bar-toolbar">
                    {menuElementRight}
                </div>
                {title}
                <div className="chamel-clear" />
            </Paper>
		);
	}
});

module.exports = AppBar;
