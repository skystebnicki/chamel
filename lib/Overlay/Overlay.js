'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Overlay = _react2.default.createClass({
  displayName: 'Overlay',


  mixins: [_classable2.default],

  propTypes: {
    show: _react2.default.PropTypes.bool,
    autoLockScrolling: _react2.default.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      autoLockScrolling: true
    };
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (this.props.autoLockScrolling) this.props.show ? this._preventScrolling() : this._allowScrolling();
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);
    var classes = this.getClasses('chamel-overlay', {
      'chamel-is-shown': this.props.show
    });

    return _react2.default.createElement('div', { className: classes });
  },

  preventScrolling: function preventScrolling() {
    if (!this.props.autoLockScrolling) this._preventScrolling();
  },

  allowScrolling: function allowScrolling() {
    if (!this.props.autoLockScrolling) this._allowScrolling();
  },

  _preventScrolling: function _preventScrolling() {
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
  },

  _allowScrolling: function _allowScrolling() {
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = '';
  }

});

// Check for commonjs
if (module) {
  module.exports = Overlay;
}

exports.default = Overlay;
module.exports = exports['default'];