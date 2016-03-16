var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('./mixins/classable.jsx');
var ClickAwayable = require('./mixins/ClickAwayable.jsx');
var DropDownArrow = require('./svg-icons/drop-down-arrow.jsx');
var Paper = require('./Paper.jsx');
var Menu = require('./menu/Menu.jsx');
import Popover from './Popover.jsx';

var DropDownMenu = React.createClass({

  mixins: [Classable],

  propTypes: {
    autoWidth: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
      autoWidth: true
    };
  },

  getInitialState: function() {
    return {
      open: false,
      anchorEl: null,
      selectedIndex: this.props.selectedIndex || 0
    }
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  componentDidMount: function() {
    if (this.props.autoWidth) this._setWidth();
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(nextProps);
  },

  render: function() {
    var classes = this.getClasses('chamel-drop-down-menu', {
      'chamel-open': this.state.open
    });

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
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this._handleRequestClose}
        >
          <Menu
            ref="menuItems"
            autoWidth={this.props.autoWidth}
            selectedIndex={this.state.selectedIndex}
            menuItems={this.props.menuItems}
            onItemClick={this._onMenuItemClick} />
        </Popover>
      </div>
    );
  },

  _setWidth: function() {
    /*
    var el = ReactDOM.findDOMNode(this),
      menuItemsDom = ReactDOM.findDOMNode(this.refs.menuItems);

    el.style.width = menuItemsDom.offsetWidth + 'px';
    */
  },

  _setSelectedIndex: function(props) {
    var selectedIndex = props.selectedIndex;

    if (process.env.NODE_ENV !== 'production' && selectedIndex < 0) {
      console.warn('Cannot set selectedIndex to a negative index.', selectedIndex);
    }

    this.setState({selectedIndex: (selectedIndex > -1) ? selectedIndex : 0});
  },

  _onControlClick: function(e) {
    e.preventDefault();

    this.setState({
      open: this.state.open ? false : true,
      anchorEl: e.currentTarget
    });
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange && this.state.selectedIndex !== key) this.props.onChange(e, key, payload);
    this.setState({
      selectedIndex: key,
      open: false
    });

    // Prevent ghost clicks
    e.preventDefault();
    e.stopPropagation();

    // TODO: Not sure if this is needed with the above being called
    e.nativeEvent.stopImmediatePropagation();
  },

  _handleRequestClose: function(e) {
    this.setState({
      open: false,
    });
  }

});

module.exports = DropDownMenu;
