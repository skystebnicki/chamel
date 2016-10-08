import React from 'react';
import ReactDOM from 'react-dom';
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
import { HashRouter, Match, Miss, Link } from 'react-router'

// Import pages
import Home from "./home.jsx";
import AppBarDemo from "../controls/AppBarDemo.jsx";
import DrawerDemo from "../controls/DrawerDemo.jsx";
import ButtonDemo from "../controls/ButtonDemo.jsx";
import ToolbarDemo from "../controls/ToolbarDemo.jsx";
import EditorDemo from "../controls/EditorDemo.jsx";
import IconsDemo from "../controls/IconsDemo.jsx";
import InputDemo from "../controls/InputDemo.jsx";
import DialogDemo from "../controls/DialogDemo.jsx";
import MenuDemo from "../controls/MenuDemo.jsx";
import ListDemo from "../controls/List/ListDemo.jsx";
import ProgressDemo from "../controls/ProgressDemo.jsx";
import TabsDemo from "../controls/TabsDemo.jsx";
import AutoCompleteDemo from "../controls/AutoCompleteDemo.jsx";
import PopoverDemo from "../controls/popover/PopoverDemo.jsx";
import ToggleDemo from "../controls/ToggleDemo";
import PickerDemo from "../controls/PickerDemo";
import SnackbarDemo from "../controls/SnackbarDemo";

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
    const activeRouteName = ""; //this.props.location.pathname.substring(1);

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
      <HashRouter>
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
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  activeOnlyWhenExact
                  primaryText={"Home"}
                  path={"/"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"AppBar"}
                  path={"/appbar"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"Drawer"}
                  path={"/drawer"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"Button"}
                  path={"/button"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"Input"}
                  path={"/input"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"Toggle"}
                  path={"/toggle"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"Picker"}
                  path={"/picker"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"Toolbar"}
                  path={"/toolbar"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"Icon"}
                  path={"/icon"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"Popover"}
                  path={"/popover"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"List"}
                  path={"/list"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"Menu"}
                  path={"/menu"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"Tabs"}
                  path={"/tabs"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"Dialog"}
                  path={"/dialog"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"Editor"}
                  path={"/editor"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"Progress"}
                  path={"/progress"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"AutoComplete"}
                  path={"/autocomplete"}
                />
                <LeftNavRouteItem
                  handleGoToRoute={this.handleGoToRoute}
                  primaryText={"Snackbar"}
                  path={"/snackbar"}
                />
              </List>
            </Drawer>

            <div style={mainContainerStyle}>
              <Container fluid>
                <Match exactly pattern="/" component={Home} />
                <Match pattern="/appbar" component={AppBarDemo} />
                <Match pattern="/drawer" component={DrawerDemo} />
                <Match pattern="/button" component={ButtonDemo} />
                <Match pattern="/input" component={InputDemo} />
                <Match pattern="/toolbar" component={ToolbarDemo} />
                <Match pattern="/editor" component={EditorDemo} />
                <Match pattern="/icon" component={IconsDemo} />
                <Match pattern="/dialog" component={DialogDemo} />
                <Match pattern="/list" component={ListDemo} />
                <Match pattern="/menu" component={MenuDemo} />
                <Match pattern="/popover" component={PopoverDemo} />
                <Match pattern="/progress" component={ProgressDemo} />
                <Match pattern="/tabs" component={TabsDemo} />
                <Match pattern="/autocomplete" component={AutoCompleteDemo} />
                <Match pattern="/toggle" component={ToggleDemo} />
                <Match pattern="/picker" component={PickerDemo} />
                <Match pattern="/snackbar" component={SnackbarDemo} />
                <Miss component={NoMatch}/>
              </Container>
            </div>
          </div>
        </ChamelThemeProvider>
      </HashRouter>
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
    //location.hash = route;
    if (!this.state.menuDocked) {
      this.setState({menuOpen: false});
    }
  }
}

const LeftNavRouteItem = ({ activeOnlyWhenExact, handleGoToRoute, primaryText, path }) => (
  <Link activeOnlyWhenExact={activeOnlyWhenExact} to={path} onClick={handleGoToRoute}>{
      ({ isActive, onClick }) => {
          return (
            <ListItem
              primaryText={primaryText}
              selected={isActive}
              onTap={onClick}
            />
          );
      }
  }</Link>
)

const NoMatch = ({ location }) => (
  <div>
    <h2>Whoops</h2>
    <p>Sorry but {location.pathname} didn’t match any pages</p>
  </div>
)

ReactDOM.render(<App />, document.querySelector("#app-main"));
