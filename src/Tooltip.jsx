var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('./mixins/classable');

var Tooltip = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    show: React.PropTypes.bool,
    touch: React.PropTypes.bool
  },

  componentDidMount: function() {
    this._setRippleSize();
  },

  componentDidUpdate: function(prevProps, prevState) {
    this._setRippleSize();
  },

  render: function() {

    var {
      className,
      label,
      ...other } = this.props;
    var classes = this.getClasses('chamel-tooltip', {
      'chamel-is-shown': this.props.show,
      'chamel-is-touch': this.props.touch
    });

    return (
      <div className={classes}>
        <div ref="ripple" className="chamel-tooltip-ripple" />
        <span className="chamel-tooltip-label">{this.props.label}</span>
      </div>
    );
  },

  _setRippleSize: function() {
    var ripple = ReactDOM.findDOMNode(this.refs.ripple);
    var tooltipSize = ReactDOM.findDOMNode(this).offsetWidth;
    var ripplePadding = this.props.touch ? 45 : 20;
    var rippleSize = tooltipSize + ripplePadding + 'px';

    if (this.props.show) {
      ripple.style.height = rippleSize;
      ripple.style.width = rippleSize;
    } else {
      ripple.style.width = '0px';
      ripple.style.height = '0px';
    }
  }

});

module.exports = Tooltip;
