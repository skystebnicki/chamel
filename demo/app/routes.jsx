var React = require("react");
var App = require("./demo-app.jsx");
var Home = require("./home.jsx");
var AppBarDemo = require("../controls/AppBarDemo.jsx");
var DrawerDemo = require("../controls/DrawerDemo.jsx");
var ButtonDemo = require("../controls/ButtonDemo.jsx");
var ToolbarDemo = require("../controls/ToolbarDemo.jsx");
var EditorDemo = require("../controls/EditorDemo.jsx");
var IconsDemo = require("../controls/IconsDemo.jsx");
var InputDemo = require("../controls/InputDemo.jsx");
var DialogDemo = require("../controls/DialogDemo.jsx");
var MenuDemo = require("../controls/MenuDemo.jsx");
var ListDemo = require("../controls/List/ListDemo.jsx");
var ProgressDemo = require("../controls/ProgressDemo.jsx");
var TabsDemo = require("../controls/TabsDemo.jsx");
var AutoCompleteDemo = require("../controls/AutoCompleteDemo.jsx");
var PopoverDemo = require("../controls/popover/PopoverDemo.jsx");
var ToggleDemo = require("../controls/ToggleDemo");
var PickerDemo = require("../controls/PickerDemo");
var SnackbarDemo = require("../controls/SnackbarDemo");

var ReactRouter = require('react-router');
var IndexRoute = ReactRouter.IndexRoute;
var Route = ReactRouter.Route;

var routes = (
	<Route component={App} path="/">
		<IndexRoute component={Home} />
		<Route name="home" path="home" component={Home}/>
		<Route name="drawer" path="drawer" component={DrawerDemo}/>
		<Route name="button" path="button" component={ButtonDemo}/>
		<Route name="input" path="input" component={InputDemo}/>
		<Route name="appbar" path="appbar" component={AppBarDemo}/>
		<Route name="toolbar" path="toolbar" component={ToolbarDemo}/>
		<Route name="editor" path="editor" component={EditorDemo}/>
		<Route name="icon" path="icon" component={IconsDemo}/>
		<Route name="dialog" path="dialog" component={DialogDemo}/>
        <Route name="list" path="list" component={ListDemo}/>
		<Route name="menu" path="menu" component={MenuDemo}/>
		<Route name="popover" path="popover" component={PopoverDemo}/>
		<Route name="progress" path="progress" component={ProgressDemo}/>
		<Route name="tabs" path="tabs" component={TabsDemo}/>
		<Route name="autocomplete" path="autocomplete" component={AutoCompleteDemo} />
		<Route name="toggle" path="toggle" component={ToggleDemo} />
    <Route name="picker" path="picker" component={PickerDemo} />
		<Route name="snackbar" path="snackbar" component={SnackbarDemo} />
	</Route>
);

module.exports = routes;
