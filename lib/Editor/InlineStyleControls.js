'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _StyleButton = require('./StyleButton');

var _StyleButton2 = _interopRequireDefault(_StyleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Inline Styles that are used in the editor and displayed in the toolbar
var INLINE_STYLES = [{ label: 'Bold', style: 'BOLD' }, { label: 'Italic', style: 'ITALIC' }, { label: 'Underline', style: 'UNDERLINE' }, { label: 'Monospace', style: 'CODE' }];

/**
 * Handle when displaying the inline style controls and
 * Set the styles of the controls if it is toggled or not
 */

var InlineStyleControls = function (_React$Component) {
    _inherits(InlineStyleControls, _React$Component);

    /**
     * Class constructor
     *
     * @param {Object} props Properties to send to the render function
     */
    function InlineStyleControls(props) {
        _classCallCheck(this, InlineStyleControls);

        // Call parent constructor
        return _possibleConstructorReturn(this, (InlineStyleControls.__proto__ || Object.getPrototypeOf(InlineStyleControls)).call(this, props));
    }

    _createClass(InlineStyleControls, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var currentStyle = this.props.editorState.getCurrentInlineStyle();
            var displayStyles = [];

            // Loop thru the inline styles and setup the style button
            INLINE_STYLES.map(function (type) {

                var className = _this2.props.theme.chamelEditorStyleButton;
                if (currentStyle.has(type.style)) {
                    className += ' ' + _this2.props.theme.chamelEditorActiveButton;
                }

                displayStyles.push(_react2.default.createElement(_StyleButton2.default, {
                    key: type.label,
                    className: className,
                    label: type.label,
                    onToggle: _this2.props.onToggle,
                    style: type.style
                }));
            });

            return _react2.default.createElement(
                'div',
                { className: this.props.theme.chamelEditorControls },
                displayStyles
            );
        }
    }]);

    return InlineStyleControls;
}(_react2.default.Component);

InlineStyleControls.propTypes = {

    /**
     * The top-level state object for the draft-js editor.
     *
     * @var {object}
     */
    editorState: _react2.default.PropTypes.object.isRequired,

    /**
     * The theme that we will be using to decorate the toolbar buttons
     *
     * @var {object}
     */
    theme: _react2.default.PropTypes.object.isRequired,

    /**
     * The callback function used when user toggles the toolbar buttons of the editor
     *
     * @var {func}
     */
    onToggle: _react2.default.PropTypes.func
};
exports.default = InlineStyleControls;
module.exports = exports['default'];