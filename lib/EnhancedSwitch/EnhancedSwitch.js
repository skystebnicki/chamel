'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _KeyCode = require('../utils/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _UniqueId = require('../utils/UniqueId');

var _UniqueId2 = _interopRequireDefault(_UniqueId);

var _WindowListenable = require('../mixins/WindowListenable');

var _WindowListenable2 = _interopRequireDefault(_WindowListenable);

var _FocusRipple = require('../ripples/FocusRipple');

var _FocusRipple2 = _interopRequireDefault(_FocusRipple);

var _TouchRipple = require('../ripples/TouchRipple');

var _TouchRipple2 = _interopRequireDefault(_TouchRipple);

var _Paper = require('../Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EnhancedSwitch = _react2.default.createClass({
  displayName: 'EnhancedSwitch',


  mixins: [_classable2.default, _WindowListenable2.default],

  propTypes: {
    id: _react2.default.PropTypes.string,
    inputType: _react2.default.PropTypes.string.isRequired,
    switchElement: _react2.default.PropTypes.element.isRequired,
    iconClassName: _react2.default.PropTypes.string.isRequired,
    name: _react2.default.PropTypes.string,
    value: _react2.default.PropTypes.any,
    label: _react2.default.PropTypes.string,
    onSwitch: _react2.default.PropTypes.func,
    required: _react2.default.PropTypes.bool,
    disabled: _react2.default.PropTypes.bool,
    defaultSwitched: _react2.default.PropTypes.bool,
    labelPosition: _react2.default.PropTypes.oneOf(['left', 'right']),
    disableFocusRipple: _react2.default.PropTypes.bool,
    disableTouchRipple: _react2.default.PropTypes.bool,

    /**
     * Print as inline block if true
     *
     * @default false
     * @type {bool}
     */
    inline: _react2.default.PropTypes.bool
  },

  windowListeners: {
    'keydown': '_handleWindowKeydown',
    'keyup': '_handleWindowKeyup'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      iconClassName: '',
      inline: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      switched: this.props.defaultSwitched || this.props.valueLink && this.props.valueLink.value,
      isKeyboardFocused: false
    };
  },

  componentDidMount: function componentDidMount() {
    var inputNode = _reactDom2.default.findDOMNode(this.refs.checkbox);
    this.setState({ switched: inputNode.checked });
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var hasCheckedLinkProp = nextProps.hasOwnProperty('checkedLink');
    var hasCheckedProp = nextProps.hasOwnProperty('checked');
    var hasToggledProp = nextProps.hasOwnProperty('toggled');
    var hasNewDefaultProp = nextProps.hasOwnProperty('defaultSwitched') && nextProps.defaultSwitched != this.props.defaultSwitched;
    var newState = {};

    if (hasCheckedProp) {
      newState.switched = nextProps.checked;
    } else if (hasToggledProp) {
      newState.switched = nextProps.toggled;
    } else if (hasCheckedLinkProp) {
      newState.switched = nextProps.checkedLink.value;
    }

    if (newState) this.setState(newState);
  },

  render: function render() {
    var _props = this.props;
    var type = _props.type;
    var name = _props.name;
    var value = _props.value;
    var label = _props.label;
    var onSwitch = _props.onSwitch;
    var defaultSwitched = _props.defaultSwitched;
    var onBlur = _props.onBlur;
    var onFocus = _props.onFocus;
    var onMouseUp = _props.onMouseUp;
    var onMouseDown = _props.onMouseDown;
    var onMouseOut = _props.onMouseOut;
    var onTouchStart = _props.onTouchStart;
    var onTouchEnd = _props.onTouchEnd;
    var disableTouchRipple = _props.disableTouchRipple;
    var disableFocusRipple = _props.disableFocusRipple;
    var iconClassName = _props.iconClassName;

    var other = _objectWithoutProperties(_props, ['type', 'name', 'value', 'label', 'onSwitch', 'defaultSwitched', 'onBlur', 'onFocus', 'onMouseUp', 'onMouseDown', 'onMouseOut', 'onTouchStart', 'onTouchEnd', 'disableTouchRipple', 'disableFocusRipple', 'iconClassName']);

    var classes = this.getClasses('chamel-enhanced-switch', {
      'chamel-is-switched': this.state.switched,
      'chamel-is-disabled': this.props.disabled,
      'chamel-is-required': this.props.required,
      'chamel-is-inline': this.props.inline
    });

    var inputId = this.props.id || _UniqueId2.default.generate();

    var labelElement = this.props.label ? _react2.default.createElement(
      'label',
      { className: 'chamel-switch-label', htmlFor: inputId },
      this.props.label
    ) : null;

    var inputProps = {
      ref: "checkbox",
      name: this.props.name,
      type: this.props.inputType,
      defaultChecked: this.props.defaultSwitched,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus
    };

    /*
     * If the input type is a checkbox, then we need to use the defaultValue instead of value
     * Because we cannot switch the uncontrolled component to a controlled component or vice versa.
     * https://facebook.github.io/react/docs/forms.html
     */
    if (this.props.inputType === 'checkbox') {
      inputProps.defaultValue = this.props.value;
    } else {
      inputProps.value = this.props.value;
    }

    var hideTouchRipple = this.props.disabled || disableTouchRipple;

    if (!hideTouchRipple) {
      inputProps.onMouseUp = this._handleMouseUp;
      inputProps.onMouseDown = this._handleMouseDown;
      inputProps.onMouseOut = this._handleMouseOut;
      inputProps.onTouchStart = this._handleTouchStart;
      inputProps.onTouchEnd = this._handleTouchEnd;
    }

    if (!this.props.hasOwnProperty('checkedLink')) {
      inputProps.onChange = this._handleChange;
    }

    var inputElement = _react2.default.createElement('input', _extends({}, inputProps, {
      className: 'chamel-enhanced-switch-input' }));

    var touchRipple = _react2.default.createElement(_TouchRipple2.default, {
      ref: 'touchRipple',
      key: 'touchRipple',
      centerRipple: true });

    var focusRipple = _react2.default.createElement(_FocusRipple2.default, {
      key: 'focusRipple',
      show: this.state.isKeyboardFocused });

    var ripples = [hideTouchRipple ? null : touchRipple, this.props.disabled || disableFocusRipple ? null : focusRipple];

    iconClassName += ' chamel-enhanced-switch-wrap';

    var switchElement = this.props.iconClassName.indexOf("chamel-toggle") == -1 ? _react2.default.createElement(
      'div',
      { className: iconClassName },
      this.props.switchElement,
      ripples
    ) : _react2.default.createElement(
      'div',
      { className: iconClassName },
      _react2.default.createElement('div', { className: 'chamel-toggle-track' }),
      _react2.default.createElement(
        _Paper2.default,
        { className: 'chamel-toggle-thumb', zDepth: 1 },
        ' ',
        ripples,
        ' '
      )
    );

    var labelPositionExist = this.props.labelPosition;

    // Position is left if not defined or invalid.
    var elementsInOrder = labelPositionExist && this.props.labelPosition.toUpperCase() === "RIGHT" ? _react2.default.createElement(
      'div',
      null,
      switchElement,
      labelElement
    ) : _react2.default.createElement(
      'div',
      null,
      labelElement,
      switchElement
    );

    return _react2.default.createElement(
      'div',
      { className: classes },
      inputElement,
      elementsInOrder
    );
  },

  isSwitched: function isSwitched() {
    return _reactDom2.default.findDOMNode(this.refs.checkbox).checked;
  },

  // no callback here because there is no event
  setSwitched: function setSwitched(newSwitchedValue) {
    if (!this.props.hasOwnProperty('checked') || this.props.checked === false) {
      this.setState({ switched: newSwitchedValue });
      _reactDom2.default.findDOMNode(this.refs.checkbox).checked = newSwitchedValue;
    } else if (process.NODE_ENV !== 'production') {
      var message = 'Cannot call set method while checked is defined as a property.';
      console.error(message);
    }
  },

  getValue: function getValue() {

    // If the input type is a checkbox, then we need to use the defaultValue instead of value
    if (this.props.inputType === 'checkbox') {
      return _reactDom2.default.findDOMNode(this.refs.checkbox).defaultValue;
    } else {
      return _reactDom2.default.findDOMNode(this.refs.checkbox).value;
    }
  },

  isKeyboardFocused: function isKeyboardFocused() {
    return this.state.isKeyboardFocused;
  },

  _handleChange: function _handleChange(e) {

    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false
    });

    var isInputChecked = _reactDom2.default.findDOMNode(this.refs.checkbox).checked;

    if (!this.props.hasOwnProperty('checked')) this.setState({ switched: isInputChecked });
    if (this.props.onSwitch) this.props.onSwitch(e, isInputChecked);
  },

  /**
   * Because both the ripples and the checkbox input cannot share pointer
   * events, the checkbox input takes control of pointer events and calls
   * ripple animations manually.
   */

  // Checkbox inputs only use SPACE to change their state. Using ENTER will
  // update the ui but not the input.
  _handleWindowKeydown: function _handleWindowKeydown(e) {
    if (e.keyCode == _KeyCode2.default.TAB) this._tabPressed = true;
    if (e.keyCode == _KeyCode2.default.SPACE && this.state.isKeyboardFocused) {
      this._handleChange(e);
    }
  },

  _handleWindowKeyup: function _handleWindowKeyup(e) {
    if (e.keyCode == _KeyCode2.default.SPACE && this.state.isKeyboardFocused) {
      this._handleChange(e);
    }
  },

  _handleMouseDown: function _handleMouseDown(e) {
    //only listen to left clicks
    if (e.button === 0) this.refs.touchRipple.start(e);
  },

  _handleMouseUp: function _handleMouseUp(e) {
    this.refs.touchRipple.end();
  },

  _handleMouseOut: function _handleMouseOut(e) {
    this.refs.touchRipple.end();
  },

  _handleTouchStart: function _handleTouchStart(e) {
    this.refs.touchRipple.start(e);
  },

  _handleTouchEnd: function _handleTouchEnd(e) {
    this.refs.touchRipple.end();
  },

  _handleBlur: function _handleBlur(e) {
    this.setState({
      isKeyboardFocused: false
    });

    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function _handleFocus(e) {
    //setTimeout is needed becuase the focus event fires first
    //Wait so that we can capture if this was a keyboard focus
    //or touch focus
    setTimeout(function () {
      if (this._tabPressed) {
        this.setState({
          isKeyboardFocused: true
        });
      }
    }.bind(this), 150);

    if (this.props.onFocus) this.props.onFocus(e);
  }

});

// Check for commonjs
if (module) {
  module.exports = EnhancedSwitch;
}

exports.default = EnhancedSwitch;
module.exports = exports['default'];