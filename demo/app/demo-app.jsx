import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import IconButton from 'chamel/Button/IconButton';
import Drawer from 'chamel/Drawer';
import Container from 'chamel/Grid/Container';
import ChamelThemeProvider from 'chamel/styles/ChamelThemeProvider';
import List from 'chamel/List';
import ListItem from 'chamel/List/ListItem';
import baseTheme from 'chamel/styles/theme/base.js';
import materialTheme from 'chamel/styles/theme/material.js';
import humanTheme from 'chamel/styles/theme/human.js';
import MenuIcon from 'chamel/icons/font/MenuIcon';
import AppBar from 'chamel/AppBar';
import SelectButton from 'chamel/Picker/SelectButton';

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
      menuDocked: false,
      menuOpen: false,
      themeName: 'base'
    }
  }

  componentDidMount() {
    let newState = {
      themeName: localStorage.getItem("theme") || 'base'
    };

    // Try to detect if we are a small device and hide the doc if so
    if (window.innerWidth > 800) {
      newState.menuDocked = true;
      newState.menuOpen = true;
    }

    this.setState(newState)
  }

  render() {
    let mainContainerStyle = {};
    if (this.state.menuDocked) {
      mainContainerStyle.marginLeft = "256px";
    }

    const theme = this.getTheme(this.state.themeName);
    // Get the current path name and skip the preceeding root / char
    const activeRouteName = this.props.location.pathname.substring(1);

    // Set the z-index of the navigation menu (left nav)
    const drawerZindex = (this.state.menuDocked) ? 0 : 1;

    // Create right icon for closing the left nav if not docked
    const leftAppBarElement = (!this.state.menuDocked) ? (
      <IconButton onClick={this.handleMenuToggle_}>
        <MenuIcon />
      </IconButton>
    ) : null;

    const rightAppBarElement = (
      <SelectButton onChange={this.handleThemeChange_} menuItems={[
        { theme: 'base', text: 'Base (none)' },
        { theme: 'material', text: 'Material (android)' },
        { theme: 'human', text: 'Human (ios)' },
        { theme: 'modern', text: 'Modern (windows)' }
      ]} />
    );

    return (
      <ChamelThemeProvider chamelTheme={theme}>
        <div>
          <AppBar
            iconElementLeft={leftAppBarElement}
            iconElementRight={rightAppBarElement}
            title={"Chameleon Demo"}
          />

          <Drawer
            ref="leftNav"
            permanent={this.state.menuDocked}
            open={this.state.menuDocked || this.state.menuOpen}
            clipped={this.state.menuDocked}
            zIndex={drawerZindex}
            onClose={this.handleMenuToggle_}
          >
            <List
              onItemClick={this.handleNavChange_}
            >
              <ListItem
                primaryText={"Home"}
                selected={(activeRouteName == "home")}
                onTap={(e) => { this.handleGoToRoute("home"); }}
              />
              <ListItem
                primaryText={"AppBar"}
                selected={(activeRouteName == "appbar")}
                onTap={(e) => { this.handleGoToRoute("appbar"); }}
              />
              <ListItem
                primaryText={"Drawer"}
                selected={(activeRouteName == "drawer")}
                onTap={(e) => { this.handleGoToRoute("drawer"); }}
              />
              <ListItem
                primaryText={"Button"}
                selected={(activeRouteName == "button")}
                onTap={(e) => { this.handleGoToRoute("button"); }}
              />
              <ListItem
                primaryText={"Input"}
                selected={(activeRouteName == "input")}
                onTap={(e) => { this.handleGoToRoute("input"); }}
              />
              <ListItem
                primaryText={"Toggle"}
                selected={(activeRouteName == "toggle")}
                onTap={(e) => { this.handleGoToRoute("toggle"); }}
              />
              <ListItem
                primaryText={"Picker"}
                selected={(activeRouteName == "picker")}
                onTap={(e) => { this.handleGoToRoute("picker"); }}
              />
              <ListItem
                primaryText={"Toolbar"}
                selected={(activeRouteName == "toolbar")}
                onTap={(e) => { this.handleGoToRoute("toolbar"); }}
              />
              <ListItem
                primaryText={"Icon"}
                selected={(activeRouteName == "icon")}
                onTap={(e) => { this.handleGoToRoute("icon"); }}
              />
              <ListItem
                primaryText={"Popover"}
                selected={(activeRouteName == "popover")}
                onTap={(e) => { this.handleGoToRoute("popover"); }}
              />
              <ListItem
                primaryText={"List"}
                selected={(activeRouteName == "list")}
                onTap={(e) => { this.handleGoToRoute("list"); }}
              />
              <ListItem
                primaryText={"Menu"}
                selected={(activeRouteName == "menu")}
                onTap={(e) => { this.handleGoToRoute("menu"); }}
              />
              <ListItem
                primaryText={"Tabs"}
                selected={(activeRouteName == "tabs")}
                onTap={(e) => { this.handleGoToRoute("tabs"); }}
              />
              <ListItem
                primaryText={"Dialog"}
                selected={(activeRouteName == "dialog")}
                onTap={(e) => { this.handleGoToRoute("dialog");}}
              />
              <ListItem
                primaryText={"Editor"}
                selected={(activeRouteName == "editor")}
                onTap={(e) => { this.handleGoToRoute("editor"); }}
              />
              <ListItem
                primaryText={"Progress"}
                selected={(activeRouteName == "progress")}
                onTap={(e) => { this.handleGoToRoute("progress"); }}
              />
              <ListItem
                primaryText={"AutoComplete"}
                selected={(activeRouteName == "autocomplete")}
                onTap={(e) => { this.handleGoToRoute("autocomplete"); }}
              />
              <ListItem
                primaryText={"Snackbar"}
                selected={(activeRouteName == "snackbar")}
                onTap={(e) => { this.handleGoToRoute("snackbar"); }}
              />
            </List>
          </Drawer>

          <div style={mainContainerStyle}>
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
  handleThemeChange_ = (e, index, payload) => {
    localStorage.setItem("theme", payload.theme);
    this.setState({themeName: payload.theme});
  };

  /**
   * Handle menu toggle
   */
  handleMenuToggle_ = () => {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  /**
   * Change the hash which will load the selected route
   */
  handleGoToRoute = (route) => {
    location.hash = route;
    if (!this.state.menuDocked) {
      this.setState({menuOpen: false});
    }
  }
}

module.exports = App;
