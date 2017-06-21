import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import DropDownArrow from '../svg-icons/drop-down-arrow';
import Paper from '../Paper/Paper';
import Menu from '../Menu/Menu';
import Popover from '../Popover/Popover';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Component for displaying dropdowns
 */
class SelectField extends Component {

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

    return (
      <div className={theme.selectField}>
        <div className={theme.selectFieldControl} onClick={this._onControlClick}>
          <Paper zDepth={0}>
            <div className={theme.selectFieldLabel}>
              {this.props.menuItems[this.state.selectedIndex].text}
            </div>
            <DropDownArrow className={theme.selectFieldIcon}/>
            <div className={theme.selectFieldUnderline}/>
          </Paper>
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this._handleRequestClose}>
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
SelectField.propTypes = {
  autoWidth: PropTypes.bool,
  onChange: PropTypes.func,
  selectedIndex: PropTypes.number,
  menuItems: PropTypes.array.isRequired
};

/**
 * An alternate theme may be passed down by a provider
 */
SelectField.contextTypes = {
  chamelTheme: PropTypes.object
};

/**
 * Set property defaults
 */
SelectField.defaultProps = {
  autoWidth: true
};

export default SelectField;
