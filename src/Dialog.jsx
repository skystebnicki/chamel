var React = require('react');
var Classable = require('./mixins/classable.jsx');
var DialogWindow = require('./DialogWindow.jsx');

var Dialog = React.createClass({

  mixins: [Classable],

  propTypes: {
    title: React.PropTypes.node
  },

  render: function() {
    var {
      className,
      ...other
    } = this.props;
    var classes = this.getClasses('chamel-dialog');

    return (
      <DialogWindow
        {...other}
        ref="dialogWindow"
        className={classes}>

        <div ref="dialogContent" className="chamel-dialog-content">
          {this.props.children}
        </div>

      </DialogWindow>
    );
  },

  dismiss: function() {
    this.refs.dialogWindow.dismiss();
  },

  show: function() {
    this.refs.dialogWindow.show();
  },

  reposition: function() {
    this.refs.dialogWindow.reposition();
  }

});

module.exports = Dialog;