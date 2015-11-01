var React = require('react');
var WindowListenable = require('./mixins/WindowListenable.jsx');
var CssEvent = require('./utils/CssEvent.jsx');
var KeyCode = require('./utils/KeyCode.jsx');
var Classable = require('./mixins/classable.jsx');
var FlatButton = require('./FlatButton.jsx');
var Overlay = require('./Overlay.jsx');
var Paper = require('./Paper.jsx');

var DialogWindow = React.createClass({

  mixins: [Classable, WindowListenable],

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
    var classes = this.getClasses('chamel-dialog-window', {
      'chamel-is-shown': this.state.open
    });
    var contentClasses = 'chamel-dialog-window-contents';
    var actions = this._getActionsContainer(this.props.actions);

    if (this.props.contentClassName) {
      contentClasses += ' ' + this.props.contentClassName;
    }

    // Add title
    var title;
    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ?
        <h3 className="chamel-dialog-title">{this.props.title}</h3> :
        this.props.title;
    }

    return (
      <div className={classes}>
        <Paper ref="dialogWindow" className={contentClasses} zDepth={4}>
          {title}
          <div ref="dialogContent" className="chamel-dialog-window-contents-body">
            {this.props.children}
          </div>
          {actions}
        </Paper>
        <Overlay ref="dialogOverlay" show={this.state.open} autoLockScrolling={false} onClick={this._handleOverlayTouchTap} />
      </div>
    );
  },

  isOpen: function() {
    return this.state.open;
  },

  dismiss: function() {
    CssEvent.onTransitionEnd(React.findDOMNode(this), function() {
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
      var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var container = React.findDOMNode(this);
      var dialogWindow = React.findDOMNode(this.refs.dialogWindow);
      var dialogContent = React.findDOMNode(this.refs.dialogContent);
      var minPaddingTop = 16;

      //Reset the height in case the window was resized.
      dialogWindow.style.height = '';
      dialogContent.style.height = '';

      var dialogWindowHeight = dialogWindow.offsetHeight;
      var paddingTop = ((clientHeight - dialogWindowHeight) / 2) - 2 * (64);

      if (paddingTop < minPaddingTop) {
        paddingTop = minPaddingTop;
      }

      //Vertically center the dialog window, but make sure it doesn't
      //transition to that position.
      if (this.props.repositionOnUpdate || !container.style.paddingTop) {
        container.style.paddingTop = paddingTop + 'px';
      }

      // Force a height if the dialog is taller than clientHeight
      if (this.props.autoDetectWindowHeight || this.props.autoScrollBodyContent) {
        var maxDialogContentHeight = clientHeight - 2 * (64);

        if (this.props.title) {
          maxDialogContentHeight -= dialogContent.previousSibling.offsetHeight;
        }

        if (this.props.actions.length) {
          maxDialogContentHeight -= dialogContent.nextSibling.offsetHeight;
        }
        
        dialogContent.style.maxHeight = maxDialogContentHeight + 'px';
      }
    }
  },
  
  _focusOnAction: function() {
    if (this.props.actionFocus) {
      React.findDOMNode(this.refs[this.props.actionFocus]).focus();
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

module.exports = DialogWindow;
