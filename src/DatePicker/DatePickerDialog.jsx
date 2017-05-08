import React, {Component} from 'react';
import PropTypes from 'prop-types';
import KeyCode from '../utils/KeyCode';
import Calendar from './Calendar';
import Dialog from '../Dialog/Dialog';
import FlatButton from '../Button/FlatButton';

class DatePickerDialog extends Component {

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call parent constructor
    super(props);

    this.state = {
      isCalendarActive: false
    };
  }

  componentDidMount() {
    Events.on(window, 'keyup', this._handleWindowKeyUp);
  };

  componentWillUnmount() {
    Events.off(window, 'keyup', this._handleWindowKeyUp);
  };

  render() {
    var {
      initialDate,
      onAccept,
      ...other
      } = this.props;
    var classes = this.getClasses('chamel-date-picker-dialog');
    var actions = [
      <FlatButton
        key={0}
        label="Cancel"
        secondary={true}
        onClick={this._handleCancelTouchTap}/>,
      <FlatButton
        key={1}
        label="OK"
        secondary={true}
        onClick={this._handleOKTouchTap}/>
    ];

    if (this.props.autoOk) {
      actions = actions.slice(0, 1);
    }

    return (
      <Dialog {...other}
        ref="dialogWindow"
        className={classes}
        actions={actions}
        onDismiss={this._handleDialogDismiss}
        onShow={this._handleDialogShow}
        repositionOnUpdate={false}>
        <Calendar
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          ref="calendar"
          onSelectedDate={this._onSelectedDate}
          initialDate={this.props.initialDate}
          isActive={this.state.isCalendarActive}/>
      </Dialog>
    );
  }

  show = () => {
    this.refs.dialogWindow.show();
  };

  dismiss = () => {
    this.refs.dialogWindow.dismiss();
  }

  _onSelectedDate = () => {
    if (this.props.autoOk) {
      setTimeout(this._handleOKTouchTap.bind(this), 300);
    }
  };

  _handleCancelTouchTap = () => {
    this.dismiss();
  };

  _handleOKTouchTap = () => {
    this.dismiss();
    if (this.props.onAccept) {
      this.props.onAccept(this.refs.calendar.getSelectedDate());
    }
  };

  _handleDialogShow = () => {
    this.setState({
      isCalendarActive: true
    });

    if (this.props.onShow) {
      this.props.onShow();
    }
  };

  _handleDialogDismiss = () => {
    this.setState({
      isCalendarActive: false
    });

    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  };

  _handleWindowKeyUp = (e) => {
    if (this.refs.dialogWindow.isOpen()) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    }
  };

  getClasses = (initialClasses, additionalClassObj) => {
    var classString = '';

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
    var classObj = {};

    if (classString) {
      classString.split(' ').forEach(function (className) {
        if (className) classObj[className] = true;
      });
    }

    return classObj;
  };
}

DatePickerDialog.propTypes = {
  initialDate: PropTypes.object,
  onAccept: PropTypes.func,
  onShow: PropTypes.func,
  onDismiss: PropTypes.func,
  minDate: PropTypes.object,
  maxDate: PropTypes.object
};

export default DatePickerDialog;
