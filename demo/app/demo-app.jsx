var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./home');
var LeftNav = require("chamel/LeftNav");
var IconButton = require("chamel/IconButton");
import ChamelThemeProvider from 'chamel/styles/ChamelThemeProvider';

import baseTheme from 'chamel/styles/theme/base.js';
import materialTheme from 'chamel/styles/theme/material.js';
import humanTheme from 'chamel/styles/theme/human.js';
//import modernTheme from 'chamel/styles/theme/modern.js';

var ReactRouter = require('react-router');
var RouteLink = ReactRouter.Link;

/**
 * Define menu items for the main left nav.
 *
 * The 'route' property must correlate to a named route in ./routes.jsx
 * which is where the control demo component is defined.
 */
var menuItems = [
  { route: 'home', text: 'Home' },
  { route: 'app-bar', text: 'AppBar' },
  { route: 'button', text: 'Button' },
  { route: 'input', text: 'Input' },
  { route: 'checkbox', text: 'Checkbox' },
  { route: 'radio', text: 'Radio' },
  { route: 'toolbar', text: 'Toolbar' },
  { route: 'editor', text: 'Editor' },
  { route: 'icon', text: 'Icon' },
  { route: 'dialog', text: 'Dialog' },
  { route: 'menu', text: 'Menu' },
  { route: 'popover', text: 'Popover' },
  { route: 'progress', text: 'Progress' },
  { route: 'tabs', text: 'Tabs' },
  { route: 'datepicker', text: 'DatePicker' },
  { route: 'autocomplete', text: 'AutoComplete' }
];

var App = React.createClass({

  getInitialState: function() {
    return {
        menuSelectedIndex: 0,
        menuDocked: true,
        theme: baseTheme
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
        <ChamelThemeProvider chamelTheme={this.state.theme}>
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
                  {this.props.children}
                </div>
              </div>
            </div>
        </ChamelThemeProvider>
    );
  },

  /**
   * Change the theme css
   */
  handleThemeChange_: function() {
      var themeName = ReactDOM.findDOMNode(this.refs.themes).value;
      switch (themeName) {
          case 'base':
              this.setState({theme:baseTheme});
              break;
          case 'material':
              this.setState({theme:materialTheme});
              break;
          case 'human':
              this.setState({theme:humanTheme});
              break;
          case 'modern':
              this.setState({theme:modernTheme});
              break;
      }
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
