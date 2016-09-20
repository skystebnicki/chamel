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
var ListItem = function ListItem(props, context) {
    var theme = context.chamelTheme && context.chamelTheme.button ? context.chamelTheme.button : {};

    /*
     let childElements = Children.map(props.children, (child) => {
     if (isValidElement(child) && props.selectable) {
      } else {
     return child;
     }
     return isValidElement(child) ? (
     cloneElement(child, {
     nestedLevel: nestedLevel + 1,
     })
     ) : child;
     });
     */

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            null,
            props.leftElement
        ),
        _react2.default.createElement(
            'div',
            null,
            props.primaryText
        ),
        _react2.default.createElement(
            'div',
            null,
            props.secondaryText
        ),
        _react2.default.createElement(
            'div',
            null,
            props.rightElement
        )
    );
};

/**
 * Set accepted properties
 */
ListItem.propTypes = {
    primaryText: _react.PropTypes.string,
    secondaryText: _react.PropTypes.string,
    children: _react.PropTypes.node,
    selectable: _react.PropTypes.bool,
    defaultValue: _react.PropTypes.string,
    leftElement: _react.PropTypes.node,
    rightElement: _react.PropTypes.node
};

/**
 * Set property defaults
 */
ListItem.defaultProps = {
    primaryText: null,
    secondaryText: null,
    selectable: false,
    defaultValue: null,
    leftElement: null,
    rightElement: null
};

/**
 * An alternate theme may be passed down by a provider
 */
ListItem.contextTypes = {
    chamelTheme: _react.PropTypes.object
};

exports.default = ListItem;
module.exports = exports['default'];