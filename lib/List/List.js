'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
var List = function List(props, context) {
  var theme = context.chamelTheme && context.chamelTheme.button ? context.chamelTheme.button : {};

  var currentIndex = 0;
  var childElements = _react.Children.map(props.children, function (child) {
    var retChild = child;
    if (_react2.default.isValidElement(child) && props.selectable) {
      retChild = _react2.default.cloneElement(child, {
        selected: props.selectedIndex === currentIndex
      });
    }

    // Increment index to keep track of selected
    currentIndex++;

    return retChild;
    /*
      return isValidElement(child) ? (
          cloneElement(child, {
              nestedLevel: nestedLevel + 1,
          })
      ) : child;
      */
  });

  return _react2.default.createElement(
    'div',
    null,
    childElements
  );
};

/**
 * Set accepted properties
 */
List.propTypes = {
  children: _react.PropTypes.node,
  selectable: _react.PropTypes.bool,
  defaultValue: _react.PropTypes.string
};

/**
 * Set property defaults
 */
List.defaultProps = {
  selectable: false,
  defaultValue: null
};

/**
 * An alternate theme may be passed down by a provider
 */
List.contextTypes = {
  chamelTheme: _react.PropTypes.object
};

exports.default = List;
module.exports = exports['default'];