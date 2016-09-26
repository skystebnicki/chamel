import React from 'react';
import AppBar from 'chamel/AppBar';
import AppBarRightToolbar from 'chamel/AppBar/AppBarRightToolbar';
import IconButton from 'chamel/Button/IconButton';
import CloseIcon from 'chamel/icons/font/CloseIcon';
import ArrowDownIcon from 'chamel/icons/font/ArrowDownIcon';
import SelectButton from 'chamel/Picker/SelectButton';

class AppBarFixedDemo extends React.Component {

  render () {
    const leftIcon = (
      <IconButton onTap={(e) => { console.log("Left close clicked"); }}>
        <CloseIcon />
      </IconButton>
    );

    const menuItems = [
      { payload: '1', text: 'Never' },
      { payload: '2', text: 'Every Night' },
      { payload: '3', text: 'Weeknights' },
      { payload: '4', text: 'Weekends' },
      { payload: '5', text: 'Weekly' },
    ];

    const rightIcon = [
      <IconButton key={"icon2"} onTap={(e) => { console.log("Right close clicked"); }}>
        <CloseIcon />
      </IconButton>,
      <IconButton key={"icon3"} onTap={(e) => { console.log("Right close clicked"); }}>
        <CloseIcon />
      </IconButton>,
      <SelectButton key={"dropdown"} menuItems={menuItems}>
        <ArrowDownIcon />
      </SelectButton>
    ];

    // Make the div scrollable so that we can test the fixed behavior
    let scrollStyle = {height: "3000px"};

    return (
      <div>
          <AppBar
            title="Test"
            iconElementLeft={leftIcon}
            iconElementRight={rightIcon}
            fixed={true}
          />
          <div style={scrollStyle}>Long scrolled content container</div>
      </div>
    );
  }
};

export default AppBarFixedDemo;
