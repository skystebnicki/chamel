import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dom from '../utils/Dom';
import PropTypes from 'prop-types';
import ThemeService from '../styles/ChamelThemeService';
import AppBarSelectButton from './SelectButton';
import AppBarIconButton from './IconButton';

import DropDownArrow from '../svg-icons/drop-down-arrow';

/**
 * The right toolbar for an AppBar
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
class AppBarRightToolbar extends Component {
  /**
   * Set accepted properties
   */
  static propTypes = {
    /**
     * Optional class override
     */
    className: PropTypes.string,

    /**
     * Child elements (text and icon)
     */
    children: PropTypes.node,
  };

  /**
   * Set property defaults
   */
  static defaultProps = {
    className: null,
  };

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
    chamelTheme: PropTypes.object,
  };

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call paprent constructor
    super(props);

    this.state = {
      useSelectButton: false,
    };
  }

  componentDidMount() {
    const domAppBarRight = ReactDOM.findDOMNode(this.refs.appBarRightContainer);
    const offset = Dom.offset(domAppBarRight);

    // Check if the scrollable width of the div is bigger than the actual width
    if (domAppBarRight.scrollWidth > offset.width) {
      // If so, then we need to set the state so it will use the SelectButton to display the icons
      this.setState({ useSelectButton: true });
    }
  }

  render() {
    // Determine which theme to use
    let theme =
      this.context.chamelTheme && this.context.chamelTheme.appBar
        ? this.context.chamelTheme.appBar
        : ThemeService.defaultTheme.appBar;

    let classes = theme.appBarRight || '';
    if (this.props.className) {
      classes += ' ' + this.props.className;
    }

    // Primary Icon will be always displayed and will not be included in the SelectButton
    let primaryIconButton = null;
    let minIconCountForSelectButton = 2;
    let iconButtons = [];

    for (let idx in this.props.children) {
      let currentIcon = this.props.children[idx];
      const isPrimaryIcon = currentIcon.props.isPrimary || false;

      // If the currentIcon is not encapsulated with AppBarIconButton, then we need to wrap it with <AppBarIconButton>
      if (currentIcon.type.name !== 'AppBarIconButton' || currentIcon.type.name !== 'IconButton') {
        currentIcon = <AppBarIconButton key={idx}>{currentIcon}</AppBarIconButton>;
      }

      // If we are dealing with primary icon and we dont have one, then we need to display it separately
      if (isPrimaryIcon && !primaryIconButton) {
        minIconCountForSelectButton = 1;
        primaryIconButton = currentIcon;
      } else {
        iconButtons.push(currentIcon);
      }
    }

    // We only need to use the select button if we are dealing with 2 or more icon buttons
    let divStyle = null;
    if (this.state.useSelectButton && iconButtons.length > minIconCountForSelectButton) {
      const selectButtonIcon = (
        <AppBarIconButton>
          <DropDownArrow />
        </AppBarIconButton>
      );

      divStyle = { overflow: 'unset' };
      iconButtons = <AppBarSelectButton icon={selectButtonIcon}>{iconButtons}</AppBarSelectButton>;
    }

    return (
      <div ref={'appBarRightContainer'} style={divStyle} className={classes}>
        {primaryIconButton}
        {iconButtons}
      </div>
    );
  }
}

export default AppBarRightToolbar;
