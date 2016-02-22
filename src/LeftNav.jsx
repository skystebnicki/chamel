/**
 * LeftNav componenet
 *
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Paper = require("./Paper.jsx");
var Overlay = require("./Overlay.jsx");
var Menu = require("./menu/Menu.jsx");
var Dom = require("./utils/Dom.jsx");
var Events = require("./utils/Events.jsx");

/**
 * Small application component
 */
var LeftNav = React.createClass({

  //mixins: [Classable, WindowListenable],

  propTypes: {
    docked: React.PropTypes.bool,
    header: React.PropTypes.element,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    modules: React.PropTypes.array,
    selectedIndex: React.PropTypes.number
  },

  windowListeners: {
    'keyup': '_onWindowKeyUp'
  },

  getDefaultProps: function() {
    return {
      docked: true
    };
  },

  getInitialState: function() {
    return {
      open: this.props.docked,
      selected: "",
      startTopOffset: 0,
      curTopOffset: -1
    };
  },

  toggle: function() {
    this.setState({ open: !this.state.open });
    return this;
  },

  close: function() {
    this.setState({ open: false });
    return this;
  },

  open: function() {
    this.setState({ open: true });
    return this;
  },

  componentDidMount: function() {
    
    // Save the original top position of the menu
    if (this.state.open) {
      let offset = Dom.offset(ReactDOM.findDOMNode(this.refs.clickAwayableElement));
      if (offset.top > 0) {
        this.setState({startTopOffset: offset.top});

        // Now listen for window scroll events
        Events.on(window, 'scroll', this._onWindowScroll);
      }
    }

    
  },

  componentWillUnmout: function() {
    if (this.sate.startTopOffset > 0) {
      Events.off(window, 'scroll', this._onWindowScroll);
    }
  },

  render: function() {
    // Set the classes
    var classes = "chamel-left-nav";
    if (!this.state.open) {
      classes += " chamel-closed";
    } 

    classes += (this.props.docked) ? " chamel-docked" : " chamel-floating";

    var selectedIndex = this.props.selectedIndex, overlay;

    if (!this.props.docked) 
      overlay = <Overlay show={this.state.open} onClick={this._onOverlayTouchTap} />;

    // Set the index based on the selected route if the selectedIndex was not passed as prop
    if (this.state.selected && selectedIndex === undefined) {
      selectedIndex = null;
      for (var i = 0; i < this.props.menuItems.length; i++) {

        // Put in variables for readability
        var selected = this.state.selected;
        var route = this.props.menuItems[i].route;

        // Selected could extend beyond the route path since a route can be
        // multiple levels deep like /my/path/to/100
        if (selected.length >= route.length) {
          if (selected.substring(0, route.length) == route) {
            selectedIndex = i;
          }
        }

        //var sltd =  ? "*" : "";
        //items.push(<div onClick={this._sendClick.bind(null, i)}>{this.props.menuItems[i].name} {sltd}</div>);
      }
    }


    var zDept = (this.props.docked) ? 0 : 2;

    // Handle offset when the document scrolls and the menu is not already at the top
    let topStyle = null;
    if (this.state.startTopOffset > 0 && this.state.curTopOffset !== -1) {
      topStyle = {top: this.state.curTopOffset + "px"};
    }

    return (
      <div className={classes}>
        {overlay}
        <Paper
          style={topStyle}
          ref="clickAwayableElement"
          className="chamel-left-nav-menu"
          zDepth={zDept}
          rounded={false}>
          
          {this.props.header}
          
          <Menu 
            ref="menuItems"
            zDepth={0}
            menuItems={this.props.menuItems}
            selectedIndex={selectedIndex}
            onItemClick={this._onMenuItemClick} />
        </Paper>
      </div>
    );
  },

  /**
   * Temp click sender to this.onMenuItemClick
   */
  _sendClick: function(i) {
    this._onMenuItemClick(null, i, this.props.menuItems[i]);
  },

  /** 
   * When the menu fires onItemClick it will pass the index and the item data as payload
   *
   * @param {Event} e
   * @param {int} key The index or unique key of the menu entry
   * @param {Object} payload the meny item object
   */
  _onMenuItemClick: function(e, key, payload) {
    if (!this.props.docked) this.close();
    if (this.props.onChange && this.props.selectedIndex !== key) {
      this.props.onChange(e, key, payload);
    }
  },

  _onOverlayTouchTap: function() {
    this.close();
  },

  _onWindowKeyUp: function(e) {
    if (e.keyCode == KeyCode.ESC &&
        !this.props.docked &&
        this.state.open) {
      this.close();
    }
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
    if (this.state.startTopOffset <= 0) {
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
    if (windowOffset.top > 0) {
      let newTop = this.state.startTopOffset - windowOffset.top;
      if (newTop < 0) {
        newTop = 0;
      }

      // It should never ever be less than the original offset
      if (windowOffset.top === 0 && newTop < this.state.startTopOffset) {
        newTop = -1; // Reset
      }

      // Set state without transition to make the scroll faster
      Dom.withoutTransition(
        ReactDOM.findDOMNode(this.refs.clickAwayableElement),
        function setOffsetTopState() {
          this.setState({curTopOffset: newTop});
        }.bind(this)
      );
      
    }
  }

});

module.exports = LeftNav;