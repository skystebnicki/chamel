'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Small application component
 */
var Paper = _react2.default.createClass({
  displayName: 'Paper',


  //mixins: [Classable],

  propTypes: {
    circle: _react2.default.PropTypes.bool,
    innerClassName: _react2.default.PropTypes.string,
    rounded: _react2.default.PropTypes.bool,
    zDepth: _react2.default.PropTypes.oneOf([0, 1, 2, 3, 4, 5])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      innerClassName: '',
      rounded: true,
      zDepth: 1
    };
  },

  render: function render() {

    var classes = "";

    if (this.props.className) {
      classes += this.props.className + " ";
    }

    classes += "chamel-paper chamel-z-depth-" + this.props.zDepth;

    if (this.props.rounded) {
      classes += " chamel-rounded";
    }

    if (this.props.circle) {
      classes += " chamel-circle";
    }

    var insideClasses = this.props.innerClassName + ' ' + 'chamel-paper-container ' + 'chamel-z-depth-bottom';

    return _react2.default.createElement(
      'div',
      { className: classes },
      _react2.default.createElement(
        'div',
        { ref: 'innerContainer', className: insideClasses },
        this.props.children
      )
    );
  },

  getInnerContainer: function getInnerContainer() {
    return this.refs.innerContainer;
  }

});

// Check for commonjs
/**
 * Paper is a concept taken from google Material design standards
 *
 */
if (module) {
  module.exports = Paper;
}

exports.default = Paper;
module.exports = exports['default'];