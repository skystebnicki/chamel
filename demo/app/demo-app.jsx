'use strict';
var React = require('react');
var Home = require('./home.jsx');
var LeftNav = require("../../src/LeftNav.jsx");
var IconButton = require("../../src/IconButton.jsx");

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

/**
 * Define menu items for the main left nav.
 *
 * The 'route' property must correlate to a named route in ./routes.jsx
 * which is where the control demo component is defined.
 */
var menuItems = [
  { route: 'home', text: 'Home' },
  { route: 'button', text: 'Button' },
  { route: 'app-bar', text: 'AppBar' },
  { route: 'toolbar', text: 'Toolbar' },
  { route: 'editor', text: 'Editor' },
  { route: 'icon', text: 'Icon' },
  { route: 'checkbox', text: 'Checkbox' },
  { route: 'radio', text: 'Radio' },
  { route: 'dialog', text: 'Dialog' },
  { route: 'menu', text: 'Menu' },
  { route: 'progress', text: 'Progress' },
  { route: 'tabs', text: 'Tabs' },
  { route: 'datepicker', text: 'DatePicker' },
  { route: 'callout', text: 'Callout' }
];

var App = React.createClass({

  getInitialState: function() {
    return {
      menuSelectedIndex: 0,
      menuDocked: true
    };
  },

  componentDidMount: function() {
    // Try to detect if we are a small device and hide the doc if so
    if (window.innerWidth < 800) {
      this.setState({menuDocked: false})
      this.refs.leftNav.close();
    }
  },

  render: function () {

    var contentClasses = "demo-maincontent";
    if (this.state.menuDocked) {
      contentClasses += " with-leftnav";
    }

    var themeOptionStyle = {
      float: "right"
    };
    return (
      <div>

        <div className="container-fluid">
          <header>
              <div style={ themeOptionStyle }>
                <select ref="themes" onChange={this.handleThemeChange_}>
                  <option value='base'>Base (none)</option>
                  <option value='material'>Material (android)</option>
                  <option value='human'>Human (ios)</option>
                  <option value='modern'>Modern (windows)</option>
                </select>
              </div>
              <span className='visible-xs-inline'>
                <IconButton
                    iconClassName="fa fa-bars"
                    onClick={this.handleMenuToggle_}/>
              </span>
              <h1>Chameleon Demo</h1>
          </header>
        </div>

        <LeftNav
            ref="leftNav"
            docked={this.state.menuDocked}
            selectedIndex={this.state.menuSelectedIndex}
            menuItems={menuItems}
            zIndex={0}
            onChange={this.handleNavChange_} />

        <div className={contentClasses}>
          <div className="container-fluid">
            <RouteHandler/>
          </div>
        </div>

      </div>
    );
  },

  /**
   * Change the theme css
   */
  handleThemeChange_: function() {
    var theme = React.findDOMNode(this.refs.themes).value;
    var themeScriptTag = document.getElementById("css-theme");
    themeScriptTag.href = '../build/css/chamel-' + theme + '.css';
  },

  /**
   * Handle left navigation change
   *
   * @param {Object} menuItem The menu item clicked on
   */
  handleNavChange_: function(evt, index, menu) {
    location.hash = menu.route;
    this.setState({menuSelectedIndex: index});
  },

  /**
   * Handle menu toggle
   */
  handleMenuToggle_: function() {
    this.refs.leftNav.toggle();
  }
});

module.exports = App;
