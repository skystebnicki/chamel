import React from 'react';
import FlatButton from 'chamel/Button/FlatButton';
import Snackbar from 'chamel/Snackbar';

class PickerDemo extends React.Component {
  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call parent constructor
    super(props);

    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div>
        <FlatButton onTap={this.toggleSnackbar}>Show Snackbar</FlatButton>
        <Snackbar ref="snackbar" message={'Test notification'} timeout={3000} action={'Undo'} />
      </div>
    );
  }

  toggleSnackbar = e => {
    this.refs.snackbar.show();
  };
}

export default PickerDemo;
