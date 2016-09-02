'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _FontIcon = require('../FontIcon/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Toggle = require('../Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Types = {
    LINK: 'LINK',
    SUBHEADER: 'SUBHEADER',
    NESTED: 'NESTED'
};

var MenuItem = _react2.default.createClass({
    displayName: 'MenuItem',


    mixins: [_classable2.default],

    propTypes: (_propTypes = {
        index: _react2.default.PropTypes.number,
        iconClassName: _react2.default.PropTypes.string,
        iconRightClassName: _react2.default.PropTypes.string,
        attribute: _react2.default.PropTypes.string,
        number: _react2.default.PropTypes.string,
        data: _react2.default.PropTypes.string,
        toggle: _react2.default.PropTypes.bool,
        disabled: _react2.default.PropTypes.bool,
        onClick: _react2.default.PropTypes.func
    }, _defineProperty(_propTypes, 'onClick', _react2.default.PropTypes.func), _defineProperty(_propTypes, 'onToggle', _react2.default.PropTypes.func), _defineProperty(_propTypes, 'selected', _react2.default.PropTypes.bool), _defineProperty(_propTypes, 'indent', _react2.default.PropTypes.number), _propTypes),

    statics: {
        Types: Types
    },

    getDefaultProps: function getDefaultProps() {
        return {
            toggle: false,
            disabled: false,
            index: -1
        };
    },

    render: function render() {

        var classes = this.getClasses('chamel-menu-item', {
            'chamel-is-selected': this.props.selected,
            'chamel-is-focused': this.props.focused,
            'chamel-is-disabled': this.props.disabled
        });
        var icon;
        var data;
        var iconRight;
        var attribute;
        var number;
        var toggle;

        if (this.props.iconClassName) icon = _react2.default.createElement(_FontIcon2.default, { className: 'chamel-menu-item-icon ' + this.props.iconClassName });
        if (this.props.iconRightClassName) iconRight = _react2.default.createElement(_FontIcon2.default, { className: 'chamel-menu-item-icon-right ' + this.props.iconRightClassName });
        if (this.props.data) data = _react2.default.createElement(
            'span',
            { className: 'chamel-menu-item-data' },
            this.props.data
        );
        if (this.props.number !== undefined) number = _react2.default.createElement(
            'span',
            { className: 'chamel-menu-item-number' },
            this.props.number
        );
        if (this.props.attribute !== undefined) attribute = _react2.default.createElement(
            'span',
            { className: 'chamel-menu-item-attribute' },
            this.props.attribute
        );

        // Add indentations for hierarchical menus
        var numIndents = this.props.indent || 0;
        var indentItems = numIndents ? [] : null;
        for (var i = 0; i < numIndents; i++) {
            indentItems.push(_react2.default.createElement(
                'span',
                { className: 'chamel-menu-item-indent', key: i },
                " "
            ));
        }

        if (this.props.toggle) {
            var _props = this.props;
            var toggle = _props.toggle;
            var onClick = _props.onClick;
            var onToggle = _props.onToggle;
            var children = _props.children;
            var label = _props.label;

            var other = _objectWithoutProperties(_props, ['toggle', 'onClick', 'onToggle', 'children', 'label']);

            toggle = _react2.default.createElement(_Toggle2.default, _extends({}, other, { onToggle: this._handleToggle }));
        }

        return _react2.default.createElement(
            'div',
            {
                key: this.props.index,
                className: classes,
                onClick: this._handleOnClick },
            indentItems,
            icon,
            this.props.children,
            data,
            attribute,
            number,
            toggle,
            iconRight
        );
    },

    _handleTouchTap: function _handleTouchTap(e) {
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick(e, this.props.index);
        } else if (!this.props.disabled && this.props.onClick) {
            this._handleOnClick(e);
        }
    },

    _handleOnClick: function _handleOnClick(e) {
        if (!this.props.disabled && this.props.onClick) this.props.onClick(e, this.props.index);
    },

    _handleToggle: function _handleToggle(e, toggled) {
        if (!this.props.disabled && this.props.onToggle) this.props.onToggle(e, this.props.index, toggled);
    }

});

module.exports = MenuItem;