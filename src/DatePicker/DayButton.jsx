import React from 'react';
import Classable from '../mixins/classable';
import DateTime from '../utils/DateTime';
import EnhancedButton from '../EnhancedButton';

var DayButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    date: React.PropTypes.object,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  render: function() {
    var {
      className,
      date,
      onClick,
      selected,
      ...other
    } = this.props;
    var classes = this.getClasses('chamel-date-picker-day-button', { 
      'chamel-is-current-date': DateTime.isEqualDate(this.props.date, new Date()),
      'chamel-is-selected': this.props.selected
    });

    return this.props.date ? (
      <EnhancedButton {...other}
        className={classes}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onClick={this._handleTouchTap}>
        <div className="chamel-date-picker-day-button-select" />
        <span className="chamel-date-picker-day-button-label">{this.props.date.getDate()}</span>
      </EnhancedButton>
    ) : (
      <span className={classes} />
    );
  },

  _handleTouchTap: function(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.date);
  }

});

module.exports = DayButton;