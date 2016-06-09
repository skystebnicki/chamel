var React = require("react");
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var hashHistory = ReactRouter.hashHistory;
var routes = require("./routes.jsx");

ReactDOM.render(<Router history={hashHistory} routes={routes}/>, document.querySelector("#app-main"));

