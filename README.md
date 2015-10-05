# Chamel (short for chameleon)

This is a ReactJS UI framework designed to provide the most native experience possible automatically across common platforms and devices.

## Using Chamel

### 1. Include the CSS in the head of your document

All the themes can be found in /dist/css/chamel-[themename].cmp.css

### 2. Use the components in your React Component

First install chamel with npm

    npm install chamel --save-dev

Now use in a your component like:

	var React = require('react');
	var Chamel = require("chamel");
	var FlatButton = Chamel.FlatButton;

	var App = React.createClass({
	  render: function () {
	    return (
	      <div>
	      	<Chamel.Button />
	      </div>
	    );
	  }
	});

## Dependencies

- FontAwesome