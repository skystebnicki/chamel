import React from 'react';
import RadioDemo from './Picker/RadioDemo';
import Row from 'chamel/Grid/Row';
import Column from 'chamel/Grid/Column';
import DatePicker from 'chamel/Picker/DatePicker';
import SelectField from 'chamel/Picker/SelectField';
import SelectButtonDemo from './Picker/SelectButtonDemo';

class PickerDemo extends React.Component {
  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call parent constructor
    super(props);

    this.state = {
      dateValue: null,
    };
  }

  render() {
    var menuItems = [
      { payload: '1', text: 'Never' },
      { payload: '2', text: 'Every Night' },
      { payload: '3', text: 'Weeknights' },
      { payload: '4', text: 'Weekends' },
      { payload: '5', text: 'Weekly' },
    ];

    return (
      <div>
        <Row>
          <Column xsmall={12} medium={12}>
            <h2>{'Picker Components'}</h2>
            <p>Picker components are used to select an option from a list of pre-defined options</p>
          </Column>
        </Row>
        <Row>
          <Column xsmall={12} medium={6}>
            <h3>{'Radio Button'}</h3>
            <RadioDemo />
          </Column>
        </Row>
        <Row>
          <Column xsmall={12} medium={6}>
            <h3>{'SelectField'}</h3>
            <SelectField menuItems={menuItems} />
          </Column>
        </Row>
        <Row>
          <Column xsmall={12} medium={6}>
            <h3>{'SelectButton'}</h3>
            <SelectButtonDemo />
          </Column>
        </Row>
        <Row>
          <Column xsmall={12} medium={6}>
            <h3>{'Color Picker'}</h3>
          </Column>
        </Row>
        <Row>
          <Column xsmall={12} medium={6}>
            <h3>{'Date Picker'}</h3>
            <DatePicker
              value={this.state.dateValue}
              required={true}
              onChange={this._handleDateChange}
            />
          </Column>
        </Row>
        <Row>
          <Column xsmall={12} medium={6}>
            <h3>{'Time Picker'}</h3>
          </Column>
        </Row>
      </div>
    );
  }

  _handleDateChange = (evt, date) => {
    console.log('Change date to', date);
    this.setState({
      dateValue: date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear(),
    });
  };
}

export default PickerDemo;
