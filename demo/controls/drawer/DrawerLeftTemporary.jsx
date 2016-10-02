var React = require("react");

import Button from 'chamel/Button';
import Drawer from 'chamel/Drawer';

class DrawerDemo extends React.Component {

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call paprent constructor
    super(props);

    this.state = {
      open: false
    }
  }

  render () {
    return (
      <div>
        <Drawer open={this.state.open} onClose={this._handleClick}>{"Content"}</Drawer>
        <Button type={'raised'} onTap={this._handleClick}>Left Temporary</Button>
      </div>
    );
  }

  _handleClick = (e) => {
    console.log("Toggle drawer button clicked");
    this.setState({open: !this.state.open})
  }
};

export default DrawerDemo;
