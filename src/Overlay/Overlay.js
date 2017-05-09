import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import ThemeService from '../styles/ChamelThemeService';

class Overlay extends Component {

  /**
   * Set accepted properties
   */
  static propTypes = {
    show: PropTypes.bool,
    autoLockScrolling: PropTypes.bool,
    onClick: PropTypes.func
  };

  /**
   * Set property defaults
   */
  static defaultProps = {
    autoLockScrolling: true
  };

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
    chamelTheme: PropTypes.object
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.autoLockScrolling) (this.props.show) ? this._preventScrolling() : this._allowScrolling();
  }

  render() {

    // Determine which theme to use
    let theme = (this.context.chamelTheme && this.context.chamelTheme.overlay)
      ? this.context.chamelTheme.overlay : ThemeService.defaultTheme.overlay;

    const
      {
        className,
        ...other
        } = this.props,
      classes = classnames(theme.overlay, {
        [theme.overlayVisible]: this.props.show
      });

    return (
      <div className={classes} onClick={this.props.onClick}/>
    );
  }

  preventScrolling() {
    if (!this.props.autoLockScrolling) this._preventScrolling();
  }

  allowScrolling() {
    if (!this.props.autoLockScrolling) this._allowScrolling();
  }

  _preventScrolling() {
    let body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
  }

  _allowScrolling() {
    let body = document.getElementsByTagName('body')[0];
    body.style.overflow = '';
  }
}
;

export default Overlay;
