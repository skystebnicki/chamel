var React = require('react');
var Classable = require('./mixins/classable.jsx');
var ClickAwayable = require('./mixins/ClickAwayable.jsx');
var KeyLine = require('./utils/KeyLine.jsx');
var Paper = require('./Paper.jsx');
var FontIcon = require('./FontIcon.jsx');
var Menu = require('./menu/Menu.jsx');
import Popover from './Popover.jsx';

var DropDownIcon = React.createClass({

  mixins: [Classable, ClickAwayable],

  propTypes: {
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    closeOnMenuItemClick: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      open: false
    }
  },

  getDefaultProps: function() {
    return {
      closeOnMenuItemClick: true
    }
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  render: function() {
    var classes = this.getClasses('chamel-drop-down-icon', {
      'chamel-open': this.state.open
    });

    var icon;
    if (this.props.iconClassName) icon = <FontIcon className={this.props.iconClassName} />;

    return (
      <div className={classes}>
          <div className="chamel-menu-control" onClick={this._onControlClick}>
              {icon}
              {this.props.children}
          </div>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this._handleRequestClose}
          >
            <Menu
              ref="menuItems"
              menuItems={this.props.menuItems}
              onItemClick={this._onMenuItemClick} />
          </Popover>
        </div>
    );
  },

  _onControlClick: function(e) {
    e.preventDefault();

    this.setState({
      open: this.state.open ? false : true,
      anchorEl: e.currentTarget
    });
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange) this.props.onChange(e, key, payload);

    if (this.props.closeOnMenuItemClick) {
      this.setState({ open: false });
    }
  },

  _handleRequestClose: function(e) {
    this.setState({
      open: false,
    });
  }

});

module.exports = DropDownIcon;
