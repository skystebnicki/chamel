var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./home');
var IconButton = require("chamel/Button/IconButton");
import Drawer from 'chamel/Drawer';
import Container from 'chamel/Grid/Container';
import ChamelThemeProvider from 'chamel/styles/ChamelThemeProvider';
import List from 'chamel/List';
import ListItem from 'chamel/List/ListItem';

import baseTheme from 'chamel/styles/theme/base.js';
import materialTheme from 'chamel/styles/theme/material.js';
import humanTheme from 'chamel/styles/theme/human.js';


var ReactRouter = require('react-router');
var RouteLink = ReactRouter.Link;

class App extends React.Component {

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
    router: React.PropTypes.object
  };

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call paprent constructor
    super(props);

    this.state = {
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
      newState.menuDocked = true;
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
    // Get the current path name and skip the preceeding root / char
    const activeRouteName = this.props.location.pathname.substring(1);

    return (
      <ChamelThemeProvider chamelTheme={theme}>
        <div>
          <Container fluid>
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
          </Container>

          <Drawer
            ref="leftNav"
            permanent={this.state.menuDocked}
            open={this.state.menuDocked}
            clipped={true}
            zIndex={0}
          >
            <List
              onItemClick={this.handleNavChange_}
            >
              <ListItem
                primaryText={"Home"}
                selected={(activeRouteName == "home")}
                onTap={(e) => { location.hash = "home"; }}
              />
              <ListItem
                primaryText={"AppBar"}
                selected={(activeRouteName == "appbar")}
                onTap={(e) => { location.hash = "appbar"; }}
              />
              <ListItem
                primaryText={"Drawer"}
                selected={(activeRouteName == "drawer")}
                onTap={(e) => { location.hash = "drawer"; }}
              />
              <ListItem
                primaryText={"Button"}
                selected={(activeRouteName == "button")}
                onTap={(e) => { location.hash = "button"; }}
              />
              <ListItem
                primaryText={"Input"}
                selected={(activeRouteName == "input")}
                onTap={(e) => { location.hash = "input"; }}
              />
              <ListItem
                primaryText={"Toggle"}
                selected={(activeRouteName == "toggle")}
                onTap={(e) => { location.hash = "toggle"; }}
              />
              <ListItem
                primaryText={"Picker"}
                selected={(activeRouteName == "picker")}
                onTap={(e) => { location.hash = "picker"; }}
              />
              <ListItem
                primaryText={"Toolbar"}
                selected={(activeRouteName == "toolbar")}
                onTap={(e) => { location.hash = "toolbar"; }}
              />
              <ListItem
                primaryText={"Icon"}
                selected={(activeRouteName == "icon")}
                onTap={(e) => { location.hash = "icon"; }}
              />
              <ListItem
                primaryText={"Popover"}
                selected={(activeRouteName == "popover")}
                onTap={(e) => { location.hash = "popover"; }}
              />
              <ListItem
                primaryText={"List"}
                selected={(activeRouteName == "list")}
                onTap={(e) => { location.hash = "list"; }}
              />
              <ListItem
                primaryText={"Menu"}
                selected={(activeRouteName == "menu")}
                onTap={(e) => { location.hash = "menu"; }}
              />
              <ListItem
                primaryText={"Tabs"}
                selected={(activeRouteName == "tabs")}
                onTap={(e) => { location.hash = "tabs"; }}
              />
              <ListItem
                primaryText={"Dialog"}
                selected={(activeRouteName == "dialog")}
                onTap={(e) => { location.hash = "dialog"; }}
              />
              <ListItem
                primaryText={"Editor"}
                selected={(activeRouteName == "editor")}
                onTap={(e) => { location.hash = "editor"; }}
              />
              <ListItem
                primaryText={"Progress"}
                selected={(activeRouteName == "progress")}
                onTap={(e) => { location.hash = "progress"; }}
              />
              <ListItem
                primaryText={"AutoComplete"}
                selected={(activeRouteName == "autocomplete")}
                onTap={(e) => { location.hash = "autocomplete"; }}
              />
              <ListItem
                primaryText={"Snackbar"}
                selected={(activeRouteName == "snackbar")}
                onTap={(e) => { location.hash = "snackbar"; }}
              />
            </List>
          </Drawer>

          <div className={contentClasses}>
            <Container fluid>
              {this.props.children}
            </Container>
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
  };

  /**
   * Handle menu toggle
   */
  handleMenuToggle_() {
    this.refs.leftNav.toggle();
  }
}

module.exports = App;
