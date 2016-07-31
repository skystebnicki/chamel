'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var WindowListenable = require('./mixins/WindowListenable');
var CssEvent = require('./utils/CssEvent');
var KeyCode = require('./utils/KeyCode');
var Classable = require('./mixins/classable');
var FlatButton = require('./FlatButton');
var Overlay = require('./Overlay');
var Paper = require('./Paper');

var DialogWindow = React.createClass({
  displayName: 'DialogWindow',


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

  getDefaultProps: function getDefaultProps() {
    return {
      autoDetectWindowHeight: false,
      autoScrollBodyContent: false,
      actions: [],
      repositionOnUpdate: true,
      modal: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      open: this.props.openImmediately || false
    };
  },

  componentDidMount: function componentDidMount() {
    this._positionDialog();
    if (this.props.openImmediately) {
      this.refs.dialogOverlay.preventScrolling();
      this._onShow();
      this._focusOnAction();
    }
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    this._positionDialog();
    this._focusOnAction();
  },

  render: function render() {

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
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ? React.createElement(
        'h3',
        { className: 'chamel-dialog-window-title' },
        this.props.title
      ) : this.props.title;
    }

    // Get actions to display at the bottom
    var actions = this._getActionsContainer(this.props.actions);

    return React.createElement(
      'div',
      { className: classesDialog },
      React.createElement(
        'div',
        { className: classesWindow },
        React.createElement(
          Paper,
          { ref: 'dialogWindow', zDepth: 4 },
          title,
          React.createElement(
            'div',
            { ref: 'dialogBody', className: 'chamel-dialog-window-body' },
            this.props.children
          ),
          actions
        )
      ),
      React.createElement(Overlay, { ref: 'dialogOverlay', show: this.state.open, autoLockScrolling: false, onClick: this._handleOverlayTouchTap })
    );
  },

  isOpen: function isOpen() {
    return this.state.open;
  },

  dismiss: function dismiss() {
    CssEvent.onTransitionEnd(ReactDOM.findDOMNode(this), function () {
      this.refs.dialogOverlay.allowScrolling();
    }.bind(this));

    this.setState({ open: false });
    this._onDismiss();
  },

  show: function show() {
    this.refs.dialogOverlay.preventScrolling();
    this._focusOnAction();

    this.setState({ open: true });
    this._onShow();
  },

  /**
   * Reposition the dialog - usually means dynamic content changed
   */
  reposition: function reposition() {
    this._positionDialog();
  },

  _addClassName: function _addClassName(reactObject, className) {
    var originalClassName = reactObject.props.className;
    var newClassname = originalClassName ? originalClassName + ' ' + className : className;

    return React.cloneElement(reactObject, { className: newClassname });
  },

  _getAction: function _getAction(actionJSON, key) {
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

    return React.createElement(FlatButton, props);
  },

  _getActionsContainer: function _getActionsContainer(actions) {
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

      actionContainer = React.createElement(
        'div',
        { className: 'chamel-dialog-window-actions' },
        actionObjects
      );
    }

    return actionContainer;
  },

  _positionDialog: function _positionDialog() {

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
      var windowTop = (clientHeight - dialogWindowHeight) / 2 - 2 * 64;

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
        var maxDialogContentHeight = clientHeight - 2 * 64;

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

  _focusOnAction: function _focusOnAction() {
    if (this.props.actionFocus) {
      ReactDOM.findDOMNode(this.refs[this.props.actionFocus]).focus();
    }
  },

  _onShow: function _onShow() {
    if (this.props.onShow) this.props.onShow();
  },

  _onDismiss: function _onDismiss() {
    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleOverlayTouchTap: function _handleOverlayTouchTap() {
    if (!this.props.modal) {
      this.dismiss();
      if (this.props.onClickAway) this.props.onClickAway();
    }
  },

  _handleWindowKeyUp: function _handleWindowKeyUp(e) {
    if (!this.props.modal && e.keyCode == KeyCode.ESC) {
      this.dismiss();
    }
  }

});

module.exports = DialogWindow;