import React from 'react';
import ReactDOM from 'react-dom';
import Dom from '../utils/Dom';
import RippleCircle from './CircleRipple';

class TouchRipple extends React.Component {

  /**
   * Set accepted properties
   */
  static propTypes = {
    centerRipple: React.PropTypes.bool,
    className: React.PropTypes.string
  };

  /**
   * Set property defaults
   */
  static defaultProps = {
    show: false
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
        ? this.context.chamelTheme.ripple : {};

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
   */
  start = (e) => {
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

    //Re-render
    /*
    this.setState({
      ripples: ripples
    });
    */
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

  _handleTouchStart = (e) => {
    this.start(e);
  };

  _handleTouchEnd = (e) => {
    this.end();
  };

  _getRippleStyle = (e) => {
    let style = {};
    let el = ReactDOM.findDOMNode(this);
    let elHeight = el.offsetHeight;
    let elWidth = el.offsetWidth;
    let offset = Dom.offset(el);
    let pageX = e.pageX == undefined ? e.nativeEvent.pageX : e.pageX;
    let pageY = e.pageY == undefined ? e.nativeEvent.pageY : e.pageY;
    let pointerX = pageX - offset.left;
    let pointerY = pageY - offset.top;
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

// Check for commonjs
if (module) {
    module.exports = TouchRipple;
}

// ES6
export default TouchRipple;
