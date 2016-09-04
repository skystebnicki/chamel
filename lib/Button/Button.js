'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTappable = require('react-tappable');

var _reactTappable2 = _interopRequireDefault(_reactTappable);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Functional component for any button
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
var Button = function Button(props, context) {
    var _classnames;

    var theme = context.chamelTheme && context.chamelTheme.button ? context.chamelTheme.button : {};

    // Setu pclasses
    var className = props.className || null;
    var type = props.type;
    var classes = (0, _classnames3.default)(theme.button, theme[type], (_classnames = {}, _defineProperty(_classnames, theme[type + "primary"], props.primary), _defineProperty(_classnames, theme[type + "accent"], props.accent), _defineProperty(_classnames, theme[type + "disabled"], props.disabled), _classnames), className);

    if (props.onTap && !props.disabled) {
        return _react2.default.createElement(
            _reactTappable2.default,
            { onTap: props.onTap },
            _react2.default.createElement(
                'button',
                { className: classes },
                props.children
            )
        );
    } else {
        return _react2.default.createElement(
            'button',
            { disabled: props.disabled, className: classes },
            props.children
        );
    }
};

/**
 * Set accepted properties
 */
Button.propTypes = {
    accent: _react.PropTypes.bool,
    primary: _react.PropTypes.bool,
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    flat: _react.PropTypes.bool,
    floating: _react.PropTypes.bool,
    href: _react.PropTypes.string,
    icon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    inverse: _react.PropTypes.bool,
    label: _react.PropTypes.string,
    mini: _react.PropTypes.bool,
    neutral: _react.PropTypes.bool,
    onMouseLeave: _react.PropTypes.func,
    onMouseUp: _react.PropTypes.func,
    raised: _react.PropTypes.bool,
    type: _react.PropTypes.oneOf(['raised', 'flat', 'floating'])
};

/**
 * Set property defaults
 */
Button.defaultProps = {
    accent: false,
    className: '',
    flat: false,
    floating: false,
    mini: false,
    neutral: true,
    primary: false,
    raised: false,
    type: "raised"
};

/**
 * An alternate theme may be passed down by a provider
 */
Button.contextTypes = {
    chamelTheme: _react2.default.PropTypes.object
};

// Check for commonjs
if (module) {
    module.exports = Button;
}

exports.default = Button;
module.exports = exports['default'];