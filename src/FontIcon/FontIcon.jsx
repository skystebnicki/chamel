import React from 'react';
import Classable from '../mixins/classable';

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

// Check for commonjs
if (module) {
  module.exports = FontIcon;
}

export default FontIcon;
