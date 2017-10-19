import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import SlideInChild from './SlideInChild';

const SlideIn = props => {
  let { className, children, direction, ...other } = props;

  let classes = props.className ? props.className + ' ' : null;
  classes += 'chamel-transition-slide-in chamel-is-' + props.direction;
  //var classes = 'chamel-transition-slide-in chamel-is-' + this.props.direction;

  let newChildren = React.Children.map(
    children,
    child => {
      return (
        <SlideInChild
          key={child.key}
          direction={direction}
          getLeaveDirection={this._getLeaveDirection}
        >
          {child}
        </SlideInChild>
      );
    },
    this,
  );

  return (
    <CSSTransition
      className={classes}
      timeout={{ enter: 500, exit: 500 }}
      classNames="chamel-transition-slide-in"
      component="div"
    >
      {newChildren}
    </CSSTransition>
  );

  _getLeaveDirection = () => {
    return props.direction;
  };
};

SlideIn.propTypes = {
  className: PropTypes.string,
  enterDelay: PropTypes.number,
  childStyle: PropTypes.object,
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
};

SlideIn.defaultProps = {
  enterDelay: 0,
  direction: 'left',
};

export default SlideIn;
