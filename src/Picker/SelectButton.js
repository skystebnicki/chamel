import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import DropDownArrow from '../svg-icons/drop-down-arrow';
import Paper from '../Paper/Paper';
import Menu from '../Menu/Menu';
import Popover from '../Popover/Popover';
import FontIcon from '../FontIcon';
import IconButton from '../Button/IconButton';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Component for displaying dropdowns
 */
class SelectButton extends Component {

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
   * Popover has entered the dom
   */
  componentDidMount() {
    if (this.props.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(this.props);
    }
  }

  /**
   * Componenent is about to exit the dom
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(nextProps);
    }
  }

  /**
   * Render Componenent
   */
  render() {

    // Determine which theme to use
    let theme = (this.context.chamelTheme && this.context.chamelTheme.picker)
      ? this.context.chamelTheme.picker : ThemeService.defaultTheme.picker;

    let icon = (typeof this.props.icon === 'string') ?
      (<FontIcon className={this.props.icon}/>) : this.props.icon;

    // Use default dropdown icon
    if (!icon && this.props.children) {
      icon = this.props.children;
    } else {
      icon = <DropDownArrow />;
    }

    return (
      <div className={theme.selectButtonCon}>
        <div style={{align: "top"}}>
          <IconButton
            className={this.props.className}
            onTap={this._onControlClick}>
            {icon}
          </IconButton>
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          rePositionToBottomRight={true}
          onRequestClose={this._handleRequestClose}
          relative={false}>
          <Menu
            ref="menuItems"
            autoWidth={this.props.autoWidth}
            selectedIndex={this.state.selectedIndex}
            menuItems={this.props.menuItems}
            onItemClick={this._onMenuItemClick}
          />
        </Popover>
      </div>
    );
  }

  /**
   * Set which menu item is selected
   *
   * @private
   * @param {Object} props The props we are setting
   */
  _setSelectedIndex = (props) => {
    const selectedIndex = props.selectedIndex;

    if (process.env.NODE_ENV !== 'production' && selectedIndex < 0) {
      console.warn('Cannot set selectedIndex to a negative index.', selectedIndex);
    }

    this.setState({selectedIndex: (selectedIndex > -1) ? selectedIndex : 0});
  }

  /**
   * Meny control clicked handler
   *
   * @private
   * @param {DOMEvent} e The click event fired
   */
  _onControlClick = (e) => {
    e.preventDefault();

    this.setState({
      open: !this.state.open,
      anchorEl: e.currentTarget
    });
  };

  /**
   * Triggered when a menu item gets clicked
   *
   * @private
   * @param {DOMEvent} e The event fired through
   * @param {int} key The index of the item clicked - this will be deprecated soon
   * @param {Object} payload Whatever payload was passed to the menu
   */
  _onMenuItemClick = (e, key, payload) => {
    if (this.props.onChange && this.state.selectedIndex !== key) {
      this.props.onChange(e, key, payload);
    }

    this.setState({
      selectedIndex: key,
      open: false
    });

    // Prevent ghost clicks
    e.preventDefault();
    e.stopPropagation();

    // TODO: Not sure if this is needed with the above being called
    e.nativeEvent.stopImmediatePropagation();
  }

  /**
   * Handle when the popover gets closed
   *
   * @private
   * @param {DOMEvent} e The click event fired
   */
  _handleRequestClose = (e) => {
    this.setState({
      open: false,
    });
  }
}

/**
 * Set accepted properties
 */
SelectButton.propTypes = {
  onChange: PropTypes.func,
  selectedIndex: PropTypes.number,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  menuItems: PropTypes.array.isRequired,

  /**
   * Optional additional class for the icon button
   */
  className: PropTypes.string,

  /**
   * Optional children can be used to define content
   */
  children: PropTypes.node
};

/**
 * Set property defaults
 */
SelectButton.defaultProps = {
  autoWidth: true,
  children: null
};

/**
 * An alternate theme may be passed down by a provider
 */
SelectButton.contextTypes = {
  chamelTheme: PropTypes.object
};

export default SelectButton;
