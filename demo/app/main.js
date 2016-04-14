var React = require("react");
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var hashHistory = ReactRouter.hashHistory;
var routes = require("./routes.jsx");

/**
 * Demo app used to test and demonstrate UI components
 */
var chamel = {

	/**
	 * Run demo application
	 *
	 * @param {DOMNode} domNode A node to render the application into
	 * 					if null then return as string for server-side rendering
	 * @param {string} optPath If set then render a direct rather than trying to
	 *					determine the path from window.location
	 */
	run: function(domEntry, opt_path) {


		/*Router.run(routes, function (Handler) {
			ReactDOM.render(React.createElement(Handler), domEntry);
		});*/

		ReactDOM.render(<Router history={hashHistory} routes={routes}/>, domEntry)
	}
	
};

module.exports = chamel;