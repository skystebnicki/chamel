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
  { route: 'drawer', text: 'Drawer' },
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

class App extends React.Component {

    /**
     * Class constructor
     *
     * @param {Object} props Properties to send to the render function
     */
    constructor(props) {
        // Call paprent constructor
        super(props);

        this.state = {
            menuSelectedIndex: 0,
            menuDocked: true,
            themeName: 'base'
        }
    }

    componentDidMount() {
        let newState = {
            themeName: localStorage.getItem("theme") || 'base'
        };

          // Try to detect if we are a small device and hide the doc if so
        if (window.innerWidth < 800) {
            newState.menuDocked = false;
            this.refs.leftNav.close();
        }

        this.setState(newState)
    }

    render() {
        var contentClasses = "demo-maincontent";
        if (this.state.menuDocked) {
            contentClasses += " with-leftnav";
        }

        var themeOptionStyle = {
            float: "right"
        };

        const theme = this.getTheme(this.state.themeName);

        return (
            <ChamelThemeProvider chamelTheme={theme}>
                <div>
                    <div className="container-fluid">
                        <header>
                        <div style={ themeOptionStyle }>
                            <select ref="themes" value={this.state.themeName} onChange={this.handleThemeChange_}>
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
                        onChange={this.handleNavChange_}
                    />

                    <div className={contentClasses}>
                        <div className="container-fluid">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </ChamelThemeProvider>
        );
    }

    /**
     * Get a theme object from a theme name
     *
     * @param {string} themeName
     */
    getTheme(themeName) {
      switch (themeName) {
          case 'material':
              return materialTheme;
          case 'human':
              return humanTheme;
          case 'modern':
              return modernTheme;
          case 'base':
          default:
              return baseTheme;
      }
    }

  /**
   * Change the theme css
   */
  handleThemeChange_ = () => {
      var themeName = ReactDOM.findDOMNode(this.refs.themes).value;
      localStorage.setItem("theme", themeName);
      this.setState({themeName: themeName});
  }

  /**
   * Handle left navigation change
   *
   * @param {Object} menuItem The menu item clicked on
   */
  handleNavChange_ = (evt, index, menu) => {
    location.hash = menu.route;
    this.setState({menuSelectedIndex: index});
  }

  /**
   * Handle menu toggle
   */
  handleMenuToggle_() {
    this.refs.leftNav.toggle();
  }
}

module.exports = App;
