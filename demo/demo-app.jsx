'use strict';
var React = require('react');
var Home = require('./home.jsx');

/** Once we use the route again
var Router = require('react-router');
var RouteLink = Router.Link;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function () {
    return (
      <div>
      	<header>
			<h1>{"Demo Here"}</h1>
		</header>
		
        <RouteHandler/>
      </div>
    );
  }
});
*/

var App = React.createClass({
  render: function () {
    return (
      <div>
      	<header>
			<h1>{"Demo Here"}</h1>
		</header>
		
        <Home/>
      </div>
    );
  }
});

module.exports = App;
