'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RippleCircle = _react2.default.createClass({
  displayName: 'RippleCircle',


  mixins: [_classable2.default],

  propTypes: {
    className: _react2.default.PropTypes.string,
    started: _react2.default.PropTypes.bool,
    ending: _react2.default.PropTypes.bool
  },

  render: function render() {

    var innerClassName = this.props.innerClassName;
    var started = this.props.started;
    var ending = this.props.ending;

    var classes = this.getClasses('chamel-ripple-circle', {
      'chamel-is-started': this.props.started,
      'chamel-is-ending': this.props.ending
    });

    return _react2.default.createElement(
      'div',
      { className: classes },
      _react2.default.createElement('div', { className: 'chamel-ripple-circle-inner' })
    );
  }

});

module.exports = RippleCircle;