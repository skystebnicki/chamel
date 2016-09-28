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

// Block Types that are used in the editor and displayed in the toolbar
var BLOCK_TYPES = [{ label: 'H1', style: 'header-one' }, { label: 'H2', style: 'header-two' }, { label: 'H3', style: 'header-three' }, { label: 'H4', style: 'header-four' }, { label: 'H5', style: 'header-five' }, { label: 'H6', style: 'header-six' }, { label: 'Blockquote', style: 'blockquote' }, { label: 'UL', style: 'unordered-list-item' }, { label: 'OL', style: 'ordered-list-item' }, { label: 'Code Block', style: 'code-block' }];

/**
 * Handle when displaying the block type controls and
 * Set the styles of the controls if it is toggled or not
 */

var BlockStyleControls = function (_React$Component) {
    _inherits(BlockStyleControls, _React$Component);

    /**
     * Class constructor
     *
     * @param {Object} props Properties to send to the render function
     */
    function BlockStyleControls(props) {
        _classCallCheck(this, BlockStyleControls);

        // Call parent constructor
        return _possibleConstructorReturn(this, (BlockStyleControls.__proto__ || Object.getPrototypeOf(BlockStyleControls)).call(this, props));
    }

    _createClass(BlockStyleControls, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var displayStyleButton = [];

            // Loop thru the block types and setup the style button
            BLOCK_TYPES.map(function (type) {

                var className = _this2.props.theme.chamelEditorStyleButton;
                if (type.style === _this2.props.blockType) {
                    className += ' ' + _this2.props.theme.chamelEditorActiveButton;
                }

                displayStyleButton.push(_react2.default.createElement(_StyleButton2.default, {
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
                displayStyleButton
            );
        }
    }]);

    return BlockStyleControls;
}(_react2.default.Component);

BlockStyleControls.propTypes = {

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
exports.default = BlockStyleControls;
module.exports = exports['default'];