import React from 'react';
import ReactDOM from 'react-dom';
var Events = require('./utils/Events.jsx');
var Dom = require('./utils/Dom.jsx');

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

  /**
   * Popover has entered the dom
   */
  componentDidMount() {
    Events.on(document, 'click', this._checkClickAway);
  }

  /**
   * Componenent is about to exit the dom
   */
  componentWillUnmount() {
    Events.off(document, 'click', this._checkClickAway);
  }

  render() {
    var classes = "chamel-popover";
    if (this.props.open) {
      classes += " chamel-popover-visible";
    }
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }

  /**
   * Handle when the user clicks away from the popup
   */
  _checkClickAway = (e) => {
    var el = ReactDOM.findDOMNode(this);
    let anchorEl = ReactDOM.findDOMNode(this.props.anchorEl);

    // Check if the target is inside the current component
    if (this.props.open &&
        e.target != el &&
        !Dom.isDescendant(el, e.target) &&
        e.target != anchorEl &&
        !Dom.isDescendant(anchorEl, e.target) &&
        document.documentElement.contains(e.target)) {
      if (this.props.onRequestClose) this.props.onRequestClose();
    }
  }
}

/**
 * Set accepted properties
 */
Popover.propTypes = {
  open: React.PropTypes.bool,
  anchorEl: React.PropTypes.object,
  zDepth: React.PropTypes.number
};

/**
 * Set property defaults
 */
Popover.defaultProps = {
  open: false,
  anchorEl: null,
  zDepth: 1
};

// Check for commonjs
if (module) {
  module.exports = Popover;
}

export default Popover;
