import React, {Component} from 'react';
import PropTypes from 'prop-types';
import KeyLine from './utils/KeyLine';
import Paper from './Paper/Paper';
import FontIcon from './FontIcon/FontIcon';
import Menu from './Menu/Menu';
import Popover from './Popover/Popover';
import ThemeService from './styles/ChamelThemeService';

/**
 * Component for displaying dropdowns from an icon
 */
class DropDownIcon extends Component {

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
    chamelTheme: PropTypes.object
  };

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
    // Determine which theme to use
    let theme = ThemeService.defaultTheme.dropDownIcon;

    let classes = theme['chamel-drop-down-icon'];
    if (this.state.open) {
      classes += " " + theme['chamel-open'];
    }

    let icon;
    if (this.props.iconClassName) {
      icon = (<FontIcon className={this.props.iconClassName}/>);
    }

    return (
      <div className={classes}>
        <div className={theme['chamel-menu-control']} onClick={this._onControlClick}>
          {icon}
          {this.props.children}
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this._handleRequestClose}
          relative={false}
        >
          <Menu
            ref="menuItems"
            menuItems={this.props.menuItems}
            onItemClick={this._onMenuItemClick}/>
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
      this.setState({open: false});
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
