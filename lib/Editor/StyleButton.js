'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Style button component that will display the style button in the toolbar editor
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

    var _this = _possibleConstructorReturn(this, (InlineStyleControls.__proto__ || Object.getPrototypeOf(InlineStyleControls)).call(this, props));

    // Call parent constructor


    _this._onToggle = function (e) {
      e.preventDefault();
      _this.props.onToggle(_this.props.style);
    };

    return _this;
  }

  _createClass(InlineStyleControls, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        { className: this.props.className, onMouseDown: this._onToggle },
        this.props.label
      );
    }

    /**
     * Function that handles the toggling of toolbar button
     *
     * @param {DOMEvent} e Reference to the DOM event being sent
     * @private
     */

  }]);

  return InlineStyleControls;
}(_react2.default.Component);

InlineStyleControls.propTypes = {

  /**
   * The top-level state object for the draft-js editor.
   *
   * @var {string}
   */
  style: _react2.default.PropTypes.string.isRequired,

  /**
   * The label of the button that will be displayed in the editor's toolbar
   *
   * @var {string}
   */
  label: _react2.default.PropTypes.string,

  /**
   * The callback function used when user toggles the toolbar buttons of the editor
   *
   * @var {func}
   */
  onToggle: _react2.default.PropTypes.func
};
exports.default = InlineStyleControls;
module.exports = exports['default'];