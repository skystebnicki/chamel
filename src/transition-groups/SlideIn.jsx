import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SlideInChild from './SlideInChild';


const SlideIn = React.createClass({

  propTypes: {
    className: PropTypes.string,
    enterDelay: PropTypes.number,
    childStyle: PropTypes.object,
    direction: PropTypes.oneOf(['left', 'right', 'up', 'down'])
  },

  getDefaultProps() {
    return {
      enterDelay: 0,
      direction: 'left',
    };
  },

  render() {
    let {
      className,
      children,
      direction,
      ...other
    } = this.props;

    let classes = (this.props.className) ? this.props.className + ' ' : null;
    classes += 'chamel-transition-slide-in chamel-is-' + this.props.direction;
    //var classes = 'chamel-transition-slide-in chamel-is-' + this.props.direction;

    let newChildren = React.Children.map(children, (child) => {
      return (
        <SlideInChild
          key={child.key}
          direction={direction}
          getLeaveDirection={this._getLeaveDirection}>
          {child}
        </SlideInChild>
      );
    }, this);

    return (
      <ReactCSSTransitionGroup
        className={classes}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionName="chamel-transition-slide-in"
        component="div">
        {newChildren}
      </ReactCSSTransitionGroup>
    );
  },

  _getLeaveDirection() {
    return this.props.direction;
  },

});

module.exports = SlideIn;
