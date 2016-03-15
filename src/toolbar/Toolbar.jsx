var React = require('react');
var ReactDOM = require("react-dom");
var FontIcon = require("../FontIcon.jsx");
var ToolbarGroup = require("../toolbar/ToolbarGroup.jsx");

var Toolbar = React.createClass({

    propTypes: {
        iconWidth: React.PropTypes.number
    },

    getDefaultProps: function () {
        return {
            iconWidth: 60
        };
    },

    getInitialState: function () {
        return {
            containerWidth: 0,
            childrenWidth: 0,
            left: 0,
            showArrowLeft: true,
            showArrowRight: false
        };
    },

    componentDidMount: function () {
        var container = ReactDOM.findDOMNode(this.refs.chamelToolbar);

        this.setState({containerWidth: container.offsetWidth});
    },

    componentDidUpdate: function () {
        let chamelToolbar = ReactDOM.findDOMNode(this.refs.chamelToolbar);

        /*
         * If the state.containerWidth is not equal with the current toolbar offsetWidth
         * Then let's update the value of the state
         */
        if (this.state.containerWidth != chamelToolbar.offsetWidth) {
            this.setState({containerWidth: chamelToolbar.offsetWidth});
        }

        if (this.state.childrenWidth == 0) {
            
            let childrenWidth = 0;

            /*
             * Map thru the props.children and add up all the children's width
             * We will use the total children width to determine if all the icons are fit to display in the toolbar
             * If there are many icons to display in the toolbar, then we will display the arrow navigation to scroll the icons
             */
            React.Children.map(this.props.children, (element, idx) => {
                let child = ReactDOM.findDOMNode(this.refs[idx]);

                if (child.offsetWidth) {
                    childrenWidth += child.offsetWidth;
                }
            });

            this.setState({childrenWidth: childrenWidth});
        }
    },

    render: function () {

        /*
         * Map thru the props.children, and assign ref to each child
         * We need to assign refs so after mounthing the children, we can get its DOMNode
         * When we get the child's DOMNode, then we can get its offsetWidth
         */
        let children = React.Children.map(this.props.children, (element, idx) => {
            return React.cloneElement(element, {ref: idx});
        });

        

        if (this.state.childrenWidth > this.state.containerWidth) {

            let displayArrowLeft = null,
                displayArrowRight = null,
                iconWidth = this.props.iconWidth;
            
            /*
             * Style used for toolar main container
             * We set the overflow hidden since we will use the arrow navigation to scroll thru the icons
             * We need to minus the div's width with -100 to accomodate the displaying of arrow navigation icons
             */
            let styleToolbarMainCon = {
                float: 'left',
                overflow: 'hidden',
                width: (this.state.containerWidth - 100) + 'px'
            };

            /*
             * Style used for the toolbar icons
             * We are modifying the div's left value to navigate thru the toolbar icons
             */
            let styleToolbarCon = {
                display: '-webkit-box',
                position: 'relative',
                left: this.state.left + 'px'
            }

            // This will determine if we need to display the left arrow icon
            if (this.state.showArrowLeft) {
                displayArrowLeft = (
                    <div className="chamel-toolbar-left-arrow">
                        <FontIcon onClick={this._handleArrowClick.bind(this, -iconWidth)}
                                  className="cfi cfi-chevron-left"/>
                    </div>
                );
            }

            // This will determine if we need to display the right arrow icon
            if (this.state.showArrowRight) {
                displayArrowRight = (
                    <div className="chamel-toolbar-right-arrow">
                        <FontIcon onClick={this._handleArrowClick.bind(this, iconWidth)}
                                  className="cfi cfi-chevron-right"/>
                    </div>
                );
            }

            return (
                <ToolbarGroup ref="chamelToolbar" className="chamel-toolbar">
                    {displayArrowLeft}
                    <div style={styleToolbarMainCon}>
                        <div style={styleToolbarCon} ref="toolbarDiv">
                            {children}
                        </div>
                    </div>
                    {displayArrowRight}
                </ToolbarGroup>
            );
        } else {
            return (
                <div ref="chamelToolbar" className="chamel-toolbar">
                    {children}
                </div>
            );
        }


    },

    /**
     * Callback used to handle the clicking of the navigation arrow icons
     *
     * @param {number} value The number that will be used to modify the div's left value (negative value = left key; positive value = right key)
     * @private
     */
    _handleArrowClick: function (value) {

        // Flag used to determine if we need to update the div's left value
        let updateLeft = true;
        let left = this.state.left + value;

        // If we are navigating left, then we need to check if we need to modify the div's left value
        if (value < 0) {

            /*
             * If we have already reached the end of div and displayed the right most icon
             * Then we do not need to modify the div's left value anymore
             */
            if ((this.state.left * -1) > (this.state.childrenWidth - this.state.containerWidth) + this.props.iconWidth) {
                updateLeft = false;
            }
        }

        // If the div's left value is already 0, then we do not need to display the right navigation arrow icon
        if (left === 0) {
            this.setState({"showArrowRight": false});
        } else {
            this.setState({"showArrowRight": true});
        }

        /**
         * If left if less than or equal to 0 and we need to update the div's left value
         * Then let's modify the div's left value and display the left navigation arrow icon
         */
        if (left <= 0 && updateLeft) {
            this.setState({
                "left": left,
                "showArrowLeft": true
            });
        } else {
            this.setState({"showArrowLeft": false});
        }
    }
});

module.exports = Toolbar;
