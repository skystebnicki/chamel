import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Classable from '../mixins/classable';
import DateTime from '../utils/DateTime';
import EnhancedButton from '../Button';

class DayButton extends Component {

  // mixins: [Classable],

  render() {
    let {
      className,
      date,
      onClick,
      selected,
      ...other
    } = this.props;
    const classes = this.getClasses('chamel-date-picker-day-button', {
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
  }

  _handleTouchTap = (e) => {
    if (this.props.onClick) this.props.onClick(e, this.props.date);
  };

}

DayButton.propTypes = {
  date: PropTypes.object,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};

// Check for commonjs
if (module) {
  module.exports = DayButton;
}

export default DayButton;
