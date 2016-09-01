import React from 'react';
import ReactDOM from 'react-dom';
import WindowListenable from '../mixins/WindowListenable';
import CssEvent from '../utils/CssEvent';
import KeyCode from '../utils/KeyCode';
import Classable from '../mixins/classable';
import FlatButton from '../FlatButton';
import Overlay from '../Overlay';
import Paper from '../Paper';

var Dialog = React.createClass({

  mixins: [WindowListenable],

  propTypes: {
    actions: React.PropTypes.array,
    actionFocus: React.PropTypes.string,
    autoDetectWindowHeight: React.PropTypes.bool,
    autoScrollBodyContent: React.PropTypes.bool,
    contentClassName: React.PropTypes.string,
    openImmediately: React.PropTypes.bool,
    onClickAway: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
    repositionOnUpdate: React.PropTypes.bool,
    modal: React.PropTypes.bool,
    title: React.PropTypes.node
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getDefaultProps: function() {
    return {
      autoDetectWindowHeight: false,
      autoScrollBodyContent: false,
      actions: [],
      repositionOnUpdate: true,
      modal: false
    };
  },

  getInitialState: function() {
    return {
      open: this.props.openImmediately || false
    };
  },

  componentDidMount: function() {
    this._positionDialog();
    if (this.props.openImmediately) {
      this.refs.dialogOverlay.preventScrolling();
      this._onShow();
      this._focusOnAction();
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    this._positionDialog();
    this._focusOnAction();
  },

  render: function() {

    // Set classes for dialog window
    var classesDialog = 'chamel-dialog';
    if (this.state.open) {
      classesDialog += ' chamel-is-shown';
    }
    if (this.props.className) {
      classesDialog += ' ' + this.props.className;
    }

    // Set classes for window contents
    var classesWindow = "chamel-dialog-window";
    if (this.props.windowClassName) classesWindow += " " + this.props.windowClassName;

    // Add title
    var title;
    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ?
        <h3 className="chamel-dialog-window-title">{this.props.title}</h3> :
        this.props.title;
    }

    // Get actions to display at the bottom
    var actions = this._getActionsContainer(this.props.actions);

    return (
      <div className={classesDialog}>
        <div className={classesWindow}>
          <Paper ref="dialogWindow" zDepth={4}>
            {title}
            <div ref="dialogBody" className="chamel-dialog-window-body">
              {this.props.children}
            </div>
            {actions}
          </Paper>
        </div>
        <Overlay ref="dialogOverlay" show={this.state.open} autoLockScrolling={false} onClick={this._handleOverlayTouchTap} />
      </div>
    );
  },

  isOpen: function() {
    return this.state.open;
  },

  dismiss: function() {
    CssEvent.onTransitionEnd(ReactDOM.findDOMNode(this), function() {
      this.refs.dialogOverlay.allowScrolling();
    }.bind(this));

    this.setState({ open: false });
    this._onDismiss();
  },

  show: function() {
    this.refs.dialogOverlay.preventScrolling();
    this._focusOnAction();

    this.setState({ open: true });
    this._onShow();
  },

  /**
   * Reposition the dialog - usually means dynamic content changed
   */
  reposition: function() {
    this._positionDialog();
  },

  _addClassName: function(reactObject, className) {
    var originalClassName = reactObject.props.className;
    var newClassname = originalClassName ? originalClassName + ' ' + className : className;

    return React.cloneElement(reactObject, { className: newClassname });
  },

  _getAction: function(actionJSON, key) {
    var props = {
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
  },

  _getActionsContainer: function(actions) {
    var actionContainer;
    var actionObjects = [];

    if (actions.length) {
      for (var i = 0; i < actions.length; i++) {
        var currentAction = actions[i];

        //if the current action isn't a react object, create one
        if (!React.isValidElement(currentAction)) {
          currentAction = this._getAction(currentAction, i);
        }

        currentAction = this._addClassName(currentAction, 'chamel-dialog-window-action');
        actionObjects.push(currentAction);
      };

      actionContainer = (
        <div className="chamel-dialog-window-actions">
          {actionObjects}
        </div>
      );
    }

    return actionContainer;
  },

  _positionDialog: function() {

    if (this.state.open) {
      var clientHeight = ReactDOM.findDOMNode(this).offsetHeight;
      console.log("Dialog height", clientHeight);
      var dialogWindow = ReactDOM.findDOMNode(this.refs.dialogWindow);
      var dialogBody = ReactDOM.findDOMNode(this.refs.dialogBody);
      var minMarginTop = 0;

      //Reset the height in case the window was resized.
      dialogWindow.style.height = '';
      dialogBody.style.height = '';

      var dialogWindowHeight = dialogWindow.offsetHeight;
      var windowTop = ((clientHeight - dialogWindowHeight) / 2) - 2 * (64);

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
        var maxDialogContentHeight = clientHeight - 2 * (64);

        if (this.props.title) {
          maxDialogContentHeight -= dialogBody.previousSibling.offsetHeight;
        }

        if (this.props.actions.length) {
          maxDialogContentHeight -= dialogBody.nextSibling.offsetHeight;
        }

        dialogBody.style.maxHeight = maxDialogContentHeight + 'px';
      }
    }
  },
  
  _focusOnAction: function() {
    if (this.props.actionFocus) {
      ReactDOM.findDOMNode(this.refs[this.props.actionFocus]).focus();
    }
  },
  
  _onShow: function() {
    if (this.props.onShow) this.props.onShow();
  },
  
  _onDismiss: function() {
    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleOverlayTouchTap: function() {
    if (!this.props.modal) {
      this.dismiss();
      if (this.props.onClickAway) this.props.onClickAway();
    }
  },

  _handleWindowKeyUp: function(e) {
    if (!this.props.modal && e.keyCode == KeyCode.ESC) {
      this.dismiss();
    }
  }

});

// Check for commonjs
if (module) {
  module.exports = Dialog;
}

export default Dialog;
