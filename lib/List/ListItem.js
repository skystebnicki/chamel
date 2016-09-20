'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TouchRipple = require('../ripples/TouchRipple');

var _TouchRipple2 = _interopRequireDefault(_TouchRipple);

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
var ListItem = function ListItem(props, context) {
  var theme = context.chamelTheme && context.chamelTheme.list ? context.chamelTheme.list : {};

  var classes = (0, _classnames3.default)(theme.listItem, _defineProperty({}, theme.listItemSelected, props.selected));

  // If we have a left element add it
  var leftElement = props.leftElement ? _react2.default.createElement(
    'div',
    { className: theme.listItemLeft },
    props.leftElement
  ) : null;

  // If we have a right element add it
  var rightElement = props.rightElement ? _react2.default.createElement(
    'div',
    { className: theme.listItemRight },
    props.rightElement
  ) : null;

  return _react2.default.createElement(
    'div',
    { className: classes, onClick: props.onTap },
    _react2.default.createElement(_TouchRipple2.default, null),
    _react2.default.createElement(
      'div',
      { className: theme.listItemContent },
      leftElement,
      _react2.default.createElement(
        'div',
        { className: theme.listItemData },
        _react2.default.createElement(
          'div',
          { className: theme.listItemPrimary },
          props.primaryText
        ),
        _react2.default.createElement(
          'div',
          { className: theme.listItemSecondary },
          props.secondaryText
        )
      ),
      rightElement
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
  /**
   * Optional flag that can be set to indicate this item is selected
   */
  selected: _react.PropTypes.bool,

  leftElement: _react.PropTypes.node,
  rightElement: _react.PropTypes.node
};

/**
 * Set property defaults
 */
ListItem.defaultProps = {
  primaryText: null,
  secondaryText: null,
  leftElement: null,
  rightElement: null,
  selected: false
};

/**
 * An alternate theme may be passed down by a provider
 */
ListItem.contextTypes = {
  chamelTheme: _react.PropTypes.object
};

exports.default = ListItem;
module.exports = exports['default'];