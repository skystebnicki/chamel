import React from 'react';
import SvgIcon from './svg-icon';

var DropDownArrow = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <polygon points="7,9.5 12,14.5 17,9.5 "/>
      </SvgIcon>
    );
  }

});

module.exports = DropDownArrow;