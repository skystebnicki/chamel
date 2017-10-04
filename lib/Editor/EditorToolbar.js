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

var _Toolbar = require('../Toolbar/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _ToolbarGroup = require('../Toolbar/ToolbarGroup');

var _ToolbarGroup2 = _interopRequireDefault(_ToolbarGroup);

var _IconButton = require('../Button/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _TitleIcon = require('../icons/font/TitleIcon');

var _TitleIcon2 = _interopRequireDefault(_TitleIcon);

var _ListBulletedIcon = require('../icons/font/ListBulletedIcon');

var _ListBulletedIcon2 = _interopRequireDefault(_ListBulletedIcon);

var _ListNumberedIcon = require('../icons/font/ListNumberedIcon');

var _ListNumberedIcon2 = _interopRequireDefault(_ListNumberedIcon);

var _BoldIcon = require('../icons/font/BoldIcon');

var _BoldIcon2 = _interopRequireDefault(_BoldIcon);

var _ItalicIcon = require('../icons/font/ItalicIcon');

var _ItalicIcon2 = _interopRequireDefault(_ItalicIcon);

var _UnderlinedIcon = require('../icons/font/UnderlinedIcon');

var _UnderlinedIcon2 = _interopRequireDefault(_UnderlinedIcon);

var _CodeIcon = require('../icons/font/CodeIcon');

var _CodeIcon2 = _interopRequireDefault(_CodeIcon);

var _WebIcon = require('../icons/font/WebIcon');

var _WebIcon2 = _interopRequireDefault(_WebIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Block Types that are used in the editor and displayed in the toolbar
var BLOCK_TYPES = [{ label: 'H1', style: 'header-one', class: _TitleIcon2.default, props: { headerType: 1 } }, { label: 'H2', style: 'header-two', class: _TitleIcon2.default, props: { headerType: 2 } }, { label: 'H3', style: 'header-three', class: _TitleIcon2.default, props: { headerType: 3 } }, { label: 'H4', style: 'header-four', class: _TitleIcon2.default, props: { headerType: 4 } }, { label: 'H5', style: 'header-five', class: _TitleIcon2.default, props: { headerType: 5 } }, { label: 'H6', style: 'header-six', class: _TitleIcon2.default, props: { headerType: 6 } }, { label: 'OL', style: 'ordered-list-item', class: _ListBulletedIcon2.default, props: {} }, { label: 'UL', style: 'unordered-list-item', class: _ListNumberedIcon2.default, props: {} }];

// Inline Styles that are used in the editor and displayed in the toolbar
var INLINE_STYLES = [{ label: 'Bold', style: 'BOLD', class: _BoldIcon2.default, props: {} }, { label: 'Italic', style: 'ITALIC', class: _ItalicIcon2.default, props: {} }, { label: 'Underline', style: 'UNDERLINE', class: _UnderlinedIcon2.default, props: {} }];

// Types of content views
var HTML_VIEW = 'html';
var SOURCE_VIEW = 'source';

/**
 * Handle when displaying the block type controls and
 * Set the styles of the controls if it is toggled or not
 */

var EditorToolbar = function (_Component) {
  _inherits(EditorToolbar, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function EditorToolbar(props) {
    _classCallCheck(this, EditorToolbar);

    // Call parent constructor
    return _possibleConstructorReturn(this, (EditorToolbar.__proto__ || Object.getPrototypeOf(EditorToolbar)).call(this, props));
  }

  _createClass(EditorToolbar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var displayBlockStyles = [];
      var displayInlineStyles = [];
      var displayConteViewType = [];

      switch (this.props.contentViewType) {
        case HTML_VIEW:

          // Loop thru the block types and setup the style button
          BLOCK_TYPES.map(function (blockType, idx) {

            displayBlockStyles.push(_react2.default.createElement(
              _IconButton2.default,
              { key: "block" + idx, onTap: function onTap(e) {
                  _this2.props.onStyleToggle("block", blockType.style);
                } },
              _react2.default.createElement(blockType.class, blockType.props)
            ));
          });

          // Loop thru the inline styles and setup the style button
          INLINE_STYLES.map(function (inlineType, idx) {

            displayInlineStyles.push(_react2.default.createElement(
              _IconButton2.default,
              { key: "inline" + idx, onTap: function onTap(e) {
                  _this2.props.onStyleToggle("inline", inlineType.style);
                } },
              _react2.default.createElement(inlineType.class, inlineType.props)
            ));
          });

          displayConteViewType = _react2.default.createElement(
            _IconButton2.default,
            { onTap: function onTap(e) {
                _this2.props.onContentViewToggle(SOURCE_VIEW);
              } },
            _react2.default.createElement(_CodeIcon2.default, null)
          );
          break;

        case SOURCE_VIEW:
          displayConteViewType = _react2.default.createElement(
            _IconButton2.default,
            { onTap: function onTap(e) {
                _this2.props.onContentViewToggle(HTML_VIEW);
              } },
            _react2.default.createElement(_WebIcon2.default, null)
          );
          break;
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Toolbar2.default,
          { secondary: true },
          _react2.default.createElement(
            _ToolbarGroup2.default,
            { key: 1, align: 'left' },
            displayInlineStyles
          ),
          _react2.default.createElement(
            _ToolbarGroup2.default,
            { key: 2, align: 'left' },
            displayBlockStyles
          ),
          _react2.default.createElement(
            _ToolbarGroup2.default,
            { key: 3, align: 'right' },
            displayConteViewType
          )
        )
      );
    }
  }]);

  return EditorToolbar;
}(_react.Component);

EditorToolbar.propTypes = {

  /**
   * Determines which toolbar should we display for current type of content view
   *
   * @var {int}
   */
  contentViewType: _propTypes2.default.oneOf([HTML_VIEW, SOURCE_VIEW]),

  /**
   * The callback function used when user toggles the styles in the toolbar buttons
   *
   * @var {func}
   */
  onStyleToggle: _propTypes2.default.func,

  /**
   * The callback function used when user toggles content view of the editor
   *
   * @var {func}
   */
  onContentViewToggle: _propTypes2.default.func };
exports.default = EditorToolbar;
module.exports = exports['default'];