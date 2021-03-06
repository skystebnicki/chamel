import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FlatButton from '../Button/FlatButton';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Create a snackbar notice
 */
class Snackbar extends Component {
  static propTypes = {
    action: PropTypes.string,
    message: PropTypes.string.isRequired,
    open: PropTypes.bool,
    onActionClick: PropTypes.func,
    timeout: PropTypes.number,
    onDismiss: PropTypes.func,
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
    // Call parent constructor
    super(props);

    this.state = {
      open: this.props.open || false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open != this.state.open && this.props.timeout) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.dismiss();
      }, this.props.timeout);
    }
  }

  componentDidMount() {
    if (this.props.open) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.dismiss();
      }, this.props.timeout);
    }
  }

  /**
   * Handle incoming new props
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open || false });
  }

  render() {
    // Determine which theme to use
    let theme =
      this.context.chamelTheme && this.context.chamelTheme.snackbar
        ? this.context.chamelTheme.snackbar
        : ThemeService.defaultTheme.snackbar;

    const classes = classnames(theme.snackbar, {
      [theme.snackbarIsOpen]: this.state.open,
    });
    let action;

    if (this.props.action) {
      action = (
        <FlatButton
          className={theme.snackbarAction}
          label={this.props.action}
          onClick={this.props.onActionClick}
        />
      );
    }

    return (
      <span className={classes}>
        <span className={theme.snackbarMessage}>{this.props.message}</span>
        {action}
      </span>
    );
  }

  show() {
    this.setState({ open: true });
  }

  dismiss() {
    this.setState({ open: false });

    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  }
}

export default Snackbar;
