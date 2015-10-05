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
        <div className="container">
          <header>
              <div className='pull-right'>
                <select ref="themes" onChange={this.handleThemeChange_}>
                  <option value='base'>Base (none)</option>
                  <option value='material'>Material (android)</option>
                  <option value='human'>Human (ios)</option>
                  <option value='modern'>Modern (windows)</option>
                </select>
              </div>
              <h1>Chameleon Demo</h1>
          </header>
        </div>
		
        <Home/>
      </div>
    );
  },

  /**
   * Change the theme css
   */
  handleThemeChange_: function() {
    var theme = React.findDOMNode(this.refs.themes).value;
    var themeScriptTag = document.getElementById("css-theme");
    themeScriptTag.href = '../css/chamel-' + theme + '.css';
  }
});

module.exports = App;
