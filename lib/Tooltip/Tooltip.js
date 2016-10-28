'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Tooltip = _react2.default.createClass({
  displayName: 'Tooltip',


  mixins: [_classable2.default],

  propTypes: {
    className: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string.isRequired,
    show: _react2.default.PropTypes.bool,
    touch: _react2.default.PropTypes.bool
  },

  componentDidMount: function componentDidMount() {
    this._setRippleSize();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    this._setRippleSize();
  },

  render: function render() {
    var _props = this.props,
        className = _props.className,
        label = _props.label,
        other = _objectWithoutProperties(_props, ['className', 'label']);

    var classes = this.getClasses('chamel-tooltip', {
      'chamel-is-shown': this.props.show,
      'chamel-is-touch': this.props.touch
    });

    return _react2.default.createElement(
      'div',
      { className: classes },
      _react2.default.createElement('div', { ref: 'ripple', className: 'chamel-tooltip-ripple' }),
      _react2.default.createElement(
        'span',
        { className: 'chamel-tooltip-label' },
        this.props.label
      )
    );
  },

  _setRippleSize: function _setRippleSize() {
    var ripple = _reactDom2.default.findDOMNode(this.refs.ripple);
    var tooltipSize = _reactDom2.default.findDOMNode(this).offsetWidth;
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