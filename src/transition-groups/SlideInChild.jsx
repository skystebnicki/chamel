const React = require('react');
const ReactDOM = require('react-dom');

const SlideInChild = React.createClass({

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
  },

  componentDidEnter() {
    /*
    let style = ReactDOM.findDOMNode(this).style;
    style.opacity = '1';
    AutoPrefix.set(style, 'transform', 'translate3d(0,0,0)');
    */
  },

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
  },

  render() {
    let {
      children,
      className,
      ...other,
    } = this.props;

    var classes = "chamel-transition-slide-in-child";
    if (this.props.className)
      classes += " " + this.props.className;

    return (
      <div className={classes}>
        {children}
      </div>
    );
  },

});

module.exports = SlideInChild;