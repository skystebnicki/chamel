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
    var classes = "chamel-popover";
    if (this.props.open) {
      classes += " chamel-popover-visible";
    }
    return <div className={classes}>This is a popover</div>;
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
