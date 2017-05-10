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

var _Checkbox = require('../Toggle/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

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
var ListItemCheckbox = function ListItemCheckbox(props, context) {
  var theme = context.chamelTheme && context.chamelTheme.list ? context.chamelTheme.list : _ChamelThemeService2.default.defaultTheme.list;

  var classes = (0, _classnames3.default)(theme.listItem, _defineProperty({}, theme.listItemSelected, props.checked));

  // Create a change function to call in case the user did not pass one
  var onChange = function onChange(e, checked) {
    if (props.onChange) {
      props.onChange(e, checked);
    }
  };

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
      'div',
      { className: theme.listItemContent },
      _react2.default.createElement(
        'div',
        { className: theme.listItemLeft },
        _react2.default.createElement(_Checkbox2.default, {
          onChange: onChange,
          checked: props.checked
        })
      ),
      _react2.default.createElement(
        'div',
        { className: theme.listItemData, onClick: function onClick(e) {
            onChange(e, !props.checked);
          } },
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
ListItemCheckbox.propTypes = {

  /**
   * Primary text/title of the item
   */
  primaryText: _propTypes2.default.string,

  /**
   * Secondary text for the item - often a snippet of the body
   */
  secondaryText: _propTypes2.default.string,

  /**
   * Node element to render on the right side
   */
  rightElement: _propTypes2.default.node,

  /**
   * Event called when we select the control
   */
  onChange: _propTypes2.default.func,

  /**
   * Bool to set whether or not this element is checked
   */
  checked: _propTypes2.default.bool
};

/**
 * Set property defaults
 */
ListItemCheckbox.defaultProps = {
  primaryText: null,
  secondaryText: null,
  leftElement: null,
  rightElement: null,
  checked: false
};

/**
 * An alternate theme may be passed down by a provider
 */
ListItemCheckbox.contextTypes = {
  chamelTheme: _propTypes2.default.object
};

exports.default = ListItemCheckbox;
module.exports = exports['default'];