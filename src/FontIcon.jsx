var React = require('react');
var Classable = require('./mixins/classable.jsx');

var FontIcon = React.createClass({

  mixins: [Classable],

  render: function() {

    var className = this.props.className;
    var classes = this.getClasses('chamel-font-icon');

    return (
      <span {...this.props} className={classes} />
    );
  }

});

module.exports = FontIcon;
