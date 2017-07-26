import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import KeyCode from '../utils/KeyCode';
import Overlay from '../Overlay/Overlay';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Float a DIV above the DOM like a virtual page
 */
class Page extends Component {

  static propTypes = {
    /**
     * Array of possible actions to create buttons for
     */
    actions: PropTypes.array,

    /**
     * Which action should get focus when loaded
     */
    actionFocus: PropTypes.string,

    /**
     * Automatically detect the ideal height of the window
     */
    autoDetectWindowHeight: PropTypes.bool,

    /**
     * Automatically scroll the body of the window if larger than viewable area
     */
    autoScrollBodyContent: PropTypes.bool,

    /**
     * Class to theme the content container
     */
    contentClassName: PropTypes.string,

    /**
     * If true, open as soon as we mount into the dom
     */
    openImmediately: PropTypes.bool,

    /**
     * Action to perform when a user clicks away from the dialog
     */
    onClickAway: PropTypes.func,

    /**
     * Callback to call when the dialog is dismissed
     */
    onDismiss: PropTypes.func,

    /**
     * Callback to call when the dialog is shown
     */
    onShow: PropTypes.func,

    /**
     * Automatically reposition the dialog if the contents change
     */
    repositionOnUpdate: PropTypes.bool,

    /**
     * Do not allow the user to dismiss by clicking off the dialog
     */
    modal: PropTypes.bool,

    /**
     * The title for the dialog window
     */
    title: PropTypes.node,

    /**
     * Flag to set this dialog to take up 100% of the page
     */
    fullPage: PropTypes.bool
  };

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
    chamelTheme: PropTypes.object
  };

  /**
   * Set some sane defaults
   *
   * @type {Object}
   */
  static defaultProps = {
    autoDetectWindowHeight: false,
    autoScrollBodyContent: false,
    actions: [],
    repositionOnUpdate: true,
    modal: false
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
      open: this.props.openImmediately || false
    }
  }

  componentDidMount() {
    this._positionDialog();

    // TODO
    // 'keyup': '_handleWindowKeyUp'

    if (this.props.openImmediately) {
      this.refs.dialogOverlay.preventScrolling();
      this._onShow();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this._positionDialog();
  }

  render() {
    // Determine which theme to use
    let theme = (this.context.chamelTheme && this.context.chamelTheme.dialog)
      ? this.context.chamelTheme.dialog : ThemeService.defaultTheme.dialog;

    // Set classes for dialog window
    let classesDialog = theme.dialog;
    if (this.state.open) {
      classesDialog += ' ' + theme.dialogIsShown;
    }
    if (this.props.className) {
      classesDialog += ' ' + this.props.className;
    }

    // Set classes for window contents
    let classesPage = theme.dialogPage;
    if (this.props.className) {
      classesPage += " " + this.props.className;
    }

    return (
      <div className={classesDialog}>
        <div className={classesPage} ref="dialogPage">
          {this.props.children}
        </div>
        <Overlay
          ref="dialogOverlay"
          show={this.state.open}
          autoLockScrolling={false}
          onClick={this._handleOverlayTouchTap}
        />
      </div>
    );
  }

  isOpen() {
    return this.state.open;
  }

  dismiss = () => {
    this.refs.dialogOverlay.allowScrolling();
    this.setState({open: false});
    this._onDismiss();
  };

  show = () => {
    this.refs.dialogOverlay.preventScrolling();

    this.setState({open: true});
    this._onShow();
  };

  /**
   * Reposition the dialog - usually means dynamic content changed
   */
  reposition() {
    this._positionDialog();
  }

  _positionDialog() {

    if (this.state.open) {
      const clientHeight = ReactDOM.findDOMNode(this).offsetHeight;
      let dialogPage = ReactDOM.findDOMNode(this.refs.dialogPage);
      const minMarginTop = 0;

      /*
      // Reset the height in case the window was resized.
      dialogPage.style.height = '';

      const dialogWindowHeight = dialogWindow.offsetHeight;
      let windowTop = ((clientHeight - dialogWindowHeight) / 2) - 2 * (64);

      // Set to full-height if we are in auto-detect
      if (this.props.autoDetectWindowHeight || this.props.autoScrollBodyContent) {
        windowTop = 0;
      } else if (windowTop < minMarginTop) {
        windowTop = minMarginTop;
      }

      // Force a height if the dialog is taller than clientHeight
      if (this.props.autoDetectWindowHeight || this.props.autoScrollBodyContent) {
        let maxDialogContentHeight = clientHeight - 2 * (64);

        if (this.props.title) {
          maxDialogContentHeight -= dialogBody.previousSibling.offsetHeight;
        }

        if (this.props.actions.length) {
          maxDialogContentHeight -= dialogBody.nextSibling.offsetHeight;
        }

        dialogBody.style.maxHeight = maxDialogContentHeight + 'px';
      }
      */
    }
  }

  _onShow() {
    if (this.props.onShow) this.props.onShow();
  }

  _onDismiss() {
    if (this.props.onDismiss) this.props.onDismiss();
  }

  _handleOverlayTouchTap = (e) => {
    if (!this.props.modal) {
      this.dismiss();
      if (this.props.onClickAway) this.props.onClickAway();
    }
  };

  _handleWindowKeyUp = (e) => {
    if (!this.props.modal && e.keyCode === KeyCode.ESC) {
      this.dismiss();
    }
  };

}

export default Page;
