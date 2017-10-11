var CodeExample = require("../CodeExample");
import React, { Component } from 'react';
import PrimaryToolbarDemo from './Toolbar/PrimaryToolBarDemo';
import SecondaryToolbarDemo from './Toolbar/SecondaryToolbarDemo';
//var ComponentDoc = require('../../component-doc.jsx');

class ToolbarPage extends Component {

  render() {
    return (
      <div>
        <h1>{"Toolbar"}</h1>
        <p>Toolbars are used to present actions and menus that are not in the
          main AppBar.
        </p>
        <h2>{"Primary Toolbar"}</h2>
        <PrimaryToolbarDemo />
        <h2>{"Secondary Toolbar"}</h2>
        <SecondaryToolbarDemo />
      </div>
    );
  }

}

module.exports = ToolbarPage;
