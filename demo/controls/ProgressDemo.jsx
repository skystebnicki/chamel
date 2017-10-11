import React, { Component } from 'react';
var DropDownIcon = require("chamel/DropDownIcon");
var FontIcon = require("chamel/FontIcon");
var RaisedButton = require("chamel/Button/RaisedButton");
var CodeExample = require("../CodeExample");
var LinearProgress = require("chamel/Progress/LinearProgress");
var CircularProgress = require("chamel/Progress/CircularProgress");
//var ComponentDoc = require('../../component-doc.jsx');

class ProgressDemoPage extends Component {

    /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call paprent constructor
    super(props);

    this.state = {
        completed: 0,
        timer: null
    }
  }

    componentDidMount() {
        let self = this;

        let id = window.setInterval(() => {

            let diff = Math.random() * 10;

            self.setState({
                completed: self.state.completed + diff,
            });

            if (self.state.completed > 100) {
                window.clearInterval(id);
            }
        }, 1000);

        this.setState({timer: id});
    }

    componentWillUnmount() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
        }
    }

    render() {

        return (

            <div>
                <h3>Leanear</h3>
                <LinearProgress mode="determinate" value={this.state.completed} />
                <br />
                <LinearProgress mode="indeterminate"  />
                <h3>Circular</h3>
                <CircularProgress mode='indeterminate' multicolor />
                <br />
                <CircularProgress mode='determinate' value={this.state.completed} />
            </div>

        );
    }

}

module.exports = ProgressDemoPage;
