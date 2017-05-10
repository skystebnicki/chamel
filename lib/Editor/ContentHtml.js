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

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

var _RichText = require('../Input/RichText');

var _RichText2 = _interopRequireDefault(_RichText);

var _EditorToolbar = require('./EditorToolbar');

var _EditorToolbar2 = _interopRequireDefault(_EditorToolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Contains both the toolbar and an instance of RichText component
 */
var ContentHtml = function (_Component) {
  _inherits(ContentHtml, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function ContentHtml(props) {
    _classCallCheck(this, ContentHtml);

    var _this = _possibleConstructorReturn(this, (ContentHtml.__proto__ || Object.getPrototypeOf(ContentHtml)).call(this, props));

    // Call parent constructor


    _this._onChange = function (value) {
      if (_this.props.onChange) {
        _this.props.onChange(value);
      }

      _this.setState({ value: value });
    };

    _this._onToggle = function (value) {
      if (_this.props.onChange) {
        _this.props.onChange(value);
      }

      _this.setState({
        value: value,
        toggleStyle: null,
        toggleType: null
      });
    };

    _this._onBlur = function (value) {
      if (_this.props.onBlur) {
        _this.props.onBlur(value);
      } else {
        //this.setState({value});
      }
    };

    _this._onFocus = function (value) {
      if (_this.props.onFocus) {
        _this.props.onFocus(value);
      } else {
        //this.setState({value});
      }
    };

    _this._handleStyleToggle = function (style, type) {
      console.log('toggle');
      _this.setState({
        toggleStyle: style,
        toggleType: type
      });
    };

    _this._handleContentViewToggle = function (contentView) {
      if (_this.props.onContentViewToggle) {
        _this.props.onContentViewToggle(contentView, _this.state.value);
      }
    };

    _this.state = {
      value: _this.props.value,
      toggleStyle: null,
      toggleType: null
    };
    return _this;
  }

  /**
   * Handle when the editor has changed
   *
   * @param {string} value The value of the editor
   * @private
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
   * Handles the toggling of styles in the toolbar icons
   *
   * @param {string} style The style that was clicked. It is either block style or inline style
   * @param {string} type The style type that was toggled. (e.g. bold, italic, underline, h1, h2, h3, ul, ol)
   * @private
   */


  /**
   * Handles the toggling of content view
   *
   * @param {int} contentView The content view we are switching to
   * @private
   */


  _createClass(ContentHtml, [{
    key: 'render',
    value: function render() {

      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.editor ? this.context.chamelTheme.editor : _ChamelThemeService2.default.defaultTheme.editor;

      return _react2.default.createElement(
        'div',
        { className: theme.richTextContainer },
        _react2.default.createElement(_EditorToolbar2.default, {
          contentViewType: this.props.contentViewType,
          onStyleToggle: this._handleStyleToggle,
          onContentViewToggle: this._handleContentViewToggle
        }),
        _react2.default.createElement(_RichText2.default, {
          commandToggleType: this.state.toggleType,
          commandToggleStyle: this.state.toggleStyle,
          onToggle: this._onToggle,
          onChange: this._onChange,
          onBlur: this._onBlur,
          onFocus: this._onFocus,
          value: this.state.value
        })
      );
    }
  }]);

  return ContentHtml;
}(_react.Component);

/**
 * Set accepted properties
 */


ContentHtml.propTypes = {
  /**
   * The callback function used when user changes the content of the editor
   *
   * @type {function}
   */
  onChange: _propTypes2.default.func,

  /**
   * The callback function used when user looses the focus of the editor
   *
   * @type {function}
   */
  onBlur: _propTypes2.default.func,

  /**
   * The initial value of the content editor
   *
   * @type {string}
   */
  value: _propTypes2.default.string,

  /**
   * Handles the toggling of content view
   *
   * @type {function}
   */
  onContentViewToggle: _propTypes2.default.func
};

/**
 * An alternate theme may be passed down by a provider
 */
ContentHtml.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

exports.default = ContentHtml;
module.exports = exports['default'];