'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FocusRipple = _react2.default.createClass({
  displayName: 'FocusRipple',


  mixins: [_classable2.default],

  propTypes: {
    show: _react2.default.PropTypes.bool
  },

  componentDidMount: function componentDidMount() {
    this._setRippleSize();
  },

  render: function render() {
    var classes = this.getClasses('chamel-focus-ripple', {
      'chamel-is-shown': this.props.show
    });

    return _react2.default.createElement(
      'div',
      { className: classes },
      _react2.default.createElement('div', { className: 'chamel-focus-ripple-inner' })
    );
  },

  _setRippleSize: function _setRippleSize() {
    var el = _reactDom2.default.findDOMNode(this);
    var height = el.offsetHeight;
    var width = el.offsetWidth;
    var size = Math.max(height, width);

    el.style.height = size + 'px';
    el.style.top = size / 2 * -1 + height / 2 + 'px';
  }

});

module.exports = FocusRipple;