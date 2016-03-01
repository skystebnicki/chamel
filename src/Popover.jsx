import React from 'react';

/**
 * Main popover class handles absolute positioning paper relative to an element
 */
class Popover extends React.Component {
  constructor(props) {

    // Call paprent constructor
    super(props);

    // Set state
    this.state = {
      open: props.open
    };
  }

  render() {
    return <div>This is a popover</div>;
  }
}

/**
 * Set accepted properties
 */
Popover.propTypes = {
  open: React.PropTypes.bool
};

/**
 * Set property defaults
 */
Popover.defaultProps = {
  open: false
};

export default Popover;
