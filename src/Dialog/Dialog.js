import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import KeyCode from '../utils/KeyCode';
import FlatButton from '../Button/FlatButton';
import Overlay from '../Overlay/Overlay';
import Paper from '../Paper/Paper';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Dialog window component
 */
class Dialog extends Component {

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
      this._focusOnAction();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this._positionDialog();
    this._focusOnAction();
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
    let classesWindow = theme.dialogWindow;
    if (this.props.windowClassName) {
      classesWindow += " " + this.props.windowClassName;
    }
    if (this.props.fullPage) {
      classesWindow += " " + theme.dialogWindowFullPage;
    }

    // Set classes for window contents
    let classesWindowBody = theme.dialogWindowBody;
    if (this.props.dialogWindowBodyClassName) {
      classesWindowBody += " " + this.props.dialogWindowBodyClassName;
    }

    // Add title
    let title;
    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ?
        <h3 className={theme.dialogWindowTitle}>{this.props.title}</h3> :
        this.props.title;
    }

    // Get actions to display at the bottom
    const actions = this._getActionsContainer(this.props.actions, theme);

    return (
      <div className={classesDialog}>
        <div className={classesWindow}>
          <Paper ref="dialogWindow" zDepth={4}>
            {title}
            <div ref="dialogBody" className={classesWindowBody}>
              {this.props.children}
            </div>
            <div ref="dialogActions">
              {actions}
            </div>
          </Paper>
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
    this._focusOnAction();

    this.setState({open: true});
    this._onShow();
  };

  /**
   * Reposition the dialog - usually means dynamic content changed
   */
  reposition() {
    this._positionDialog();
  }

  _addClassName(reactObject, className) {
    const originalClassName = reactObject.props.className;
    const newClassname = originalClassName ? originalClassName + ' ' + className : className;

    return React.cloneElement(reactObject, {className: newClassname});
  }

  _getAction(actionJSON, key) {
    const props = {
      key: key,
      secondary: true,
      onClick: actionJSON.onClick ? actionJSON.onClick : this.dismiss,
      label: actionJSON.text
    };
    if (actionJSON.ref) {
      props.ref = actionJSON.ref;
      props.keyboardFocused = actionJSON.ref === this.props.actionFocus;
    }

    return (
      <FlatButton
        {...props} />
    );
  }

  _getActionsContainer(actions, theme) {

    let actionContainer;
    let actionObjects = [];

    if (actions.length) {
      for (let i = 0; i < actions.length; i++) {
        let currentAction = actions[i];

        //if the current action isn't a react object, create one
        if (!React.isValidElement(currentAction)) {
          currentAction = this._getAction(currentAction, i);
        }

        currentAction = this._addClassName(currentAction, theme.dialogWindowAction);
        actionObjects.push(currentAction);
      };

      actionContainer = (
        <div className={theme.dialogWindowActions}>
          {actionObjects}
        </div>
      );
    }

    return actionContainer;
  }

  _positionDialog() {

    if (this.state.open) {
      const clientHeight = ReactDOM.findDOMNode(this).offsetHeight;
      let dialogWindow = ReactDOM.findDOMNode(this.refs.dialogWindow);
      let dialogBody = ReactDOM.findDOMNode(this.refs.dialogBody);
      const minMarginTop = 0;

      // If we are running server-side or in automated tests element is not mounted
      if (!dialogWindow || !dialogBody) {
        return;
      }

      // Reset the height in case the window was resized.
      dialogWindow.style.height = '';
      dialogBody.style.height = '';

      const dialogWindowHeight = dialogWindow.offsetHeight;
      let windowTop = ((clientHeight - dialogWindowHeight) / 2) - 2 * (64);

      // Set to full-height if we are in auto-detect
      if (this.props.autoDetectWindowHeight || this.props.autoScrollBodyContent) {
        windowTop = 0;
      } else if (windowTop < minMarginTop) {
        windowTop = minMarginTop;
      }

      //Vertically center the dialog window, but make sure it doesn't
      //transition to that position.
      if (this.props.repositionOnUpdate || !dialogWindow.style.marginTop) {
        dialogWindow.style.marginTop = windowTop + 'px';
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
    }
  }

  _focusOnAction() {
    if (this.props.actionFocus) {
      if (ReactDOM.findDOMNode(this.refs[this.props.actionFocus])) {
        ReactDOM.findDOMNode(this.refs[this.props.actionFocus]).focus();
      }
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
  }

  _handleWindowKeyUp = (e) => {
    if (!this.props.modal && e.keyCode == KeyCode.ESC) {
      this.dismiss();
    }
  };

}

export default Dialog;
