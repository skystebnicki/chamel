import React from 'react';
import Classable from '../mixins/classable';

var RippleCircle = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    started: React.PropTypes.bool,
    ending: React.PropTypes.bool
  },

  render: function() {

    var innerClassName = this.props.innerClassName;
    var started = this.props.started;
    var ending = this.props.ending;

    var classes = this.getClasses('chamel-ripple-circle', {
      'chamel-is-started': this.props.started,
      'chamel-is-ending': this.props.ending
    });

    return (
      <div className={classes}>
        <div className="chamel-ripple-circle-inner" />
      </div>
    );
  }

});

module.exports = RippleCircle;