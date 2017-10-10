import React from 'react';
import Popover from 'chamel/Popover';
var RaisedButton = require("chamel/Button/RaisedButton");

export default class PopoverExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: !this.state.open,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <RaisedButton
          depressed={this.state.open}
          onTap={this.handleTouchTap}
        >
          {"Bottom Left"}
        </RaisedButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          relative={true}
        >
          <div style={{backgroundColor: "#fff", border: "1px solid red", padding: "20px"}}>
            Test
          </div>
        </Popover>
      </div>
    );
  }
}
