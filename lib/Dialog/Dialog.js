'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CssEvent = require('../utils/CssEvent');

var _CssEvent2 = _interopRequireDefault(_CssEvent);

var _KeyCode = require('../utils/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _FlatButton = require('../Button/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _Overlay = require('../Overlay/Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _Paper = require('../Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Dialog window component
 */
var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */


  /**
   * An alternate theme may be passed down by a provider
   */
  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));
    // Call parent constructor


    _this.dismiss = function () {
      _this.refs.dialogOverlay.allowScrolling();
      _this.setState({ open: false });
      _this._onDismiss();
    };

    _this.show = function () {
      _this.refs.dialogOverlay.preventScrolling();
      _this._focusOnAction();

      _this.setState({ open: true });
      _this._onShow();
    };

    _this._handleOverlayTouchTap = function (e) {
      if (!_this.props.modal) {
        _this.dismiss();
        if (_this.props.onClickAway) _this.props.onClickAway();
      }
    };

    _this._handleWindowKeyUp = function (e) {
      if (!_this.props.modal && e.keyCode == _KeyCode2.default.ESC) {
        _this.dismiss();
      }
    };

    _this.state = {
      open: _this.props.openImmediately || false
    };
    return _this;
  }

  _createClass(Dialog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._positionDialog();

      // TODO
      // 'keyup': '_handleWindowKeyUp'

      if (this.props.openImmediately) {
        this.refs.dialogOverlay.preventScrolling();
        this._onShow();
        this._focusOnAction();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      this._positionDialog();
      this._focusOnAction();
    }
  }, {
    key: 'render',
    value: function render() {
      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.dialog ? this.context.chamelTheme.dialog : _ChamelThemeService2.default.defaultTheme.dialog;

      // Set classes for dialog window
      var classesDialog = theme.dialog;
      if (this.state.open) {
        classesDialog += ' ' + theme.dialogIsShown;
      }
      if (this.props.className) {
        classesDialog += ' ' + this.props.className;
      }

      // Set classes for window contents
      var classesWindow = theme.dialogWindow;
      if (this.props.windowClassName) {
        classesWindow += " " + this.props.windowClassName;
      }

      // Set classes for window contents
      var classesWindowBody = theme.dialogWindowBody;
      if (this.props.dialogWindowBodyClassName) {
        classesWindowBody += " " + this.props.dialogWindowBodyClassName;
      }

      // Add title
      var title = void 0;
      if (this.props.title) {
        // If the title is a string, wrap in an h3 tag.
        // If not, just use it as a node.
        title = Object.prototype.toString.call(this.props.title) === '[object String]' ? _react2.default.createElement(
          'h3',
          { className: theme.dialogWindowTitle },
          this.props.title
        ) : this.props.title;
      }

      // Get actions to display at the bottom
      var actions = this._getActionsContainer(this.props.actions, theme);

      return _react2.default.createElement(
        'div',
        { className: classesDialog },
        _react2.default.createElement(
          'div',
          { className: classesWindow },
          _react2.default.createElement(
            _Paper2.default,
            { ref: 'dialogWindow', zDepth: 4 },
            title,
            _react2.default.createElement(
              'div',
              { ref: 'dialogBody', className: classesWindowBody },
              this.props.children
            ),
            actions
          )
        ),
        _react2.default.createElement(_Overlay2.default, {
          ref: 'dialogOverlay',
          show: this.state.open,
          autoLockScrolling: false,
          onClick: this._handleOverlayTouchTap
        })
      );
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.state.open;
    }
  }, {
    key: 'reposition',


    /**
     * Reposition the dialog - usually means dynamic content changed
     */
    value: function reposition() {
      this._positionDialog();
    }
  }, {
    key: '_addClassName',
    value: function _addClassName(reactObject, className) {
      var originalClassName = reactObject.props.className;
      var newClassname = originalClassName ? originalClassName + ' ' + className : className;

      return _react2.default.cloneElement(reactObject, { className: newClassname });
    }
  }, {
    key: '_getAction',
    value: function _getAction(actionJSON, key) {
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

      return _react2.default.createElement(_FlatButton2.default, props);
    }
  }, {
    key: '_getActionsContainer',
    value: function _getActionsContainer(actions, theme) {

      var actionContainer = void 0;
      var actionObjects = [];

      if (actions.length) {
        for (var i = 0; i < actions.length; i++) {
          var currentAction = actions[i];

          //if the current action isn't a react object, create one
          if (!_react2.default.isValidElement(currentAction)) {
            currentAction = this._getAction(currentAction, i);
          }

          currentAction = this._addClassName(currentAction, theme.dialogWindowAction);
          actionObjects.push(currentAction);
        }
        ;

        actionContainer = _react2.default.createElement(
          'div',
          { className: theme.dialogWindowActions },
          actionObjects
        );
      }

      return actionContainer;
    }
  }, {
    key: '_positionDialog',
    value: function _positionDialog() {

      if (this.state.open) {
        var clientHeight = _reactDom2.default.findDOMNode(this).offsetHeight;
        var dialogWindow = _reactDom2.default.findDOMNode(this.refs.dialogWindow);
        var dialogBody = _reactDom2.default.findDOMNode(this.refs.dialogBody);
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
    }
  }, {
    key: '_focusOnAction',
    value: function _focusOnAction() {
      if (this.props.actionFocus) {
        if (_reactDom2.default.findDOMNode(this.refs[this.props.actionFocus])) {
          _reactDom2.default.findDOMNode(this.refs[this.props.actionFocus]).focus();
        }
      }
    }
  }, {
    key: '_onShow',
    value: function _onShow() {
      if (this.props.onShow) this.props.onShow();
    }
  }, {
    key: '_onDismiss',
    value: function _onDismiss() {
      if (this.props.onDismiss) this.props.onDismiss();
    }
  }]);

  return Dialog;
}(_react.Component);

Dialog.propTypes = {
  /**
   * Array of possible actions to create buttons for
   */
  actions: _propTypes2.default.array,

  /**
   * Which action should get focus when loaded
   */
  actionFocus: _propTypes2.default.string,

  /**
   * Automatically detect the ideal height of the window
   */
  autoDetectWindowHeight: _propTypes2.default.bool,

  /**
   * Automatically scroll the body of the window if larger than viewable area
   */
  autoScrollBodyContent: _propTypes2.default.bool,

  /**
   * Class to theme the content container
   */
  contentClassName: _propTypes2.default.string,

  /**
   * If true, open as soon as we mount into the dom
   */
  openImmediately: _propTypes2.default.bool,

  /**
   * Action to perform when a user clicks away from the dialog
   */
  onClickAway: _propTypes2.default.func,

  /**
   * Callback to call when the dialog is dismissed
   */
  onDismiss: _propTypes2.default.func,

  /**
   * Callback to call when the dialog is shown
   */
  onShow: _propTypes2.default.func,

  /**
   * Automatically reposition the dialog if the contents change
   */
  repositionOnUpdate: _propTypes2.default.bool,

  /**
   * Do not allow the user to dismiss by clicking off the dialog
   */
  modal: _propTypes2.default.bool,

  /**
   * The title for the dialog window
   */
  title: _propTypes2.default.node
};
Dialog.contextTypes = {
  chamelTheme: _propTypes2.default.object
};
Dialog.defaultProps = {
  autoDetectWindowHeight: false,
  autoScrollBodyContent: false,
  actions: [],
  repositionOnUpdate: true,
  modal: false
};
exports.default = Dialog;
module.exports = exports['default'];