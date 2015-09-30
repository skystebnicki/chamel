var React = require('react');
var Classable = require('../mixins/classable.jsx');

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

    var classes = this.getClasses('ripple-circle', {
      'is-started': this.props.started,
      'is-ending': this.props.ending
    });

    return (
      <div {...this.props} className={classes}>
        <div className="ripple-circle-inner" />
      </div>
    );
  }

});

module.exports = RippleCircle;