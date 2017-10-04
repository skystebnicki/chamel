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

var _KeyCode = require('../utils/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _Overlay = require('../Overlay/Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Float a DIV above the DOM like a virtual page
 */
var Page = function (_Component) {
  _inherits(Page, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */


  /**
   * An alternate theme may be passed down by a provider
   */
  function Page(props) {
    _classCallCheck(this, Page);

    var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));
    // Call parent constructor


    _this.dismiss = function () {
      _this.setState({ open: false });
      _this._onDismiss();
    };

    _this.show = function () {
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
      if (!_this.props.modal && e.keyCode === _KeyCode2.default.ESC) {
        _this.dismiss();
      }
    };

    _this.state = {
      open: _this.props.openImmediately || false
    };
    return _this;
  }

  /**
   * Set some sane defaults
   *
   * @type {Object}
   */


  _createClass(Page, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._positionDialog();

      // TODO
      // 'keyup': '_handleWindowKeyUp'

      if (this.props.openImmediately) {
        this._onShow();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      this._positionDialog();
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
      var classesPage = theme.dialogPage;
      if (this.props.className) {
        classesPage += " " + this.props.className;
      }

      return _react2.default.createElement(
        'div',
        { className: classesDialog },
        _react2.default.createElement(
          'div',
          { className: classesPage, ref: 'dialogPage' },
          this.props.children
        ),
        _react2.default.createElement(_Overlay2.default, {
          ref: 'dialogOverlay',
          show: this.state.open,
          autoLockScrolling: true,
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
    key: '_positionDialog',
    value: function _positionDialog() {

      if (this.state.open) {
        var clientHeight = _reactDom2.default.findDOMNode(this).offsetHeight;
        var dialogPage = _reactDom2.default.findDOMNode(this.refs.dialogPage);
        var minMarginTop = 0;

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

  return Page;
}(_react.Component);

Page.propTypes = {
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
  title: _propTypes2.default.node,

  /**
   * Flag to set this dialog to take up 100% of the page
   */
  fullPage: _propTypes2.default.bool
};
Page.contextTypes = {
  chamelTheme: _propTypes2.default.object
};
Page.defaultProps = {
  autoDetectWindowHeight: true,
  autoScrollBodyContent: true,
  actions: [],
  repositionOnUpdate: true,
  modal: false
};
exports.default = Page;
module.exports = exports['default'];