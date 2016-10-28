'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EnhancedTextarea = _react2.default.createClass({
  displayName: 'EnhancedTextarea',


  mixins: [_classable2.default],

  propTypes: {
    onChange: _react2.default.PropTypes.func,
    onHeightChange: _react2.default.PropTypes.func,
    textareaClassName: _react2.default.PropTypes.string,
    rows: _react2.default.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      rows: 1
    };
  },

  getInitialState: function getInitialState() {
    return {
      height: this.props.rows * 24
    };
  },

  componentDidMount: function componentDidMount() {
    this._syncHeightWithShadow();
  },

  render: function render() {
    var _props = this.props,
        className = _props.className,
        onChange = _props.onChange,
        onHeightChange = _props.onHeightChange,
        textareaClassName = _props.textareaClassName,
        rows = _props.rows,
        valueLink = _props.valueLink,
        other = _objectWithoutProperties(_props, ['className', 'onChange', 'onHeightChange', 'textareaClassName', 'rows', 'valueLink']);

    var classes = this.getClasses('chamel-enhanced-textarea');
    var textareaClassName = 'chamel-enhanced-textarea-input';
    var style = {
      height: this.state.height + 'px'
    };

    if (this.props.textareaClassName) {
      textareaClassName += ' ' + this.props.textareaClassName;
    }

    if (other.hasOwnProperty("value")) {

      /**
       * If we have a value property in the object, we need to remove that
       * We are gonna use the defaultValue instead. https://facebook.github.io/react/docs/forms.html
       */
      delete other.value;

      // Set the default value
      other.defaultValue = this.props.value;
    } else if (this.props.hasOwnProperty('valueLink')) {

      // Set the default value
      other.defaultValue = this.props.valueLink.value;
    }

    /*
     * We need to use the defaultValue instead of value because we cannot switch the uncontrolled component to a controlled component or vice versa.
     * If we set value in the text area, then the user cannot input a value since the component is already controlled
     * https://facebook.github.io/react/docs/forms.html
     */
    return _react2.default.createElement(
      'div',
      { className: classes },
      _react2.default.createElement('textarea', {
        ref: 'shadow',
        className: 'chamel-enhanced-textarea-shadow',
        tabIndex: '-1',
        rows: this.props.rows,
        readOnly: true,
        defaultValue: other.defaultValue }),
      _react2.default.createElement('textarea', {
        ref: 'input',
        className: textareaClassName,
        rows: this.props.rows,
        style: style,
        onChange: this._handleChange })
    );
  },

  getInputNode: function getInputNode() {
    return _reactDom2.default.findDOMNode(this.refs.input);
  },

  _syncHeightWithShadow: function _syncHeightWithShadow(newValue, e) {
    var shadow = _reactDom2.default.findDOMNode(this.refs.shadow);
    var currentHeight = this.state.height;
    var newHeight;

    if (newValue !== undefined) shadow.value = newValue;
    newHeight = shadow.scrollHeight;

    if (currentHeight !== newHeight) {
      this.setState({ height: newHeight });
      if (this.props.onHeightChange) this.props.onHeightChange(e, newHeight);
    }
  },

  _handleChange: function _handleChange(e) {
    this._syncHeightWithShadow(e.target.value);

    if (this.props.hasOwnProperty('valueLink')) {
      this.props.valueLink.requestChange(e.target.value);
    }

    if (this.props.onChange) this.props.onChange(e);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this._syncHeightWithShadow(nextProps.value);
    }
  }
});

// Check for commonjs
if (module) {
  module.exports = EnhancedTextarea;
}

exports.default = EnhancedTextarea;
module.exports = exports['default'];