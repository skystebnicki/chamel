var React = require("react");
var AppBar = require("chamel/AppBar");
import { HashRouter, Match, Miss, Link } from 'react-router'

var CodeExample = require("../../CodeExample");
import ExampleSimple from './ExampleSimple';

var PopoverDemo = React.createClass({

  render: function() {
    let pathname = this.props.pathname;

    return (
      <div className="row">
        <div className="col-xs-12">
          <ExampleSimple />
        </div>
      </div>
    );
  }

});

module.exports = PopoverDemo;
