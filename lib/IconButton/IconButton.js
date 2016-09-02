'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _EnhancedButton = require('../EnhancedButton');

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

var _FontIcon = require('../FontIcon/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Tooltip = require('../Tooltip/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconButton = _react2.default.createClass({
  displayName: 'IconButton',


  mixins: [_classable2.default],

  propTypes: {
    className: _react2.default.PropTypes.string,
    disabled: _react2.default.PropTypes.bool,
    iconClassName: _react2.default.PropTypes.string,
    onBlur: _react2.default.PropTypes.func,
    onFocus: _react2.default.PropTypes.func,
    tooltip: _react2.default.PropTypes.string,
    touch: _react2.default.PropTypes.bool
  },

  getInitialState: function getInitialState() {
    return {
      tooltipShown: false
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.tooltip) {
      this._positionTooltip();
    }
    if (process.NODE_ENV !== 'production') {
      if (this.props.iconClassName && this.props.children) {
        var warning = 'You have set both an iconClassName and a child icon. ' + 'It is recommended you use only one method when adding ' + 'icons to IconButtons.';
        console.warn(warning);
      }
    }
  },

  render: function render() {
    var classes = this.getClasses('chamel-icon-button');
    var tooltip = this.props.tooltip;
    var touch = this.props.touch;
    var fonticon;

    if (this.props.tooltip) {
      tooltip = _react2.default.createElement(_Tooltip2.default, {
        ref: 'tooltip',
        className: 'chamel-icon-button-tooltip',
        label: tooltip,
        show: this.state.tooltipShown,
        touch: touch });
    }

    if (this.props.iconClassName) {
      fonticon = _react2.default.createElement(_FontIcon2.default, { className: this.props.iconClassName });
    }

    return _react2.default.createElement(
      _EnhancedButton2.default,
      _extends({}, this.props, {
        ref: 'button',
        centerRipple: true,
        className: classes,
        onBlur: this._handleBlur,
        onFocus: this._handleFocus,
        onMouseOut: this._handleMouseOut,
        onMouseOver: this._handleMouseOver }),
      tooltip,
      fonticon,
      this.props.children
    );
  },

  _positionTooltip: function _positionTooltip() {
    var tooltip = _reactDom2.default.findDOMNode(this.refs.tooltip);
    var tooltipWidth = tooltip.offsetWidth;
    var buttonWidth = 48;

    tooltip.style.left = (tooltipWidth - buttonWidth) / 2 * -1 + 'px';
  },

  _showTooltip: function _showTooltip() {
    if (!this.props.disabled) this.setState({ tooltipShown: true });
  },

  _hideTooltip: function _hideTooltip() {
    this.setState({ tooltipShown: false });
  },

  _handleBlur: function _handleBlur(e) {
    this._hideTooltip();
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function _handleFocus(e) {
    this._showTooltip();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleMouseOut: function _handleMouseOut(e) {
    if (!this.refs.button.isKeyboardFocused()) this._hideTooltip();
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleMouseOver: function _handleMouseOver(e) {
    this._showTooltip();
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  }

});

// Check for commonjs
if (module) {
  module.exports = IconButton;
}

exports.default = IconButton;
module.exports = exports['default'];