# Chamel (short for chameleon)

This is a web UI framework designed to provide the most native experience possible automatically across common platforms and devices.

## Using chamel

Include sass

	vendor/chamel/sass/

Inside JSX

	var Chamel = require("chamel");
	var React = require('react');

	var App = React.createClass({
	  render: function () {
	    return (
	      <div>
	      	<Chamel.Button />
	      </div>
	    );
	  }
	});