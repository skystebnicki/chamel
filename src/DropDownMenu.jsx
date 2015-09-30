var React = require('react');
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
    var classes = this.getClasses('drop-down-menu', {
      'open': this.state.open
    });

    return (
      <div className={classes}>
        <div className="menu-control" onClick={this._onControlClick}>
          <Paper className="menu-control-bg" zDepth={0} />
          <div className="menu-label">
            {this.props.menuItems[this.state.selectedIndex].text}
          </div>
          <DropDownArrow className="menu-drop-down-icon" />
          <div className="menu-control-underline" />
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
    var el = React.findDOMNode(this),
      menuItemsDom = React.findDOMNode(this.refs.menuItems);

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
