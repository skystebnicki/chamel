import React from 'react';
import ReactDOM from 'react-dom';

const SlideInChild = (props) => {

  componentWillEnter(callback) {
    /*
    let style = ReactDOM.findDOMNode(this).style;
    let x = this.props.direction === 'left' ? '100%' :
      this.props.direction === 'right' ? '-100%' : '0';
    let y = this.props.direction === 'up' ? '100%' :
      this.props.direction === 'down' ? '-100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(() => {
      if (this.isMounted()) callback();
    }, this.props.enterDelay);
    */
  }

  componentDidEnter() {
    /*
    let style = ReactDOM.findDOMNode(this).style;
    style.opacity = '1';
    AutoPrefix.set(style, 'transform', 'translate3d(0,0,0)');
    */
  }

  componentWillLeave(callback) {
    /*
    let style = ReactDOM.findDOMNode(this).style;
    let direction = this.props.getLeaveDirection();
    let x = direction === 'left' ? '-100%' :
      direction === 'right' ? '100%' : '0';
    let y = direction === 'up' ? '-100%' :
      direction === 'down' ? '100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(() => {
      if (this.isMounted()) callback();
    }, 450);
    */
  }

  let {
    children,
    className,
    ...other
  } = props;

  let classes = "chamel-transition-slide-in-child";
  if (props.className)
    classes += " " + props.className;

  return (
    <div className={classes}>
      {children}
    </div>
  );

}

export default SlideInChild;
