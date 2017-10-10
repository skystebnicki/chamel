var React = require('react');
var DropDownIcon = require("chamel/DropDownIcon");
var FontIcon = require("chamel/FontIcon");
var RaisedButton = require("chamel/Button/RaisedButton");
var CodeExample = require("../CodeExample");
var LinearProgress = require("chamel/Progress/LinearProgress");
var CircularProgress = require("chamel/Progress/CircularProgress");
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
                <h3>Circular</h3>
                <CircularProgress mode='indeterminate' multicolor />
                <br />
                <CircularProgress mode='determinate' value={this.state.completed} />
            </div>

        );
    }

});

module.exports = ProgressDemoPage;
