import React from 'react';
import Classable from '../mixins/classable';

var SvgIcon = React.createClass({

  mixins: [Classable],

  render: function() {
    var classes = this.getClasses('chamel-svg-icon');

    return (
      <svg
        {...this.props}
        className={classes}
        viewBox="0 0 24 24">
        {this.props.children}
      </svg>
    );
  }

});

module.exports = SvgIcon;