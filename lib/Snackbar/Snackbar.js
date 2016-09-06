'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CssEvent = require('../utils/CssEvent');

var _CssEvent2 = _interopRequireDefault(_CssEvent);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _ClickAwayable = require('../mixins/ClickAwayable');

var _ClickAwayable2 = _interopRequireDefault(_ClickAwayable);

var _FlatButton = require('../FlatButton/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Render a tranient snackbar
 */
var Snackbar = _react2.default.createClass({
  displayName: 'Snackbar',


  mixins: [_classable2.default, _ClickAwayable2.default],

  manuallyBindClickAway: true,

  propTypes: {
    action: _react2.default.PropTypes.string,
    message: _react2.default.PropTypes.string.isRequired,
    openOnMount: _react2.default.PropTypes.bool,
    onActionClick: _react2.default.PropTypes.func
  },

  getInitialState: function getInitialState() {
    return {
      open: this.props.openOnMount || false
    };
  },

  componentClickAway: function componentClickAway() {
    this.dismiss();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (prevState.open != this.state.open) {
      if (this.state.open) {
        //Only Bind clickaway after transition finishes
        _CssEvent2.default.onTransitionEnd(_reactDom2.default.findDOMNode(this), function () {
          this._bindClickAway();
        }.bind(this));
      } else {
        this._unbindClickAway();
      }
    }
  },

  render: function render() {
    var classes = this.getClasses('chamel-snackbar', {
      'chamel-is-open': this.state.open
    });
    var action;

    if (this.props.action) {
      action = _react2.default.createElement(_FlatButton2.default, {
        className: 'chamel-snackbar-action',
        label: this.props.action,
        onClick: this.props.onActionClick });
    }

    return _react2.default.createElement(
      'span',
      { className: classes },
      _react2.default.createElement(
        'span',
        { className: 'chamel-snackbar-message' },
        this.props.message
      ),
      action
    );
  },

  show: function show() {
    this.setState({ open: true });
  },

  dismiss: function dismiss() {
    this.setState({ open: false });
  }

});

// Check for commonjs
if (module) {
  module.exports = Snackbar;
}

exports.default = Snackbar;
module.exports = exports['default'];