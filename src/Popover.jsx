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

  /**
   * Triggered after the component receives updated props
   */
  componentDidUpdate() {
    this._setPlacement();
  }

  /**
   * Render into the virtual dom
   */
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
    let el = ReactDOM.findDOMNode(this);
    let anchorEl = ReactDOM.findDOMNode(this.props.anchorEl);

    // Check if the target is inside the current component
    if (this.props.open &&
        e.target != el &&
        !Dom.isDescendant(el, e.target) &&
        e.target != anchorEl &&
        !Dom.isDescendant(anchorEl, e.target) &&
        document.documentElement.contains(e.target)) {
      if (this.props.onRequestClose) {
        this.props.onRequestClose();
      }
    }
  }

  /**
   * Reposition the popover on the page
   */
  _setPlacement() {
    if (!this.props.open) {
      return;
    }

    let targetEl = ReactDOM.findDOMNode(this);
    let anchorEl = ReactDOM.findDOMNode(this.props.anchorEl);

    const {targetOrigin, anchorOrigin} = this.props;

    const anchorPosition = Dom.offset(anchorEl);

    /*
     * Since the chamel-popover parent class is relative positioned,
     * we need to update the page aboslute position points received from
     * Dom.offset to be relative to the position of the anchor element
     */
    const relativeAnchorPosision = {
        top: 0,
        middle: anchorPosition.height / 2,
        bottom: anchorPosition.height,
        left: 0,
        center: anchorPosition.width / 2,
        right: anchorPosition.width
    }

    let targetPosition = {
      top: relativeAnchorPosision[anchorOrigin.vertical],
      left: relativeAnchorPosision[anchorOrigin.horizontal]
    };

    targetEl.style.top = `${Math.max(0, targetPosition.top)}px`;
    targetEl.style.left = `${Math.max(0, targetPosition.left)}px`;
    targetEl.style.maxHeight = `${window.innerHeight}px`;
    targetEl.style.maxWidth = `${window.innerWidth}px`;

    // Update position if out of viewing bounds
    this._applyAutoPositionIfNeeded(targetPosition, targetEl);
  }

  /**
   * If needed we can reposition based on current viewport bounds
   *
   * Make sure that the popover is not off the viewport to the right or bottom
   * of the page.
   *
   * @private
   * @param {Object} relativeTargetPosition The current relative top and left
   *  props relative to the anchorElement.
   * @param {DOMElement} targetEl Floating popover DOM element being repositioned
   */
  _applyAutoPositionIfNeeded(relativeTargetPosition, targetEl) {
    const targetPosition = Dom.offset(targetEl);

    // Movethe target position up so it is not scrolling past the bottom
    if (targetPosition.top + targetPosition.height > window.innerHeight) {
      // Initialize new top position
      let newTop = relativeTargetPosition.top;

      // Subtract enough pixels to get it inside the bounds of the window
      newTop -= (targetPosition.top + targetPosition.height) - window.innerHeight;

      // Apply the new position
      targetEl.style.top = `${newTop}px`;
    }

    // Move target position just to the left of the right outer bounds
    if (targetPosition.right > window.innerWidth) {
      // Initialize new left position
      let newLeft = relativeTargetPosition.left;

      /*
       * Subtract enough pixels to get it inside the bounds of the window
       * We need to -15 the innerWidth to make sure it will be inside the bounds if the container will have any margins or paddings
       */
      newLeft -= (targetPosition.right) - (window.innerWidth - 15);

      // Apply the new position
      targetEl.style.left = `${newLeft}px`;
    }
  }
}

/**
 * Set accepted properties
 */
Popover.propTypes = {
  open: React.PropTypes.bool,
  anchorEl: React.PropTypes.object,
  zDepth: React.PropTypes.number,

  /**
   * This is the point on the anchor where the popover
   * targetOrigin will stick to.
   * Options:
   * vertical: [top, middle, bottom]
   * horizontal: [left, center, right]
   */
  anchorOrigin: React.PropTypes.shape({
    vertical: React.PropTypes.oneOf(['top', 'middle', 'bottom']),
    horizontal: React.PropTypes.oneOf(['left', 'center', 'right'])
  }),

  /**
   * This is the point on the popover which will stick to
   * the anchors origin.
   * Options:
   * vertical: [top, middle, bottom]
   * horizontal: [left, center, right]
   */
  targetOrigin: React.PropTypes.shape({
    vertical: React.PropTypes.oneOf(['top', 'middle', 'bottom']),
    horizontal: React.PropTypes.oneOf(['left', 'center', 'right'])
  })
};

/**
 * Set property defaults
 */
Popover.defaultProps = {
  open: false,
  anchorEl: null,
  zDepth: 1,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  targetOrigin: {
    vertical: 'top',
    horizontal: 'left',
  }
};

// Check for commonjs
if (module) {
  module.exports = Popover;
}

export default Popover;
