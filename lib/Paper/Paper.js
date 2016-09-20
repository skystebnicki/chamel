'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Paper is a concept taken from google Material design standards
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Small application component
 */
var Paper = function (_React$Component) {
  _inherits(Paper, _React$Component);

  function Paper() {
    _classCallCheck(this, Paper);

    return _possibleConstructorReturn(this, (Paper.__proto__ || Object.getPrototypeOf(Paper)).apply(this, arguments));
  }

  _createClass(Paper, [{
    key: 'render',


    /**
     * Set property defaults
     */
    value: function render() {

      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.paper ? this.context.chamelTheme.paper : {};

      var classes = theme.paper;

      if (this.props.className) {
        classes += " " + this.props.className;
      }

      classes += " " + theme["paperZDepth" + this.props.zDepth];

      if (this.props.rounded) {
        classes += " " + theme.paperRounded;
      }

      if (this.props.circle) {
        classes += " " + theme.paperCircle;
      }

      var insideClasses = this.props.innerClassName + ' ' + theme.paperContainer + ' ' + theme["paperZDepth" + this.props.zDepth + "Bottom"];

      return _react2.default.createElement(
        'div',
        { className: classes, style: this.props.style, ref: 'innerContainer' },
        this.props.children
      );
    }

    /**
     * An alternate theme may be passed down by a provider
     */


    /**
     * Set accepted properties
     */

  }, {
    key: 'getInnerContainer',
    value: function getInnerContainer() {
      return this.refs.innerContainer;
    }
  }]);

  return Paper;
}(_react2.default.Component);

// Check for commonjs


Paper.propTypes = {
  circle: _react2.default.PropTypes.bool,
  innerClassName: _react2.default.PropTypes.string,
  rounded: _react2.default.PropTypes.bool,
  style: _react2.default.PropTypes.object,
  zDepth: _react2.default.PropTypes.oneOf([0, 1, 2, 3, 4, 5])
};
Paper.defaultProps = {
  innerClassName: '',
  rounded: true,
  zDepth: 1,
  style: null
};
Paper.contextTypes = {
  chamelTheme: _react2.default.PropTypes.object
};
if (module) {
  module.exports = Paper;
}

exports.default = Paper;
module.exports = exports['default'];