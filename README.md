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
	var Chamel = require('chamel');
	var FlatButton = Chamel.FlatButton;

	var App = React.createClass({
	  render: function () {
	    return (
	      <div>
	      	<FlatButton />
	      </div>
	    );
	  }
	});
	
### 3. Add the right CSS to your html document

Copy the css files in ./dist to your project /css directory and
load them into your document head with:

	<link rel="stylesheet" href="/css/chamel-human.css" />

## Developing & Building

If you would like to build the probject or develop it locally then follow these steps. 

First make sure you have the latest version of node installed and working locally: https://nodejs.org

#### 1. If you do not have grunt installed, then install it with:

    npm install -g grunt-cli

#### 2. Install node dependencies
    
    npm install
    
Now you are ready to either develop or build chamel.

### To build the latest source for distribution


    grunt build

This will put all the files needed for deployment in the ./dist directory

### To develop locally

We recommend running three seperate console windows in parallel while developing.

#### 1. Watcher that builds the project then sits and waits for changes and automatically builds (pretty cool)

    grunt

#### 2. The http server used to display the demo app for development

    npm start

Now load up http://localhost/demo in your browser of choice to see the demo of each component
    
#### 3. The test suite that also watches for changes and runs automatically

    npm test
    
Again, I recommend running all these at the same time in different tabs (or windows).