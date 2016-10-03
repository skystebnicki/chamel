import React from 'react';
import IconButton from 'chamel/Button/IconButton';
import CloseIcon from 'chamel/icons/font/CloseIcon';
import Toolbar from 'chamel/Toolbar/Toolbar';
import ToolbarGroup from 'chamel/Toolbar/ToolbarGroup';

class PrimaryToolbarDemo extends React.Component {

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call parent constructor
    super(props);
  }

  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup key={0} align="left">
            <IconButton onTap={(e) => { console.log("Left close clicked"); }}>
              <CloseIcon />
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup key={1} align="right">
            <IconButton onTap={(e) => { console.log("Right close clicked"); }}>
              <CloseIcon />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

export default PrimaryToolbarDemo;
