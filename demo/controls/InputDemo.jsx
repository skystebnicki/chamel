import React, { Component } from 'react';
import TextField from 'chamel/Input/TextField';

import IconButton from 'chamel/Button/IconButton';
import SearchIcon from 'chamel/icons/font/SearchIcon';

var dropDownData = [
  { value: 'test1', text: 'Test Entry 1' },
  { value: 'test2', text: 'Test Entry 2' },
  { value: 'test3', text: 'Test Entry 3' },
  { value: 'test4', text: 'Test Entry 4' },
  { value: 'test5', text: 'Test Entry 5' },
  { value: 'test6', text: 'Test Entry 6' },
  { value: 'test7', text: 'Test Entry 7' },
  { value: 'test8', text: 'Test Entry 8' },
  { value: 'test9', text: 'Test Entry 9' },
  { value: 'test10', text: 'Test Entry 10' },
  { value: 'test11', text: 'Test Entry 11' },
  { value: 'test12', text: 'Test Entry 12' },
  { value: 'test13', text: 'Test Entry 13' },
  { value: 'test14', text: 'Test Entry 14' },
  { value: 'test15', text: 'Test Entry 15' },
  { value: 'test16', text: 'Test Entry 16 Test Entry 1 Test Entry 1' },
];

class InputDemo extends Component {
  _handleInputFocus() {
    this.setState({
      autoFocus: true,
    });
  }

  _handleTextBlur() {
    this.setState({
      autoFocus: false,
    });
  }

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call paprent constructor
    super(props);

    this.state = {
      autoFocus: false,
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <h2>Text</h2>
          <TextField onChange={this._handleTextChange} hintText="Hint Text" />
          <TextField onChange={this._handleTextChange} floatingLabelText="Floated Label" />
          <h2>Multi Line</h2>
          <div>
            <TextField multiLine onChange={this._handleTextChange} hintText="Hint Text" />
          </div>
          <div>
            <TextField
              multiLine
              onChange={this._handleTextChange}
              floatingLabelText="Floated Label"
            />
          </div>

          <div>
            <IconButton onClick={this._handleInputFocus} key="searchGo">
              <SearchIcon />
            </IconButton>
            <TextField
              autoFocus={this.state.autoFocus}
              hintText="Search"
              onBlur={this._handleTextBlur}
            />
          </div>
        </div>
      </div>
    );
  }

  /**
   * Log changed value of a DropDown menu
   */
  _handleDropDownChange = (e, key, payload) => {
    console.log('Dropdown value changed to', payload);
  };

  /**
   * Log changed value of a DropDown menu
   */
  _handleTextChange = evt => {
    console.log('Text field value changed to', evt.target.value);
  };
}

module.exports = InputDemo;
