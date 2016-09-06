import React from 'react';
import ReactDOM from 'react-dom';
import baseTheme from './theme.scss';

import Paper from '../Paper/Paper'
import IconButton from '../IconButton/IconButton';
import Dom from '../utils/Dom';
import Events from '../utils/Events';

/**
 * Main popover class handles absolute positioning paper relative to an element
 */
class AppBar extends React.Component {

    /**
     * Class constructor
     *
     * @param {Object} props Properties to send to the render function
     */
    constructor(props) {
        // Call paprent constructor
        super(props);

        this.state = {
            startTopOffset: 0,
            startWidth: 0,
            curTopOffset: -1
        }
    }

    componentDidMount() {
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
    }

    componentWillUnmout() {
        // Remove window scroll event
        if (this.props.fixed) {
            Events.off(window, 'scroll', this._onWindowScroll);
        }
    }

	render() {

        // Determine which theme to use
        let theme = (this.context.chamelTheme && this.context.chamelTheme.appBar)
            ? this.context.chamelTheme.appBar : baseTheme;

        let classes = theme.appBarOuter, title, menuElementLeft, menuElementRight;

        if (this.props.className) {
            classes += " " + this.props.className;
        }

        // Set the left elements
        if (this.props.iconElementLeft) {
            // Add any appBar custom styles to the icon
            let iconElementLeft = this._addAppBarStyleToElements(
                this.props.iconElementLeft, theme
            );

            menuElementLeft = (
                <div className={theme.appBarLeft}>
                    {iconElementLeft}
                </div>
            );
        }

        // Set the right elements
        let rightElements = (this.props.children) ? this.props.children :
            (this.props.iconElementRight) ? this.props.iconElementRight : null;

        // If right elements exists, wrap in a toolbar
        if (rightElements) {
            // Add any appBar custom styles to the icon
            rightElements = this._addAppBarStyleToElements(
                rightElements, theme
            );

            menuElementRight = (
                <div className={theme.appBarRight}>{rightElements}</div>
            )
        }

        // Add title
        if (this.props.title) {
            // If the title is a string, wrap in an h1 tag.
            // If not, just use it as a node.
            title = toString.call(this.props.title) === '[object String]' ?
                <h1 className={theme.appBarTitle}>{this.props.title}</h1> :
                this.props.title;
        }

        // Get the zDepth passed - we may increment if we are floating
        let zDepth = this.props.zDepth;

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

            // Increment zDepth to indicate floating
            zDepth++;
        }

		return (
            <div style={outerConStyle}>
                <div style={innerConStyle}>
                    <Paper ref="appBarInnerCon" rounded={false} className={classes} zDepth={zDepth}>
                        {menuElementLeft}
                        {menuElementRight}
                        {title}
                        <div className={theme.appBarClear} />
                    </Paper>
                </div>
            </div>
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
     _onWindowScroll = (e) => {

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

    /**
     * Add appBar specific styles to elements
     *
     * @param {ReactElement} element
     * @param {Object} theme
     * @private
     * @return {ReactElement} Cloned element plus appbar style
     */
    _addAppBarStyleToElements = (element, theme) => {

        // If this is not a react element, just return whatever we got
        if (!element.type) {
            return element;
        }

        // If an array, iterate over it for each element
        if (element.constructor === Array) {
            for (let i in element) {
                // Apply any appBar custom styles to the elements
                element[i] = this._addAppBarStyleToElements(
                    element[i], theme
                );
            }
            return element;
        } else {
            // Get existing className
            //let className = (element.props.className) ? element.props.className + " " : "";
            let className = "";

            /*
             * If the element is supported, then clone a new element and
             * append appBar special class to the className
             */
            switch (element.type.name) {
                case 'IconButton':
                    return React.cloneElement(element, {
                        className: className + " " + theme.appBarIconButton
                    });
                case 'Button':
                default:
                    return React.cloneElement(element, {
                        className: className + " " + theme.button
                    })
            }
        }
    }
}

/**
 * Set accepted properties
 */
AppBar.propTypes = {
    onNavBtnClick: React.PropTypes.func,
    className: React.PropTypes.string,
    iconElementLeft: React.PropTypes.element,
    iconElementRight: React.PropTypes.element,
    title : React.PropTypes.node,
    zDepth: React.PropTypes.number,
    fixed: React.PropTypes.bool
}

/**
 * Set property defaults
 */
AppBar.defaultProps = {
    title: '',
    zDepth: 1,
    fixed: true
}

/**
 * An alternate theme may be passed down by a provider
 */
AppBar.contextTypes = {
    chamelTheme: React.PropTypes.object
};

// Check for commonjs
if (module) {
  module.exports = AppBar;
}

export default AppBar;
