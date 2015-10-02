'use strict';

var React = require("react");
var Router = require("react-router");
//var routes = require("./routes.jsx");
var App = require("./demo-app.jsx");

/**
 * Demo app used to test and demonstrate UI components
 */
var demo = {

	/**
	 * Run demo application
	 *
	 * @param {DOMNode} domNode A node to render the application into
	 * 					if null then return as string for server-side rendering
	 * @param {string} optPath If set then render a direct rather than trying to
	 *					determine the path from window.location
	 */
	run: function(domEntry, opt_path) {

		/**
		 * TODO: We need to move this over to a react router before the demo can
		 * be more robust. However, for the sake of just getting things going
		 * we are going to keep all the comonents on a single page for now.
		 */
		React.render(
			React.createElement(App), 
			domEntry
		);
	}
	
};

module.exports = demo;
