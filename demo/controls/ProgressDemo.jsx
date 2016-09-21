var React = require('react');
var DropDownIcon = require("../../src/DropDownIcon");
var FontIcon = require("../../src/FontIcon");
var RaisedButton = require("../../src/Button/RaisedButton");
var CodeExample = require("../CodeExample");
var LinearProgress = require("../../src/Progress/LinearProgress");
//var ComponentDoc = require('../../component-doc.jsx');

var ProgressDemoPage = React.createClass({

    getInitialState () {
        return {
            completed: 0,
            timer: null
        };
    },

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
    },

    componentWillUnmount() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
        }
    },

    render: function() {

        return (

            <div>
                <h3>Leanear</h3>
                <LinearProgress mode="determinate" value={this.state.completed} />
                <br />
                <LinearProgress mode="indeterminate"  />
            </div>

        );
    }

});

module.exports = ProgressDemoPage;
