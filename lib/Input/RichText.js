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

var _draftJsExportHtml = require('draft-js-export-html');

var _draftJsImportHtml = require('draft-js-import-html');

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Custom overrides for "code" style.
var styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    }
};

/**
 * Chamel Editor component for editing rich text and source code
 */

var RichText = function (_React$Component) {
    _inherits(RichText, _React$Component);

    /**
     * Class constructor
     *
     * @param {Object} props Properties to send to the render function
     */


    /**
     * Set accepted properties
     */
    function RichText(props) {
        _classCallCheck(this, RichText);

        var _this = _possibleConstructorReturn(this, (RichText.__proto__ || Object.getPrototypeOf(RichText)).call(this, props));
        // Call parent constructor


        _this._onChange = function (editorState) {
            _this.setState({ editorState: editorState });

            if (_this.props.onChange) {
                var content = (0, _draftJsExportHtml.stateToHTML)(editorState.getCurrentContent());
                _this.props.onChange(content);
            }
        };

        _this._focus = function () {
            _this.refs.editor.focus();

            if (_this.props.onFocus) {
                var content = (0, _draftJsExportHtml.stateToHTML)(_this.state.editorState.getCurrentContent());
                _this.props.onFocus(content);
            }
        };

        _this._onBlur = function (editorState) {
            if (_this.props.onBlur) {
                var content = (0, _draftJsExportHtml.stateToHTML)(_this.state.editorState.getCurrentContent());
                _this.props.onBlur(content);
            }
        };

        _this._handleKeyCommand = function (command) {
            var editorState = _this.state.editorState;

            var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);

            if (newState) {
                _this._onChange(newState);
                return true;
            }

            return false;
        };

        _this._onTab = function (e) {
            var maxDepth = 4;
            _this._onChange(_draftJs.RichUtils.onTab(e, _this.state.editorState, maxDepth));
        };

        _this._toggleBlockType = function (blockType) {

            var editorState = _draftJs.RichUtils.toggleBlockType(_this.state.editorState, blockType);

            if (_this.props.onToggle) {
                var content = (0, _draftJsExportHtml.stateToHTML)(editorState.getCurrentContent());
                _this.props.onToggle(content);
            }

            _this.setState({ editorState: editorState });
        };

        _this._toggleInlineStyle = function (inlineStyle) {
            var editorState = _draftJs.RichUtils.toggleInlineStyle(_this.state.editorState, inlineStyle);

            if (_this.props.onToggle) {
                var content = (0, _draftJsExportHtml.stateToHTML)(editorState.getCurrentContent());
                _this.props.onToggle(content);
            }

            _this.setState({ editorState: editorState });
        };

        var initialEditorState = _draftJs.EditorState.createEmpty();

        // Check if we have a value that we will set in the editor
        if (props.value) {
            // Set the EditorState that it will have an existing content
            initialEditorState = _draftJs.EditorState.createWithContent((0, _draftJsImportHtml.stateFromHTML)(props.value));
        }

        _this.state = {
            editorState: initialEditorState
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
     * An alternate theme may be passed down by a provider
     */


    /**
     * Handles when the user set the focus in the editor
     *
     * @private
     */


    /**
     * Handle when the editor looses the focus
     *
     * @private
     */


    /**
     * Handle a RETURN keydown event
     *
     * @param {string} command The command that was sent
     * @returns {boolean}
     * @private
     */


    /**
     * Handle when user hits the tab button
     *
     * @param {DOMEvent} e Reference to the DOM event being sent
     * @returns {boolean}
     * @private
     */


    /**
     * Handles the toggling of block types in the toolbar icons
     *
     * @param {string} blockType The block type that was clicked
     * @private
     */


    /**
     * Handles the toggling of inline styles in the toolbar icons
     *
     * @param {string} inlineStyle The inline style that was clicked
     * @private
     */


    _createClass(RichText, [{
        key: '_getBlockStyle',


        /**
         * Handles the getting of block class name
         *
         * @param {obj} theme The theme that we are currently using
         * @param {obj} block Represents the state of the entire document.
         *
         * @return {string} Returns the current theme class name
         * @private
         */
        value: function _getBlockStyle(theme, block) {
            switch (block.getType()) {
                case 'blockquote':
                    return theme.RichTextBlockquote;
                default:
                    return null;
            }
        }

        /**
         * Componenent is about to receive new props
         */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.commandToggleStyle === 'block') {
                this._toggleBlockType(nextProps.commandToggleType);
            } else if (nextProps.commandToggleStyle === 'inline') {
                this._toggleInlineStyle(nextProps.commandToggleType);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var editorState = this.state.editorState;

            // Determine which theme to use

            var theme = this.context.chamelTheme && this.context.chamelTheme.input ? this.context.chamelTheme.input : _ChamelThemeService2.default.defaultTheme.input;

            // Set the classes
            var classes = theme.richText;

            // Determine if the editor has text
            var contentState = editorState.getCurrentContent();
            if (!contentState.hasText()) {
                if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                    classes += theme.RichTextHidePlaceholder;
                }
            }

            // Append the className specified in the this.props
            if (this.props.className) {
                classes += " " + this.props.className;
            }

            var classContainer = theme.richTextContainer;
            var selection = editorState.getSelection();
            var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

            return _react2.default.createElement(
                'div',
                { className: classContainer, id: 'test' },
                _react2.default.createElement(
                    'div',
                    { className: classes, onClick: this._focus },
                    _react2.default.createElement(_draftJs.Editor, {
                        blockStyleFn: this._getBlockStyle.bind(this, theme),
                        customStyleMap: styleMap,
                        editorState: editorState,
                        handleKeyCommand: this._handleKeyCommand,
                        onChange: this._onChange,
                        onBlur: this._onBlur,
                        onTab: this._onTab,
                        ref: 'editor',
                        spellCheck: true
                    })
                )
            );
        }
    }]);

    return RichText;
}(_react2.default.Component);

RichText.propTypes = {
    /**
     * The callback function used when user changes the content of the editor
     *
     * @type {function}
     */
    onChange: _react2.default.PropTypes.func,

    /**
     * The callback function used when user toggles an icon of the editor
     *
     * @type {function}
     */
    onToggle: _react2.default.PropTypes.func,

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
     * The command that will be executed based on the type that was provided
     *
     * @type {string}
     */
    commandToggleType: _react2.default.PropTypes.string,

    /**
     * This will determine what style to toggle
     *
     * @type {string}
     */
    commandToggleStyle: _react2.default.PropTypes.oneOf(['block', 'inline'])
};
RichText.contextTypes = {
    chamelTheme: _react2.default.PropTypes.object
};
exports.default = RichText;
module.exports = exports['default'];