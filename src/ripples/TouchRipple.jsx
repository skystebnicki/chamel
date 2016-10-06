import React from 'react';
import ReactDOM from 'react-dom';
import Dom from '../utils/Dom';
import RippleCircle from './CircleRipple';
import ThemeService from '../styles/ChamelThemeService';

// Remove the first element of the array
const shift = ([, ...newArray]) => newArray;

/**
 * A touch ripple origninates from where the user touches/clicks
 */
class TouchRipple extends React.Component {

  /**
   * Set accepted properties
   */
  static propTypes = {
    abortOnScroll: React.PropTypes.bool,
    centerRipple: React.PropTypes.bool,
    className: React.PropTypes.string
  };

  /**
   * Set property defaults
   */
  static defaultProps = {
    show: false,
    abortOnScroll: true
  };

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
    chamelTheme: React.PropTypes.object
  };

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call paprent constructor
    super(props);

    // Touch start produces a mouse down event for compat reasons. To avoid
    // showing ripples twice we skip showing a ripple for the first mouse down
    // after a touch start. Note we don't store ignoreNextMouseDown in this.state
    // to avoid re-rendering when we change it.
    this.ignoreNextMouseDown = false;

    this.state = {
      ripples: [{
        key: 0,
        started: false,
        ending: false
      }]
    }
  }

  /**
   * Render the component
   *
   * @returns {JSX}
   */
  render() {
    let theme = (this.context.chamelTheme && this.context.chamelTheme.ripple)
        ? this.context.chamelTheme.ripple : ThemeService.defaultTheme.ripple;

    return (
      <div
        onMouseUp={this._handleMouseUp}
        onMouseDown={this._handleMouseDown}
        onMouseOut={this._handleMouseOut}
        onTouchStart={this._handleTouchStart}
        onTouchEnd={this._handleTouchEnd}>
        <div className={theme.rippleTouch}>
          {this._getRippleElements()}
        </div>
        {this.props.children}
      </div>
    );
  }

  /**
   * Called when a user starts clicking/tapping
   *
   * @param {event} e
   * @param {bool} isRippleTouchGenerated
   */
  start = (e, isRippleTouchGenerated) => {

    if (this.ignoreNextMouseDown && !isRippleTouchGenerated) {
      this.ignoreNextMouseDown = false;
      return;
    }

    let ripples = this.state.ripples;
    let nextKey = ripples[ripples.length-1].key + 1;
    let style = !this.props.centerRipple ? this._getRippleStyle(e) : {};
    let ripple;

    //Start the next unstarted ripple
    for (let i = 0; i < ripples.length; i++) {
      ripple = ripples[i];
      if (!ripple.started) {
        ripple.started = true;
        ripple.style = style;
        break;
      }
    }

    //Add an unstarted ripple at the end
    ripples.push({
      key: nextKey,
      started: false,
      ending: false
    });

    // If we just generated a ripple from a touch, ignore the next mouse down
    this.ignoreNextMouseDown = isRippleTouchGenerated;

    // Re-render unless this is a mouse event because there is a bug
    // in the onTap of the plugin 'react-tappable'. - Sky
    if ('mousedown' != e.type) {
      this.setState({
        ripples: ripples
      });
    }

  };

  /**
   * Called when a user is finished clicking
   *
   * @param {event} e
   */
  end = (e) => {
    let ripples = this.state.ripples;
    let ripple;
    let endingRipple;

    //End the the next un-ended ripple
    for (var i = 0; i < ripples.length; i++) {
      ripple = ripples[i];
      if (ripple.started && !ripple.ending) {
        ripple.ending = true;
        endingRipple = ripple;
        break;
      }
    }

    //Only update if a ripple was found
    if (endingRipple) {
      //Re-render
      this.setState({
        ripples: ripples
      });

      //Wait 2 seconds and remove the ripple from DOM
      setTimeout(() => {
        ripples.shift();
        this.setState({
          ripples: ripples
        });
      }, 2000);
    }
  };

  _handleMouseDown = (e) => {
    //only listen to left clicks
    if (e.button === 0) {
      this.start(e);
    }
  };

  _handleMouseUp = (e) => {
    this.end();
  };

  _handleMouseOut = (e) => {
    this.end();
  };

  _handleTouchStart = (event) => {

    // Not sure why we need to stop propogation, but commenting it out does nothing
    //event.stopPropagation();

    // If the user is swiping (not just tapping), save the position so we can
    // abort ripples if the user appears to be scrolling.
    if (this.props.abortOnScroll && event.touches) {
      this.startListeningForScrollAbort(event);
      this.startTime = Date.now();
    }
    this.start(event, true);

  };

  _handleTouchEnd = (e) => {
    this.end();
  };

  // Check if the user seems to be scrolling and abort the animation if so
  handleTouchMove = (event) => {
    // Stop trying to abort if we're already 300ms into the animation
    const timeSinceStart = Math.abs(Date.now() - this.startTime);
    if (timeSinceStart > 300) {
      this.stopListeningForScrollAbort();
      return;
    }

    // If the user is scrolling...
    const deltaY = Math.abs(event.touches[0].clientY - this.firstTouchY);
    const deltaX = Math.abs(event.touches[0].clientX - this.firstTouchX);

    // Call it a scroll after an arbitrary 6px (feels reasonable in testing)
    if (deltaY > 6 || deltaX > 6) {
      let currentRipples = this.state.ripples;
      const ripple = currentRipples[0];
      // This clone will replace the ripple in ReactTransitionGroup with a
      // version that will disappear immediately when removed from the DOM
      const abortedRipple = React.cloneElement(ripple, {aborted: true});
      // Remove the old ripple and replace it with the new updated one
      currentRipples = shift(currentRipples);
      currentRipples = [...currentRipples, abortedRipple];
      this.setState({ripples: currentRipples}, () => {
        // Call end after we've set the ripple to abort otherwise the setState
        // in end() merges with this and the ripple abort fails
        this.end();
      });
    }
  };

  startListeningForScrollAbort(event) {
    this.firstTouchY = event.touches[0].clientY;
    this.firstTouchX = event.touches[0].clientX;
    // Note that when scolling Chrome throttles this event to every 200ms
    // Also note we don't listen for scroll events directly as there's no general
    // way to cover cases like scrolling within containers on the page
    document.body.addEventListener('touchmove', this.handleTouchMove);
  }

  stopListeningForScrollAbort() {
    document.body.removeEventListener('touchmove', this.handleTouchMove);
  }

  _getRippleStyle = (e) => {
    let style = {};
    let el = ReactDOM.findDOMNode(this);
    let elHeight = el.offsetHeight;
    let elWidth = el.offsetWidth;
    let offset = Dom.offset(el);
    const eventCoordinates = this._getPageXY(e);

    const pointerX = eventCoordinates.x - offset.left;
    const pointerY = eventCoordinates.y - offset.top;
    let topLeftDiag = this._calcDiag(pointerX, pointerY);
    let topRightDiag = this._calcDiag(elWidth - pointerX, pointerY);
    let botRightDiag = this._calcDiag(elWidth - pointerX, elHeight - pointerY);
    let botLeftDiag = this._calcDiag(pointerX, elHeight - pointerY);
    let rippleRadius = Math.max(
      topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
    );
    let rippleSize = rippleRadius * 2;
    let left = pointerX - rippleRadius;
    let top = pointerY - rippleRadius;

    style.height = rippleSize + 'px';
    style.width = rippleSize + 'px';
    style.top = top + 'px';
    style.left = left + 'px';

    return style;
  };

  /**
   * Get x and y coordinates from an event
   */
  _getPageXY = (e) => {
    let out = {};

    if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
      var touch = e.touches[0] || e.changedTouches[0];
      out.x = touch.pageX;
      out.y = touch.pageY;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
      out.x = e.pageX;
      out.y = e.pageY;
    }

    return out;
  };

  _calcDiag(a, b) {
    return Math.sqrt((a * a) + (b * b));
  }

  _getRippleElements() {
    return this.state.ripples.map((ripple)  => {
      return (
        <RippleCircle
          key={ripple.key}
          started={ripple.started}
          ending={ripple.ending}
          style={ripple.style} />
      );
    });
  }
};

// ES6
export default TouchRipple;
