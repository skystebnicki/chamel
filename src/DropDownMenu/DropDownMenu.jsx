import React from 'react';
var ReactDOM = require('react-dom');
var Classable = require('../mixins/classable');
var ClickAwayable = require('../mixins/ClickAwayable');
var DropDownArrow = require('../svg-icons/drop-down-arrow');
var Paper = require('../Paper');
var Menu = require('../menu/Menu');
import Popover from '../Popover';

/**
 * Component for displaying dropdowns
 */
class DropDownMenu extends React.Component {

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
  componentWillUnmount() {
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

    let classes = 'chamel-drop-down-menu';
    if (this.state.open) {
      classes += " chamel-open";
    }

    return (
      <div className={classes}>
        <div className="chamel-menu-control" onClick={this._onControlClick}>
          <Paper zDepth={0} >
            <div className="chamel-menu-label">
              {this.props.menuItems[this.state.selectedIndex].text}
            </div>
            <DropDownArrow className="chamel-menu-drop-down-icon" />
            <div className="chamel-menu-control-underline" />
          </Paper>
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this._handleRequestClose}
        >
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
    var selectedIndex = props.selectedIndex;

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
      open: this.state.open ? false : true,
      anchorEl: e.currentTarget
    });
  }

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

};

/**
 * Set accepted properties
 */
DropDownMenu.propTypes = {
  autoWidth: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  selectedIndex: React.PropTypes.number,
  menuItems: React.PropTypes.array.isRequired
};

/**
 * Set property defaults
 */
DropDownMenu.defaultProps = {
  autoWidth: true
};

// Check for commonjs
if (module) {
  module.exports = DropDownMenu;
}

export default DropDownMenu;
