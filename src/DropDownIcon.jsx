import React from 'react';
var Classable = require('./mixins/classable.jsx');
var ClickAwayable = require('./mixins/ClickAwayable.jsx');
var KeyLine = require('./utils/KeyLine.jsx');
var Paper = require('./Paper.jsx');
var FontIcon = require('./FontIcon.jsx');
var Menu = require('./menu/Menu.jsx');
import Popover from './Popover.jsx';

/**
 * Component for displaying dropdowns from an icon
 */
class DropDownIcon extends React.Component {

  /**
   * Class constructor takes properties and passes them to the parent/super
   */
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
      selectedIndex: props.selectedIndex || 0
    };
  }

  /**
   * Render Componenent
   */
  render() {
    let classes = 'chamel-drop-down-icon';
    if (this.state.open) {
      classes += " chamel-open";
    }

    var icon;
    if (this.props.iconClassName) {
      icon = (<FontIcon className={this.props.iconClassName} />);
    }

    return (
      <div className={classes}>
          <div className="chamel-menu-control" onClick={this._onControlClick}>
              {icon}
              {this.props.children}
          </div>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this._handleRequestClose}
          >
            <Menu
              ref="menuItems"
              menuItems={this.props.menuItems}
              onItemClick={this._onMenuItemClick} />
          </Popover>
        </div>
    );
  }

  _onControlClick = (e) => {
    e.preventDefault();

    this.setState({
      open: this.state.open ? false : true,
      anchorEl: e.currentTarget
    });
  }

  _onMenuItemClick = (e, key, payload) => {
    if (this.props.onChange) this.props.onChange(e, key, payload);

    if (this.props.closeOnMenuItemClick) {
      this.setState({ open: false });
    }
  }

  _handleRequestClose = (e) => {
    this.setState({
      open: false,
    });
  }

};

/**
 * Set accepted properties
 */
DropDownIcon.propTypes = {
  autoWidth: React.PropTypes.bool,
  selectedIndex: React.PropTypes.number,
  onChange: React.PropTypes.func,
  menuItems: React.PropTypes.array.isRequired,
  closeOnMenuItemClick: React.PropTypes.bool
};

/**
 * Set property defaults
 */
DropDownIcon.defaultProps = {
  autoWidth: true,
  closeOnMenuItemClick: true
};

// Check for commonjs
if (module) {
  module.exports = DropDownIcon;
}

export default DropDownIcon;
