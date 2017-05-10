import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../FontIcon/FontIcon';
import Toggle from '../Toggle/Switch';
import classnames from 'classnames';
import ThemeService from '../styles/ChamelThemeService';

const Types = {
  LINK: 'LINK',
  SUBHEADER: 'SUBHEADER',
  NESTED: 'NESTED'
};


class MenuItem extends Component {

  static Types = Types;

  render() {

    let theme = (this.context.chamelTheme && this.context.chamelTheme.menu)
      ? this.context.chamelTheme.menu : ThemeService.defaultTheme.menu;

    const classes = classnames(theme.menuItem, {
      [theme.menuItemSelected]: this.props.selected,
      [theme.menuItemFocused]: this.props.focused,
      [theme.menuItemDisabled]: this.props.disabled
    });
    let icon;
    let data;
    let iconRight;
    let attribute;
    let number;
    let toggle;

    if (this.props.iconClassName) {
      icon = <FontIcon className={theme.menuItemIcon + ' ' + this.props.iconClassName}/>;
    }
    if (this.props.iconRightClassName) {
      iconRight = <FontIcon className={theme.menuItemIconRight + ' ' + this.props.iconRightClassName}/>;
    }
    if (this.props.data) {
      data = <span className={theme.menuItemData}>{this.props.data}</span>;
    }
    if (this.props.number !== undefined) {
      number =
        <span className={theme.menuItemNumber}>{this.props.number}</span>;
    }
    if (this.props.attribute !== undefined) {
      attribute =
        <span className={theme.menuItemAttribute}>{this.props.attribute}</span>;
    }

    // Add indentations for hierarchical menus
    const numIndents = this.props.indent || 0;
    let indentItems = (numIndents) ? [] : null;
    for (let i = 0; i < numIndents; i++) {
      indentItems.push(
        <span className={theme.menuItemIndent} key={i}>{" "}</span>
      );
    }

    if (this.props.toggle) {
      let {
        toggle,
        onClick,
        onToggle,
        children,
        label,
        ...other
        } = this.props;
      toggle = <Toggle {...other} onChange={this._handleToggle}/>;
    }

    return (
      <div
        key={this.props.index}
        className={classes}
        onClick={this._handleOnClick}>

        {indentItems}
        {icon}
        {this.props.children}
        {data}
        {attribute}
        {number}
        {toggle}
        {iconRight}
      </div>
    );
  }

  _handleTouchTap = (e) => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(e, this.props.index);
    } else if (!this.props.disabled && this.props.onClick) {
      this._handleOnClick(e);
    }
  }

  _handleOnClick = (e) => {
    if (!this.props.disabled && this.props.onClick) this.props.onClick(e, this.props.index);
  }

  _handleToggle = (e, toggled) => {
    if (!this.props.disabled && this.props.onToggle) this.props.onToggle(e, this.props.index, toggled);
  }
}

/**
 * Set accepted properties
 */
MenuItem.propTypes = {
  index: PropTypes.number,
  iconClassName: PropTypes.string,
  iconRightClassName: PropTypes.string,
  attribute: PropTypes.string,
  number: PropTypes.string,
  data: PropTypes.string,
  toggle: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onToggle: PropTypes.func,
  selected: PropTypes.bool,
  indent: PropTypes.number
}

/**
 * Set property defaults
 */
MenuItem.defaultProps = {
  toggle: false,
  disabled: false,
  index: -1
}

/**
 * An alternate theme may be passed down by a provider
 */
MenuItem.contextTypes = {
  chamelTheme: PropTypes.object
};

export default MenuItem;
