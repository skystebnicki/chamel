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

var _EditorToolbar = require('./EditorToolbar');

var _EditorToolbar2 = _interopRequireDefault(_EditorToolbar);

var _reactCodemirror = require('react-codemirror');

var _reactCodemirror2 = _interopRequireDefault(_reactCodemirror);

require('codemirror/mode/jsx/jsx');

require('codemirror/lib/codemirror.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Contains codemirror and the toolbar for viewing source
 */
var ContentSource = function (_React$Component) {
    _inherits(ContentSource, _React$Component);

    /**
     * Class constructor
     *
     * @param {Object} props Properties to send to the render function
     */


    /**
     * Set accepted properties
     */
    function ContentSource(props) {
        _classCallCheck(this, ContentSource);

        var _this = _possibleConstructorReturn(this, (ContentSource.__proto__ || Object.getPrototypeOf(ContentSource)).call(this, props));

        // Call parent constructor


        _this._onChange = function (value) {
            if (_this.props.onChange) {
                _this.props.onChange(value);
            }

            _this.setState({ value: value });
        };

        _this._handleContentViewToggle = function (contentView) {
            if (_this.props.onContentViewToggle) {
                _this.props.onContentViewToggle(contentView, _this.state.value);
            }
        };

        _this.state = {
            value: _this.props.value
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
     * An alternate theme may be passed down by a provider
     */


    /**
     * Handles the toggling of content view
     *
     * @param {int} contentView The content view we are switching to
     * @private
     */


    _createClass(ContentSource, [{
        key: 'render',
        value: function render() {

            // Determine which theme to use
            var theme = this.context.chamelTheme && this.context.chamelTheme.editor ? this.context.chamelTheme.editor : _ChamelThemeService2.default.defaultTheme.editor;

            var options = {
                lineNumbers: true
            };

            return _react2.default.createElement(
                'div',
                { className: theme.richTextContainer },
                _react2.default.createElement(_EditorToolbar2.default, {
                    contentViewType: this.props.contentViewType,
                    onContentViewToggle: this._handleContentViewToggle
                }),
                _react2.default.createElement(_reactCodemirror2.default, { value: this.state.value, onChange: this._onChange, options: options })
            );
        }
    }]);

    return ContentSource;
}(_react2.default.Component);

ContentSource.propTypes = {
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
     * Handles the toggling of content view
     *
     * @type {function}
     */
    onContentViewToggle: _react2.default.PropTypes.func
};
ContentSource.contextTypes = {
    chamelTheme: _react2.default.PropTypes.object
};
exports.default = ContentSource;
module.exports = exports['default'];