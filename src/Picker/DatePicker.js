import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateTime from '../utils/DateTime';
import TextField from '../Input/TextField';
import device from '../utils/device';
import classnames from 'classnames';

class DatePicker extends Component {
  /**
   * Property types we handle
   */
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
  };

  /**
   * Class constructor takes properties and passes them to the parent/super
   */
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.defaultDate,
      dialogDate: new Date(),
    };
  }

  render() {
    const { value, onChange, onFocus, ...other } = this.props;

    // Check value
    let dateValue = null;
    if (this.props.value) {
      if (this.props.value instanceof Date) {
        dateValue = DateTime.format(this.props.value);
      } else if (this.props.value === 'now') {
        dateValue = DateTime.format(new Date());
      } else {
        dateValue = this.props.value;
      }
    }

    return (
      <TextField
        {...other}
        onChange={this._handleInputChange}
        type={'date'}
        value={dateValue}
        onFocus={this._handleInputFocus}
        onClick={this._handleInputTouchTap}
      />
    );
  }

  /**
   * Handle native date input change
   */
  _handleInputChange = e => {
    const dateString = e.target.value;
    let d = null;

    /*
     * HTML5 date inputs return yyyy-mm-dd which will be parsed as UTC
     * since javascript treates all iso standards as UTC and non-standard
     * dates like mm/dd/yyyy as local (PUKE). This is changing in EMCA 2015
     * but for now we need to offset the local from UTC to make sure we use the
     * actual date the user selected
     */
    if (dateString) {
      const parts = dateString.split('-');
      // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])

      // Make a local date with the date parts
      d = new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
    }

    if (this.props.onChange) {
      this.props.onChange(null, d);
    }
  };

  _handleInputFocus = e => {
    e.target.blur();
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };
}

export default DatePicker;
