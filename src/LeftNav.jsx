/**
 * LeftNav componenet
 *
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Paper = require("./Paper.jsx");
var Overlay = require("./Overlay.jsx");
var Menu = require("./menu/Menu.jsx");

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
      selected: ""
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

  render: function() {
    // Set the classes
    var classes = "left-nav";
    if (!this.state.open) {
      classes += " closed";
    } 

    classes += (this.props.docked) ? " docked" : " floating";

    var selectedIndex = this.props.selectedIndex,
      overlay;

    if (!this.props.docked) 
      overlay = <Overlay show={this.state.open} onClick={this._onOverlayTouchTap} />;

    /* We should nest the menu eventually
    <Menu 
            ref="menuItems"
            zDepth={0}
            menuItems={this.props.menuItems}
            selectedIndex={selectedIndex}
            onItemClick={this._onMenuItemClick} />
            */

    // Add each menu item
    var selectedIndex = null;
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

    var zDept = (this.props.docked) ? 0 : 2;

    return (
      <div className={classes}>

        {overlay}
        <Paper
          ref="clickAwayableElement"
          className="left-nav-menu"
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
    /*
    return (
      <div className={classes}>

        {overlay}
        <Paper
          ref="clickAwayableElement"
          className="left-nav-menu"
          zDepth={zDept}
          rounded={false}>
          
          {this.props.header}
          
          <div>
            {items}
          </div>
        </Paper>
      </div>
    );
    */
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
  }

});

module.exports = LeftNav;