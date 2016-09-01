/**
 * Render a tranient snackbar
 */
import React from 'react';
import ReactDOM from 'react-dom';
import CssEvent from '../utils/CssEvent';
import Classable from '../mixins/classable';
import ClickAwayable from '../mixins/ClickAwayable';
import FlatButton from '../FlatButton';

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


// Check for commonjs
if (module) {
  module.exports = Snackbar;
}

export default Snackbar;
