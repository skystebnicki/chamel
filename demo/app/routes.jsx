var React = require("react");
var App = require("./demo-app.jsx");
var Home = require("./home.jsx");
var AppBarDemo = require("../controls/AppBarDemo.jsx");
var DrawerDemo = require("../controls/DrawerDemo.jsx");
var ButtonDemo = require("../controls/ButtonDemo.jsx");
var ToolbarDemo = require("../controls/ToolbarDemo.jsx");
var EditorDemo = require("../controls/EditorDemo.jsx");
var IconsDemo = require("../controls/IconsDemo.jsx");
var CheckboxDemo = require("../controls/CheckboxDemo.jsx");
var RadioDemo = require("../controls/RadioDemo.jsx");
var InputDemo = require("../controls/InputDemo.jsx");
var DialogDemo = require("../controls/DialogDemo.jsx");
var MenuDemo = require("../controls/MenuDemo.jsx");
var ProgressDemo = require("../controls/ProgressDemo.jsx");
var TabsDemo = require("../controls/TabsDemo.jsx");
var DatePickerDemo = require("../controls/DatePickerDemo.jsx");
var AutoCompleteDemo = require("../controls/AutoCompleteDemo.jsx");
var PopoverDemo = require("../controls/popover/PopoverDemo.jsx");

var ReactRouter = require('react-router');
var IndexRoute = ReactRouter.IndexRoute;
var Route = ReactRouter.Route;

var routes = (
	<Route component={App} path="/">
		<IndexRoute component={Home} />
		<Route name="home" path="home" component={Home}/>
		<Route name="drawer" path="drawer" component={DrawerDemo}/>
		<Route name="button" path="button" component={ButtonDemo}/>
		<Route name="checkbox" path="checkbox" component={CheckboxDemo}/>
		<Route name="radio" path="radio" component={RadioDemo}/>
		<Route name="input" path="input" component={InputDemo}/>
		<Route name="app-bar" path="app-bar" component={AppBarDemo}/>
		<Route name="toolbar" path="toolbar" component={ToolbarDemo}/>
		<Route name="editor" path="editor" component={EditorDemo}/>
		<Route name="icon" path="icon" component={IconsDemo}/>
		<Route name="dialog" path="dialog" component={DialogDemo}/>
		<Route name="menu" path="menu" component={MenuDemo}/>
		<Route name="popover" path="popover" component={PopoverDemo}/>
		<Route name="progress" path="progress" component={ProgressDemo}/>
		<Route name="tabs" path="tabs" component={TabsDemo}/>
		<Route name="datepicker" path="datepicker" component={DatePickerDemo} />
		<Route name="autocomplete" path="autocomplete" component={AutoCompleteDemo} />
	</Route>
);

module.exports = routes;
