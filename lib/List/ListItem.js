'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TouchRipple = require('../ripples/TouchRipple');

var _TouchRipple2 = _interopRequireDefault(_TouchRipple);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

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
  var _classnames;

  var theme = context.chamelTheme && context.chamelTheme.list ? context.chamelTheme.list : _ChamelThemeService2.default.defaultTheme.list;

  var classes = (0, _classnames3.default)(theme.listItem, (_classnames = {}, _defineProperty(_classnames, theme.listItemSelected, props.selected), _defineProperty(_classnames, theme.listItemEmphasized, props.emphasized), _classnames));

  // Set ontap function
  var onTap = props.onTap ? props.onTap : function (e) {};

  // If we have a left element add it
  var leftElement = props.leftElement ? _react2.default.createElement(
    'div',
    { onClick: onTap, className: theme.listItemLeft },
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
    { className: classes },
    _react2.default.createElement(
      _TouchRipple2.default,
      null,
      _react2.default.createElement(
        'div',
        { className: theme.listItemContent },
        leftElement,
        _react2.default.createElement(
          'div',
          { className: theme.listItemData, onClick: onTap },
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
    )
  );
};

/**
 * Set accepted properties
 */
ListItem.propTypes = {

  /**
   * Primary text/title of the item
   */
  primaryText: _propTypes2.default.string,

  /**
   * Secondary text for the item - often a snippet of the body
   */
  secondaryText: _propTypes2.default.string,

  /**
   * Optional children to render into the item
   */
  children: _propTypes2.default.node,

  /**
   * Optional flag that can be set to indicate this item is selected
   */
  selected: _propTypes2.default.bool,

  /**
   * Used to highlight an entry - often used to mark a new entry
   */
  emphasized: _propTypes2.default.bool,

  /**
   * Node element to render on the left side
   */
  leftElement: _propTypes2.default.node,

  /**
   * Node element to render on the right side
   */
  rightElement: _propTypes2.default.node,

  /**
   * Event called when the primary action is tapped or Clicked
   */
  onTap: _propTypes2.default.func
};

/**
 * Set property defaults
 */
ListItem.defaultProps = {
  primaryText: null,
  secondaryText: null,
  leftElement: null,
  rightElement: null,
  selected: false,
  emphasized: false
};

/**
 * An alternate theme may be passed down by a provider
 */
ListItem.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

exports.default = ListItem;
module.exports = exports['default'];