import React, {Component, PropTypes} from 'react';
import ThemeService from '../styles/ChamelThemeService';
import classnames from 'classnames';

/**
 * Render a tab
 */
class Tab extends Component {

  /**
   * Define the types of properties the component will receive
   */
  static propTypes = {
    handleTouchTap: PropTypes.func,
    selected: PropTypes.bool,

    /**
     * Secondary or inline tab
     */
    secondary: PropTypes.bool
  };

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
    chamelTheme: PropTypes.object
  };

  handleTouchTap = (e) => {
    this.props.handleTouchTap(this.props.tabIndex, this);
  };

  render() {
    // Determine which theme to use
    let theme = (this.context.chamelTheme && this.context.chamelTheme.tabs)
      ? this.context.chamelTheme.tabs : ThemeService.defaultTheme.tabs;

    const styles = {
      width: this.props.width
    };

    const classes = classnames(theme.tabItem, {
      [theme.tabIsActive]: this.props.selected,
      [theme.tabItemSecondary]: this.props.secondary,
      [theme.tabItemSecondaryIsActive]: (this.props.selected && this.props.secondary)
    });


    return (
      <div
        className={classes}
        style={styles}
        onClick={this.handleTouchTap}
      >
        {this.props.label}
      </div>
    );
  }
}

export default Tab;
