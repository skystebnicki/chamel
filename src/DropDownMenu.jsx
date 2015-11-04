var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('./mixins/classable.jsx');
var ClickAwayable = require('./mixins/ClickAwayable.jsx');
var DropDownArrow = require('./svg-icons/drop-down-arrow.jsx');
var Paper = require('./Paper.jsx');
var Menu = require('./menu/Menu.jsx');

var DropDownMenu = React.createClass({

  mixins: [Classable, ClickAwayable],

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
          <Paper className="chamel-menu-control-bg" zDepth={0} />
          <div className="chamel-menu-label">
            {this.props.menuItems[this.state.selectedIndex].text}
          </div>
          <DropDownArrow className="chamel-menu-drop-down-icon" />
          <div className="chamel-menu-control-underline" />
        </div>
        <Menu
          ref="menuItems"
          autoWidth={this.props.autoWidth}
          selectedIndex={this.state.selectedIndex}
          menuItems={this.props.menuItems}
          hideable={true}
          visible={this.state.open}
          onItemClick={this._onMenuItemClick} />
      </div>
    );
  },

  _setWidth: function() {
    var el = ReactDOM.findDOMNode(this),
      menuItemsDom = ReactDOM.findDOMNode(this.refs.menuItems);

    el.style.width = menuItemsDom.offsetWidth + 'px';
  },

  _setSelectedIndex: function(props) {
    var selectedIndex = props.selectedIndex;

    if (process.env.NODE_ENV !== 'production' && selectedIndex < 0) {
      console.warn('Cannot set selectedIndex to a negative index.', selectedIndex);
    }

    this.setState({selectedIndex: (selectedIndex > -1) ? selectedIndex : 0});
  },

  _onControlClick: function(e) {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange && this.state.selectedIndex !== key) this.props.onChange(e, key, payload);
    this.setState({
      selectedIndex: key,
      open: false
    });
  }

});

module.exports = DropDownMenu;
