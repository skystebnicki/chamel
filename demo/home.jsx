var React = require("react");

var FlatButton = require("../src/FlatButton.jsx");
var RaisedButton = require("../src/RaisedButton.jsx");
var DropDownMenuDemo = require("./controls/DropDownMenuDemo.jsx")
var MenuDemo = require("./controls/MenuDemo.jsx");
var AppBarDemo = require("./controls/AppBarDemo.jsx");

var Home = React.createClass({
  render: function () {
    return (
		<div>
			<div className="row">
				<div className="col-xs-12 col-md-6">
					<h2>{"Buttons"}</h2>
					<h3>{"Flat"}</h3>
					<FlatButton label="Default" />
					<FlatButton label="Primary" primary={true} />
					<FlatButton label="Secondary" secondary={true} />
					<FlatButton label="Disabled" disabled={true} />
					<h3>{"Raised"}</h3>
					<div className="row">
						<div className="col-xs-3">
							<RaisedButton label="Default" />
						</div>
						<div className="col-xs-3">
							<RaisedButton label="Primary" primary={true} />
						</div>
						<div className="col-xs-3">
							<RaisedButton label="Secondary" secondary={true} />
						</div>
						<div className="col-xs-3">
							<RaisedButton label="Disabled" disabled={true} />
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12 col-md-6">
					<h2>{"AppBar"}</h2>
					<AppBarDemo />
				</div>
			</div>
    	</div>
    );
  }
});

module.exports = Home;
