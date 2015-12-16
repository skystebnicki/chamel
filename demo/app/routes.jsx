var React = require("react");
var App = require("./demo-app.jsx");
var Home = require("./home.jsx");
var AppBarDemo = require("../controls/AppBarDemo.jsx");
var ButtonDemo = require("../controls/ButtonDemo.jsx");
var ToolbarDemo = require("../controls/ToolbarDemo.jsx");
var EditorDemo = require("../controls/EditorDemo.jsx");
var IconsDemo = require("../controls/IconsDemo.jsx");
var CheckboxDemo = require("../controls/CheckboxDemo.jsx");
var RadioDemo = require("../controls/RadioDemo.jsx");
var DialogDemo = require("../controls/DialogDemo.jsx");
var MenuDemo = require("../controls/MenuDemo.jsx");
var ProgressDemo = require("../controls/ProgressDemo.jsx");
var TabsDemo = require("../controls/TabsDemo.jsx");
var DatePickerDemo = require("../controls/DatePickerDemo.jsx");
var CalloutDemo = require("../controls/CalloutDemo.jsx");

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var routes = (
	<Route handler={App} path="/">
		<DefaultRoute handler={Home}/>
		<Route name="home" path="home" handler={Home}/>
		<Route name="button" path="button" handler={ButtonDemo}/>
		<Route name="app-bar" path="app-bar" handler={AppBarDemo}/>
		<Route name="toolbar" path="toolbar" handler={ToolbarDemo}/>
		<Route name="editor" path="editor" handler={EditorDemo}/>
		<Route name="icon" path="icon" handler={IconsDemo}/>
		<Route name="checkbox" path="checkbox" handler={CheckboxDemo}/>
		<Route name="radio" path="radio" handler={RadioDemo}/>
		<Route name="dialog" path="dialog" handler={DialogDemo}/>
		<Route name="menu" path="menu" handler={MenuDemo}/>
		<Route name="progress" path="progress" handler={ProgressDemo}/>
		<Route name="tabs" path="tabs" handler={TabsDemo}/>
		<Route name="datepicker" path="datepicker" handler={DatePickerDemo}/>
		<Route name="callout" path="callout" handler={CalloutDemo}/>
	</Route>
);

module.exports = routes;
