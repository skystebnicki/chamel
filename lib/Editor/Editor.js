'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

var _ContentHtml = require('./ContentHtml');

var _ContentHtml2 = _interopRequireDefault(_ContentHtml);

var _ContentSource = require('./ContentSource');

var _ContentSource2 = _interopRequireDefault(_ContentSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Types of content views
var HTML_VIEW = 'html';
var SOURCE_VIEW = 'source';

/**
 * Chamel Editor component for editing rich text and source code
 */

var ChamelEditor = function (_React$Component) {
  _inherits(ChamelEditor, _React$Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */


  /**
   * An alternate theme may be passed down by a provider
   */
  function ChamelEditor(props) {
    _classCallCheck(this, ChamelEditor);

    var _this = _possibleConstructorReturn(this, (ChamelEditor.__proto__ || Object.getPrototypeOf(ChamelEditor)).call(this, props));
    // Call parent constructor


    _this._onChange = function (value) {
      if (_this.props.onChange) {
        _this.props.onChange(value);
      }
    };

    _this._onBlur = function (value) {
      if (_this.props.onBlur) {
        _this.props.onBlur(value);
      }
    };

    _this._onFocus = function (value) {
      if (_this.props.onFocus) {
        _this.props.onFocus(value);
      }
    };

    _this._handleContentViewToggle = function (contentView, value) {
      _this.setState({ contentView: contentView, value: value });
    };

    _this.state = {
      contentView: _this.props.contentView,
      value: _this.props.value
    };
    return _this;
  }

  /**
   * Handle when the editor has changed
   *
   * @param {obj} editorState  The top-level state object for the editor.
   * @private
   */


  /**
   * Set accepted properties
   */


  /**
   * Handle when the editor looses the focus
   *
   * @param {string} value The value of the editor
   * @private
   */


  /**
   * Handles when the user set the focus in the editor
   *
   * @param {string} value The value of the editor
   * @private
   */


  /**
   * Handles the toggling of content view
   *
   * @param {int} contentView The content view we are switching to
   * @param {string} value The content of the editor
   * @private
   */


  _createClass(ChamelEditor, [{
    key: 'render',


    /**
     * Render shadow dom
     *
     * @returns {Object}
     */
    value: function render() {
      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.editor ? this.context.chamelTheme.editor : _ChamelThemeService2.default.defaultTheme.editor;

      var displaySourceView = null;

      switch (this.state.contentView) {
        case HTML_VIEW:
          displaySourceView = _react2.default.createElement(_ContentHtml2.default, {
            onChange: this._onChange,
            onBlur: this._onBlur,
            onFocus: this._onFocus,
            contentViewType: HTML_VIEW,
            onContentViewToggle: this._handleContentViewToggle,
            value: this.state.value
          });
          break;

        case SOURCE_VIEW:
          displaySourceView = _react2.default.createElement(_ContentSource2.default, {
            onChange: this._onChange,
            onBlur: this._onBlur,
            onFocus: this._onFocus,
            onContentViewToggle: this._handleContentViewToggle,
            contentViewType: SOURCE_VIEW,
            value: this.state.value
          });
          break;
      }

      return _react2.default.createElement(
        'div',
        null,
        displaySourceView
      );
    }
  }]);

  return ChamelEditor;
}(_react2.default.Component);

ChamelEditor.propTypes = {
  /**
   * The callback function used when user changes the content of the editor
   *
   * @type {function}
   */
  onChange: _react2.default.PropTypes.func,

  /**
   * The callback function used when user looses the focus of the editor
   *
   * @type {function}
   */
  onBlur: _react2.default.PropTypes.func,

  /**
   * The initial value of the content editor
   *
   * @type {string}
   */
  value: _react2.default.PropTypes.string,

  /**
   * Determine what is the intial content view to be displayed
   *
   * @type {string}
   */
  contentView: _react2.default.PropTypes.oneOf(['html', 'source'])
};
ChamelEditor.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};
ChamelEditor.defaultProps = {
  contentView: HTML_VIEW
};
exports.default = ChamelEditor;
module.exports = exports['default'];