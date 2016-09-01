import React from 'react';
import Classable from '../mixins/classable';
import EnhancedButton from '../EnhancedButton';

var FlatButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    label: function(props, propName, componentName){
      if (!props.children && !props.label) {
        return new Error('Warning: Required prop `label` or `children` was not specified in `'+ componentName + '`.')
      }
    },
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool
  },

  render: function() {
    var {
        label,
        primary,
        secondary,
        ...other
      } = this.props;
    var classes = this.getClasses('chamel-flat-button', {
      'chamel-is-primary': !this.props.disabled && primary,
      'chamel-is-secondary': !this.props.disabled && !primary && secondary
    });
    var children;

    if (label) children = <span className="chamel-flat-button-label">{label}</span>;
    else children = this.props.children;

    return (
      <EnhancedButton {...other}
        className={classes}>
        {children}
      </EnhancedButton>
    );
  }

});

// Check for commonjs
if (module) {
  module.exports = FlatButton;
}

export default FlatButton;
