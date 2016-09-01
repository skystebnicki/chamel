import React from 'react';
import ReactDOM from 'react-dom';
import Classable from '../mixins/classable';

var FocusRipple = React.createClass({

  mixins: [Classable],

  propTypes: {
    show: React.PropTypes.bool
  },

  componentDidMount: function() {
    this._setRippleSize();
  },

  render: function() {
    var classes = this.getClasses('chamel-focus-ripple', {
      'chamel-is-shown': this.props.show
    });

    return (
      <div className={classes}>
        <div className="chamel-focus-ripple-inner" />
      </div>
    );
  },

  _setRippleSize: function() {
    var el = ReactDOM.findDOMNode(this);
    var height = el.offsetHeight;
    var width = el.offsetWidth;
    var size = Math.max(height, width);

    el.style.height = size + 'px';
    el.style.top = (size / 2 * -1) + (height / 2) + 'px';
  }

});

module.exports = FocusRipple;