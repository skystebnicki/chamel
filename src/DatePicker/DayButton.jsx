import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DateTime from '../utils/DateTime';
import EnhancedButton from '../Button';

class DayButton extends Component {

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
        <div className="chamel-date-picker-day-button-select"/>
        <span className="chamel-date-picker-day-button-label">{this.props.date.getDate()}</span>
      </EnhancedButton>
    ) : (
      <span className={classes}/>
    );
  }

  _handleTouchTap = (e) => {
    if (this.props.onClick) this.props.onClick(e, this.props.date);
  };

  getClasses = (initialClasses, additionalClassObj) => {
    let classString = '';

    //Initialize the classString with the classNames that were passed in
    if (this.props.className) classString += ' ' + this.props.className;

    //Add in initial classes
    if (typeof initialClasses === 'object') {
      classString += ' ' + classNames(initialClasses);
    } else {
      classString += ' ' + initialClasses;
    }

    //Add in additional classes
    if (additionalClassObj) classString += ' ' + classNames(additionalClassObj);

    //Convert the class string into an object and run it through the class set
    return classNames(this.getClassSet(classString));
  };

  getClassSet = (classString) => {
    let classObj = {};

    if (classString) {
      classString.split(' ').forEach(function (className) {
        if (className) classObj[className] = true;
      });
    }

    return classObj;
  };
}

DayButton.propTypes = {
  date: PropTypes.object,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};

export default DayButton;
