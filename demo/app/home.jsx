var React = require("react");

var FlatButton = require("../../src/FlatButton.jsx");
var RaisedButton = require("../../src/RaisedButton.jsx");
var DropDownMenuDemo = require("../controls/DropDownMenuDemo.jsx")
var MenuDemo = require("../controls/MenuDemo.jsx");
var AppBarDemo = require("../controls/AppBarDemo.jsx");

var Home = React.createClass({
  render: function () {
    return (
		<div>
			<h2>Welcome to Chameleon (aka chamel)!</h2>
			<p>This demo application exists to demonstrate the capabilites of each chamel component.</p>
			<p>Simply select a componenet to the left to see it in action.</p>
    	</div>
    );
  }
});

module.exports = Home;
