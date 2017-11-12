import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '../Input/TextField';

class TimePicker extends Component {
  /**
   * Property types we handle
   */
  static propTypes = {
    /**
     * Callback invoked when the user focuses on the time input
     */
    onFocus: PropTypes.func,

    /**
     * Called when the value changes and passes timeAsString, event as params
     */
    onChange: PropTypes.func,

    /**
     * Current value in '24hh:mm'
     */
    value: PropTypes.string,
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
    return (
      <TextField
        onChange={this._handleInputChange}
        type={'time'}
        value={this.props.value}
        onFocus={this._handleInputFocus}
      />
    );
  }

  /**
   * Handle native date input change
   */
  _handleInputChange = e => {
    const timeString = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(timeString, e);
    }
  };

  /**
   * Handle letting parent know we received focus
   */
  _handleInputFocus = e => {
    e.target.blur();
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };
}

export default TimePicker;
