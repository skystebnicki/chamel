'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('../mixins/classable');

var EnhancedTextarea = React.createClass({
  displayName: 'EnhancedTextarea',


  mixins: [Classable],

  propTypes: {
    onChange: React.PropTypes.func,
    onHeightChange: React.PropTypes.func,
    textareaClassName: React.PropTypes.string,
    rows: React.PropTypes.number
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
    var _props = this.props;
    var className = _props.className;
    var onChange = _props.onChange;
    var onHeightChange = _props.onHeightChange;
    var textareaClassName = _props.textareaClassName;
    var rows = _props.rows;
    var valueLink = _props.valueLink;

    var other = _objectWithoutProperties(_props, ['className', 'onChange', 'onHeightChange', 'textareaClassName', 'rows', 'valueLink']);

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
    return React.createElement(
      'div',
      { className: classes },
      React.createElement('textarea', {
        ref: 'shadow',
        className: 'chamel-enhanced-textarea-shadow',
        tabIndex: '-1',
        rows: this.props.rows,
        readOnly: true,
        defaultValue: other.defaultValue }),
      React.createElement('textarea', {
        ref: 'input',
        className: textareaClassName,
        rows: this.props.rows,
        style: style,
        onChange: this._handleChange })
    );
  },

  getInputNode: function getInputNode() {
    return ReactDOM.findDOMNode(this.refs.input);
  },

  _syncHeightWithShadow: function _syncHeightWithShadow(newValue, e) {
    var shadow = ReactDOM.findDOMNode(this.refs.shadow);
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