var React = require("react");
var App = require("./demo-app.jsx");
var Home = require("./home.jsx");
var AppBarDemo = require("./controls/AppBarDemo.jsx");
var ButtonDemo = require("./controls/ButtonDemo.jsx");
var ToolbarDemo = require("./controls/ToolbarDemo.jsx");
var EditorDemo = require("./controls/EditorDemo.jsx");

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
	</Route>
);


module.exports = routes;
