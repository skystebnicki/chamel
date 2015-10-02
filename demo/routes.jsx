var React = require("react");
var App = require("./demo-app.jsx");
var Home = require("./home.jsx");

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var routes = (
  <Router>
	  <Route name="app" path="/" component={App}>
	    <Route name="home" component={Home}/>
	    <Route path="*" component={Home}/>
	  </Route>
  </Router>
);


module.exports = routes;
