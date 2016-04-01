var React = require('react');
var ReactDOM = require("react-dom");
var FontIcon = require("../FontIcon.jsx");
var ToolbarGroup = require("../toolbar/ToolbarGroup.jsx");

/**
 * This variable will hold all the icons to be displayed in the toolbar if we are in mobile mode display
 *
 * @type {Array}
 */
var toolbarIcons = [];

/**
 * The default icon width that we will use as our reference
 *
 * @constant
 */
var DEFAULTICONWIDTH = 48;

var Toolbar = React.createClass({

    getInitialState: function () {
        return {
            /**
             * The width of the main container for the toolbar
             */
            mainContainerWidth: 0,

            /**
             * The width of the toolbar icons container
             */
            toolbarContainerWidth: 0,

            /**
             * The width of the total icons that we are going to display
             */
            totalIconWidth: 0,

            /**
             * The number of icons that can possibly fit in the main container
             */
            maxIconsDisplay: 0,

            /**
             * The starting index of the icon that we are going to display
             */
            startIconIndex: 0
        };
    },

    componentDidMount: function () {

        let maxIconsDisplay = 0,
            totalIconWidth = 0;

        // Loop thru the toolbarIcons and check if we need to update the icon's width
        for (var idx in toolbarIcons) {
            let icon = ReactDOM.findDOMNode(this.refs[idx]);

            // Evaluate if we the current icon's width is greater than the DEFAULTICONWIDTH specified
            if (icon && icon.offsetWidth && icon.offsetWidth >= DEFAULTICONWIDTH) {
                toolbarIcons[idx].width = icon.offsetWidth;
            }

            // Calculate the totalIconWidth
            totalIconWidth += toolbarIcons[idx].width;
        }

        // Get the offsetWidth of the main container for the toolbar icons
        let container = ReactDOM.findDOMNode(this.refs.chamelToolbar);

        // We need to minus the DEFAULTICONWIDTH*2 to accomodate the arrow keys
        let toolbarContainerWidth = container.offsetWidth - (DEFAULTICONWIDTH * 2)

        this.setState({
            mainContainerWidth: container.offsetWidth,
            totalIconWidth: totalIconWidth,
            toolbarContainerWidth: toolbarContainerWidth,
            maxIconsDisplay: Math.floor(toolbarContainerWidth / DEFAULTICONWIDTH)
        });



    },

    componentDidUpdate: function () {
        let chamelToolbar = ReactDOM.findDOMNode(this.refs.chamelToolbar);

        /*
         * If the state.mainContainerWidth is not equal with the current main toolbar container offsetWidth
         * Then let's update the value of the state
         */
        if (this.state.mainContainerWidth != chamelToolbar.offsetWidth) {
            this.setState({mainContainerWidth: chamelToolbar.offsetWidth});
        }

        let container = ReactDOM.findDOMNode(this.refs.toolbarContainer);

        for(var idx in container.childNodes) {
            let child = container.childNodes[idx];

            var style = child.currentStyle || window.getComputedStyle(child);

            console.log(style.width);
            console.log(style.marginLeft);
            console.log(style.marginRight);
            console.log(style.paddingLeft);
            console.log(style.paddingRight);

            break;
        }
    },

    render: function () {

        // If we have not set the toolbarIcons yet, then we will get it from the props.children
        if (toolbarIcons.length == 0) {

            // Get the toolbar icons
            this._getToolbarIcons(this.props.children);
        }

        // This will contain the icons to be displayed in the toolbar.
        let displayIcons = [];

        if (true || this.state.totalIconWidth === 0) {

            // Map thru the toolbarIcons and display all the icons
            toolbarIcons.map(function (toolbarIcon) {
                displayIcons.push(toolbarIcon.icon)
            });

            // We need to display all the toolbar icons here so we can get the icon's width and calculate the totalIconsWidth
            return (
                <div ref="chamelToolbar" className="chamel-toolbar" style={{position: 'absolute'}}>
                    <ToolbarGroup ref="toolbarContainer">
                        {displayIcons}
                    </ToolbarGroup>
                </div>
            );
        } else if (this.state.totalIconWidth > this.state.mainContainerWidth) {
            let displayArrowLeft = null,
                displayArrowRight = null,
                totalDisplayIconWidth = 0,
                idx = this.state.startIconIndex;

            // Let's use the maxIconsDisplay as our limit on how many icons we will display in the toolbar
            for (let i = 1; i <= this.state.maxIconsDisplay; i++, idx++) {

                // Make sure that we will only evaluate if we have a toolbar icon
                if (toolbarIcons[idx]) {

                    // Calculate the width of the total icons displayed
                    totalDisplayIconWidth += toolbarIcons[idx].width;

                    /*
                     * If the width of the total icons displayed reaches the limit (toolbarContainerWidth)
                     * Then we will break this for loop and will not add more toolbar icons to displayIcons
                     */
                    if (totalDisplayIconWidth > this.state.toolbarContainerWidth) {
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
                displayArrowLeft = (
                    <div className="chamel-toolbar-left-arrow">
                        <FontIcon onClick={this._handleArrowClick.bind(this, -1)}
                                  className="cfi cfi-chevron-left"/>
                    </div>
                );
            }

            // This will determine if we need to display the right arrow icon
            if ((this.state.startIconIndex + displayIcons.length) < toolbarIcons.length) {
                displayArrowRight = (
                    <div className="chamel-toolbar-right-arrow">
                        <FontIcon onClick={this._handleArrowClick.bind(this, 1)}
                                  className="cfi cfi-chevron-right"/>
                    </div>
                );
            }

            // Modify the toolbar main container's style so we can properly display the toolbar icons
            let styleToolbarMainCon = {
                float: 'left',
                width: this.state.toolbarContainerWidth + 'px'
            };

            return (
                <div ref="chamelToolbar" className="chamel-toolbar" style={{padding: '0px'}}>
                    {displayArrowLeft}
                    <div ref="toolbarContainer" className="chamel-toolbar-group" style={styleToolbarMainCon}>
                        {displayIcons}
                    </div>
                    {displayArrowRight}
                </div>
            );
        } else {

            // If the toolbar main container is wide enough to display all the icons, then just display the props.children
            return (
                <div ref="chamelToolbar" className="chamel-toolbar">
                    {this.props.children}
                </div>
            );
        }
    },

    /**
     * Function that will get all the possible toolbar icons
     *
     * @param {React.Children} children The children of the react component that contains the possible toolbar icons
     * @private
     */
    _getToolbarIcons: function (children) {

        // Map thru the react children and evaluate each element if it is a toolbar icon or a parent component
        React.Children.map(children, function (element) {

            // Make sure that the element we evaluating is an object
            if(typeof element === 'object') {

                let className = element.props.className;

                if(className) {
                    let parts = className.split(" ");

                    if(parts.indexOf("cfi") != -1) {
                        let ref = toolbarIcons.length;
                        let icon = React.cloneElement(element, {ref: ref, key: ref});
                        toolbarIcons[ref] = {
                            icon: icon,
                            width: DEFAULTICONWIDTH
                        }

                        return;
                    }
                }

                // If the element has a children, then let's loop again and find the possible toolbar icons
                if (element.props.children) {
                    this._getToolbarIcons(element.props.children);
                }
            }
        }.bind(this));
    },

    /**
     * Callback used to handle the clicking of the navigation arrow icons
     *
     * @param {int} value The number that will be used to modify the div's left value (negative value = left key; positive value = right key)
     * @private
     */
    _handleArrowClick: function (value) {

        // Update the startIconIndex
        let startIconIndex = this.state.startIconIndex + value;
        this.setState({startIconIndex: startIconIndex});
    }
});

module.exports = Toolbar;
