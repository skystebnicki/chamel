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
        props.children
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