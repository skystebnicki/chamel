/**
 * Main application toolbar
 *
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Paper = require("./Paper.jsx");
var IconButton = require("./IconButton.jsx");
var Dom = require("./utils/Dom.jsx");
var Events = require("./utils/Events.jsx");

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
        fixed: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            showMenuIconButton: true,
            title: '',
            iconClassNameLeft: 'fa fa-bars',
            zDepth: 1,
            fixed: true
        }
    },

    getInitialState: function() {
        return {
            startTopOffset: 0,
            startWidth: 0,
            curTopOffset: -1
        };
    },

    componentDidMount: function() {
        // If we are working with a device that supports status bar color, then set
        if (typeof cordova != "undefined" && typeof StatusBar != "undefined") {
            if (cordova.platformId == 'android') {
               // StatusBar.backgroundColorByHexString("#fff");
            }
        }

        // Save the original top position of the menu
        if (this.props.fixed) {
            let offset = Dom.offset(ReactDOM.findDOMNode(this.refs.appBarInnerCon));
            this.setState({
                startTopOffset: offset.top, 
                startWidth: offset.width,
                startHeight: offset.height
            });

            // Now listen for window scroll events
            Events.on(window, 'scroll', this._onWindowScroll);
        }
    },

    componentWillUnmout: function() {
        if (this.sate.startTopOffset > 0) {
            Events.off(window, 'scroll', this._onWindowScroll);
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

        // Handle offset when the document scrolls and the appbar is fixed
        let innerConStyle = null;
        let outerConStyle = null;
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
            outerConStyle = {height: this.state.startHeight + "px"}
        }

		return (
            <div style={outerConStyle}>
                <Paper ref="appBarInnerCon" rounded={false} className={classes} zDepth={this.props.zDepth} style={innerConStyle}>
                    {menuElementLeft}
                    <div className="chamel-app-bar-toolbar">
                        {menuElementRight}
                    </div>
                    {title}
                    <div className="chamel-clear" />
                </Paper>
            </div>
		);
	},

    /**
     * Handle when the document is scrolled while the 
     * The starting top of this menu was not 0 so it means
     * the menu is a fixed position and docked. A menu can be docked
     * below the top of the page (like below an AppBar) so we
     * want to be able to reposition the leftnav when the user scrolls
     * so it scrolls with the document until 0 (top)
     */
    _onWindowScroll: function(e) {

        // If the starting state was 0 then do nothing
        if (!this.props.fixed) {
            return;
        }

        // Get the scroll offset of the window
        let windowOffset = Dom.scrollOffset();

        /*
         * If we have scrolled, then follow the scroll.
         * Because the left nav div is position:fixed, then we
         * can move all the way to 0 to be at the top no matter how
         * far down the page they scroll
         */
        let newTop = this.state.startTopOffset - windowOffset.top;
        if (newTop < 0) {
          newTop = 0;
        }

        // Restore the original state if we are back in the viewport.
        if (windowOffset.top <= this.state.startTopOffset) {
          newTop = -1; // Reset
        }

        // Set state
        this.setState({curTopOffset: newTop})
    }
});

module.exports = AppBar;
