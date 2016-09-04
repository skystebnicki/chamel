import React from 'react';
import ReactDOM from 'react-dom';
import Dom from '../utils/Dom';
import RippleCircle from './CircleRipple';

class TouchRipple extends React.Component {

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
        <div className={theme.touch}>
          {this._getRippleElements()}
        </div>
        {this.props.children}
      </div>
    );
  }

  start = (e) => {
    var ripples = this.state.ripples;
    var nextKey = ripples[ripples.length-1].key + 1;
    var style = !this.props.centerRipple ? this._getRippleStyle(e) : {};
    var ripple;

    //Start the next unstarted ripple
    for (var i = 0; i < ripples.length; i++) {
      ripple = ripples[i];
      if (!ripple.started) {
        ripple.started = true;
        ripple.style = style;
        break;
      }
    };

    //Add an unstarted ripple at the end
    ripples.push({
      key: nextKey,
      started: false,
      ending: false
    });

    //Re-render
    this.setState({
      ripples: ripples
    });
  }

  end = (e) => {
    var ripples = this.state.ripples;
    var ripple;
    var endingRipple;

    //End the the next un-ended ripple
    for (var i = 0; i < ripples.length; i++) {
      ripple = ripples[i];
      if (ripple.started && !ripple.ending) {
        ripple.ending = true;
        endingRipple = ripple;
        break;
      }
    };

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
  }

  _handleMouseDown = (e) => {
    //only listen to left clicks
    if (e.button === 0) this.start(e);
  }

  _handleMouseUp = (e) => {
    this.end();
  }

  _handleMouseOut = (e) => {
    this.end();
  }

  _handleTouchStart = (e) => {
    this.start(e);
  }

  _handleTouchEnd = (e) => {
    this.end();
  }

  _getRippleStyle = (e) => {
    var style = {};
    var el = ReactDOM.findDOMNode(this);
    var elHeight = el.offsetHeight;
    var elWidth = el.offsetWidth;
    var offset = Dom.offset(el);
    var pageX = e.pageX == undefined ? e.nativeEvent.pageX : e.pageX;
    var pageY = e.pageY == undefined ? e.nativeEvent.pageY : e.pageY;
    var pointerX = pageX - offset.left;
    var pointerY = pageY - offset.top;
    var topLeftDiag = this._calcDiag(pointerX, pointerY);
    var topRightDiag = this._calcDiag(elWidth - pointerX, pointerY);
    var botRightDiag = this._calcDiag(elWidth - pointerX, elHeight - pointerY);
    var botLeftDiag = this._calcDiag(pointerX, elHeight - pointerY);
    var rippleRadius = Math.max(
      topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
    );
    var rippleSize = rippleRadius * 2;
    var left = pointerX - rippleRadius;
    var top = pointerY - rippleRadius;

    style.height = rippleSize + 'px';
    style.width = rippleSize + 'px';
    style.top = top + 'px';
    style.left = left + 'px';

    return style;
  }

  _calcDiag(a, b) {
    return Math.sqrt((a * a) + (b * b));
  }

  _getRippleElements() {
    return this.state.ripples.map(function(ripple) {
      return (
        <RippleCircle
          key={ripple.key}
          started={ripple.started}
          ending={ripple.ending}
          style={ripple.style} />
      );
    }.bind(this));
  }
};

/**
 * Set accepted properties
 */
TouchRipple.propTypes = {
  centerRipple: React.PropTypes.bool,
  className: React.PropTypes.string
}

/**
 * Set property defaults
 */
TouchRipple.defaultProps = {
  show: false
}

/**
 * An alternate theme may be passed down by a provider
 */
TouchRipple.contextTypes = {
    chamelTheme: React.PropTypes.object
};

// Check for commonjs
if (module) {
    module.exports = TouchRipple;
}

// ES6
export default TouchRipple;
