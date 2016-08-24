'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('../mixins/classable');

var Tooltip = React.createClass({
  displayName: 'Tooltip',


  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    show: React.PropTypes.bool,
    touch: React.PropTypes.bool
  },

  componentDidMount: function componentDidMount() {
    this._setRippleSize();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    this._setRippleSize();
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var label = _props.label;

    var other = _objectWithoutProperties(_props, ['className', 'label']);

    var classes = this.getClasses('chamel-tooltip', {
      'chamel-is-shown': this.props.show,
      'chamel-is-touch': this.props.touch
    });

    return React.createElement(
      'div',
      { className: classes },
      React.createElement('div', { ref: 'ripple', className: 'chamel-tooltip-ripple' }),
      React.createElement(
        'span',
        { className: 'chamel-tooltip-label' },
        this.props.label
      )
    );
  },

  _setRippleSize: function _setRippleSize() {
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

// Check for commonjs
if (module) {
  module.exports = Tooltip;
}

exports.default = Tooltip;
module.exports = exports['default'];