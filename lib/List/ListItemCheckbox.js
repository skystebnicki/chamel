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
  primaryText: _react.PropTypes.string,

  /**
   * Secondary text for the item - often a snippet of the body
   */
  secondaryText: _react.PropTypes.string,

  /**
   * Node element to render on the right side
   */
  rightElement: _react.PropTypes.node,

  /**
   * Event called when we select the control
   */
  onChange: _react.PropTypes.func,

  /**
   * Bool to set whether or not this element is checked
   */
  checked: _react.PropTypes.bool
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
  chamelTheme: _react.PropTypes.object
};

exports.default = ListItemCheckbox;
module.exports = exports['default'];