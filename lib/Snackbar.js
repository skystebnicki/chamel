/**
 * Render a tranient snackbar
 *

 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var CssEvent = require('./utils/CssEvent');
var Classable = require('./mixins/classable');
var ClickAwayable = require('./mixins/ClickAwayable');
var FlatButton = require('./FlatButton');

var Snackbar = React.createClass({
  displayName: 'Snackbar',


  mixins: [Classable, ClickAwayable],

  manuallyBindClickAway: true,

  propTypes: {
    action: React.PropTypes.string,
    message: React.PropTypes.string.isRequired,
    openOnMount: React.PropTypes.bool,
    onActionClick: React.PropTypes.func
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
        CssEvent.onTransitionEnd(ReactDOM.findDOMNode(this), function () {
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
      action = React.createElement(FlatButton, {
        className: 'chamel-snackbar-action',
        label: this.props.action,
        onClick: this.props.onActionClick });
    }

    return React.createElement(
      'span',
      { className: classes },
      React.createElement(
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

module.exports = Snackbar;