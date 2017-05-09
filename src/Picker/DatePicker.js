import React, {Component, PropTypes} from 'react';
import DateTime from '../utils/DateTime';
import KeyCode from '../utils/KeyCode';
import TextField from '../Input/TextField';
import device from '../utils/device';
import classnames from 'classnames';

class DatePicker extends Component {

  /**
   * Property types we handle
   */
  static propTypes = {
    defaultDate: PropTypes.object,
    formatDate: PropTypes.func,
    mode: PropTypes.oneOf(['portrait', 'landscape', 'inline']),
    onFocus: PropTypes.func,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onShow: PropTypes.func,
    onDismiss: .PropTypes.func,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    autoOk: PropTypes.bool,
    preferNative: PropTypes.bool,
  };

  static defaultProps = {
    formatDate: DateTime.format,
    minDate: null,
    maxDate: null,
    autoOk: false,
    preferNative: true
  };

  /**
   * Class constructor takes properties and passes them to the parent/super
   */
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.defaultDate,
      dialogDate: new Date()
    };
  }

  render() {
    const {
      formatDate,
      mode,
      onChange,
      onFocus,
      onClick,
      onShow,
      onDismiss,
      minDate,
      maxDate,
      autoOk,
      ...other
    } = this.props;
    const classes = classnames('chamel-date-picker', {
      'chamel-is-landscape': this.props.mode === 'landscape',
      'chamel-is-inline': this.props.mode === 'inline'
    });
    let defaultInputValue;

    if (this.props.defaultDate) {
      defaultInputValue = this.props.formatDate(this.props.defaultDate);
    }

    const inputType = (this.props.preferNative) ? "date" : "text";

    // If we are using the native input then we need to get value when changed
    const inpHndleOnChange = ('date' === inputType) ? this._handleInputChange : null;

    // We need to exclude the preferNative property as it is an unkown props for <input> tag
    if(other.hasOwnProperty("preferNative")) {
      delete other.preferNative;
    }

    return (
      <div className={classes}>
        <TextField
          {...other}
          onChange={inpHndleOnChange}
          ref="input"
          type={inputType}
          defaultValue={defaultInputValue}
          onFocus={this._handleInputFocus}
          onClick={this._handleInputTouchTap}
        />
      </div>

    );
  }

  getDate() {
    return this.state.date;
  }

  setDate(d) {
    this.setState({
      date: d
    });
    this.refs.input.setValue(this.props.formatDate(d));
  }

  _handleDialogAccept(d) {
    this.setDate(d);
    if (this.props.onChange) this.props.onChange(null, d);
  }

  /**
   * Handle native date input change
   */
  _handleInputChange = (e) => {
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
      d = new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
    }

    if (this.props.onChange) this.props.onChange(null, d);
  };

  _handleInputFocus = (e) => {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  }

  _handleInputTouchTap = (e) => {
    this.setState({
      dialogDate: this.getDate()
    });

    /*
     * If this.props.preferNative is set to true
     * then we will only display the window if the browser
     * does not support a native date type
     */
    if (!this.props.preferNative || !device.test.inputtypes.date){
      this.refs.dialogWindow.show();
    }

    if (this.props.onClick) this.props.onClick(e);
  }

}

export default DatePicker;
