import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Classable from './mixins/classable';
import ClickAwayable from './mixins/ClickAwayable';
import KeyLine from './utils/KeyLine';
import Paper from './Paper/Paper';
import FontIcon from './FontIcon/FontIcon';
import Menu from './Menu/Menu';
import Popover from './Popover/Popover';

/**
 * Component for displaying dropdowns from an icon
 */
class DropDownIcon extends Component {

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

}

/**
 * Set accepted properties
 */
DropDownIcon.propTypes = {
  autoWidth: PropTypes.bool,
  selectedIndex: PropTypes.number,
  onChange: PropTypes.func,
  menuItems: PropTypes.array.isRequired,
  closeOnMenuItemClick: PropTypes.bool
};

/**
 * Set property defaults
 */
DropDownIcon.defaultProps = {
  autoWidth: true,
  closeOnMenuItemClick: true
};

export default DropDownIcon;
