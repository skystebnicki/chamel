import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import SlideInChild from './SlideInChild';

const SlideIn = props => {
  let { className, children, direction, ...other } = props;

  let classes = props.className ? props.className + ' ' : null;
  classes += 'chamel-transition-slide-in chamel-is-' + props.direction;
  //var classes = 'chamel-transition-slide-in chamel-is-' + this.props.direction;

  // If the slide-in has no children then just return an empty div
  if (!children) {
    return <div />;
  }

  let newChildren = React.Children.map(
    children,
    child => {
      return (
        <SlideInChild
          key={child.key}
          direction={direction}
          getLeaveDirection={() => {
            return props.direction;
          }}
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
