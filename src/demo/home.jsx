var React = require("react");
var Bootstrap = require("react-bootstrap");
var Grid = Bootstrap.Grid;
var Col = Bootstrap.Col;
var Row = Bootstrap.Row;

var FlatButton = require("../FlatButton.jsx");
var RaisedButton = require("../RaisedButton.jsx");

var Home = React.createClass({
  render: function () {
    return (
		<Grid>
			<Row className='show-grid'>
				<Col xs={12} md={6}>
					<h2>{"Buttons"}</h2>
					<h3>{"Flat"}</h3>
					<FlatButton label="Default" />
					<FlatButton label="Primary" primary={true} />
					<FlatButton label="Secondary" secondary={true} />
					<FlatButton label="Disabled" disabled={true} />
					<h3>{"Raised"}</h3>
					<Row>
						<Col xs={3}>
							<RaisedButton label="Default" />
						</Col>
						<Col xs={3}>
							<RaisedButton label="Primary" primary={true} />
						</Col>
						<Col xs={3}>
							<RaisedButton label="Secondary" secondary={true} />
						</Col>
						<Col xs={3}>
							<RaisedButton label="Disabled" disabled={true} />
						</Col>
					</Row>
				</Col>
				<Col xs={12} md={6}>
					{"Main Content"}
				</Col>
			</Row>
    	</Grid>
    );
  }
});

module.exports = Home;
