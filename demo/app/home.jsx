var React = require("react");

var FlatButton = require("../../src/FlatButton");
var RaisedButton = require("../../src/RaisedButton");
var DropDownMenuDemo = require("../controls/DropDownMenuDemo")
var MenuDemo = require("../controls/MenuDemo");
var AppBarDemo = require("../controls/AppBarDemo");

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
