/**
 * Render a tranient snackbar
 *

 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var CssEvent = require('./utils/CssEvent.jsx');
var Classable = require('./mixins/classable.jsx');
var ClickAwayable = require('./mixins/ClickAwayable.jsx');
var FlatButton = require('./FlatButton.jsx');

var Snackbar = React.createClass({

  mixins: [Classable, ClickAwayable],

  manuallyBindClickAway: true,

  propTypes: {
    action: React.PropTypes.string,
    message: React.PropTypes.string.isRequired,
    openOnMount: React.PropTypes.bool,
    onActionClick: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      open: this.props.openOnMount || false
    };
  },

  componentClickAway: function() {
    this.dismiss();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevState.open != this.state.open) {
      if (this.state.open) {
        //Only Bind clickaway after transition finishes
        CssEvent.onTransitionEnd(ReactDOM.findDOMNode(this), function() {
          this._bindClickAway();
        }.bind(this));
      } else {
        this._unbindClickAway();
      }
    }
  },

  render: function() {
    var classes = this.getClasses('chamel-snackbar', {
      'chamel-is-open': this.state.open
    }); 
    var action;

    if (this.props.action) {
      action = (
        <FlatButton
          className="chamel-snackbar-action"
          label={this.props.action}
          onClick={this.props.onActionClick} />
      );
    }

    return (
      <span className={classes}>
        <span className="chamel-snackbar-message">{this.props.message}</span>
        {action}
      </span>
    );
  },

  show: function() {
    this.setState({ open: true });
  },
  
  dismiss: function() {
    this.setState({ open: false });
  }

});


module.exports = Snackbar;
