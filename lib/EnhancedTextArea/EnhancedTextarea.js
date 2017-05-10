'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EnhancedTextarea = function (_Component) {
  _inherits(EnhancedTextarea, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function EnhancedTextarea(props) {
    _classCallCheck(this, EnhancedTextarea);

    var _this = _possibleConstructorReturn(this, (EnhancedTextarea.__proto__ || Object.getPrototypeOf(EnhancedTextarea)).call(this, props));
    // Call parent constructor


    _this.getInputNode = function () {
      return _reactDom2.default.findDOMNode(_this.refs.input);
    };

    _this._syncHeightWithShadow = function (newValue, e) {
      var shadow = _reactDom2.default.findDOMNode(_this.refs.shadow);
      var currentHeight = _this.state.height;
      var newHeight = void 0;

      if (newValue !== undefined) shadow.value = newValue;
      newHeight = shadow.scrollHeight;

      if (currentHeight !== newHeight) {
        _this.setState({ height: newHeight });
        if (_this.props.onHeightChange) _this.props.onHeightChange(e, newHeight);
      }
    };

    _this._handleChange = function (e) {
      _this._syncHeightWithShadow(e.target.value);

      if (_this.props.hasOwnProperty('valueLink')) {
        _this.props.valueLink.requestChange(e.target.value);
      }

      if (_this.props.onChange) _this.props.onChange(e);
    };

    _this.componentWillReceiveProps = function (nextProps) {
      if (nextProps.value != _this.props.value) {
        _this._syncHeightWithShadow(nextProps.value);
      }
    };

    _this.getClasses = function (initialClasses, additionalClassObj) {
      var classString = '';

      //Initialize the classString with the classNames that were passed in
      if (_this.props.className) classString += ' ' + _this.props.className;

      //Add in initial classes
      if ((typeof initialClasses === 'undefined' ? 'undefined' : _typeof(initialClasses)) === 'object') {
        classString += ' ' + (0, _classnames2.default)(initialClasses);
      } else {
        classString += ' ' + initialClasses;
      }

      //Add in additional classes
      if (additionalClassObj) classString += ' ' + (0, _classnames2.default)(additionalClassObj);

      //Convert the class string into an object and run it through the class set
      return (0, _classnames2.default)(_this.getClassSet(classString));
    };

    _this.getClassSet = function (classString) {
      var classObj = {};

      if (classString) {
        classString.split(' ').forEach(function (className) {
          if (className) classObj[className] = true;
        });
      }

      return classObj;
    };

    _this.state = {
      height: _this.props.rows * 24
    };
    return _this;
  }

  _createClass(EnhancedTextarea, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._syncHeightWithShadow();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          onChange = _props.onChange,
          onHeightChange = _props.onHeightChange,
          textareaClassName = _props.textareaClassName,
          rows = _props.rows,
          valueLink = _props.valueLink,
          other = _objectWithoutProperties(_props, ['className', 'onChange', 'onHeightChange', 'textareaClassName', 'rows', 'valueLink']);

      var divClassName = 'chamel-enhanced-textarea-input';
      var classes = this.getClasses('chamel-enhanced-textarea');
      var style = {
        height: this.state.height + 'px'
      };

      if (this.props.textareaClassName) {
        divClassName += ' ' + this.props.textareaClassName;
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
        { className: divClassName },
        _react2.default.createElement('textarea', {
          ref: 'shadow',
          className: 'chamel-enhanced-textarea-shadow',
          tabIndex: '-1',
          rows: this.props.rows,
          readOnly: true,
          defaultValue: other.defaultValue }),
        _react2.default.createElement('textarea', {
          ref: 'input',
          className: className,
          rows: this.props.rows,
          style: style,
          onChange: this._handleChange })
      );
    }
  }]);

  return EnhancedTextarea;
}(_react.Component);

EnhancedTextarea.propTypes = {
  onChange: _propTypes2.default.func,
  onHeightChange: _propTypes2.default.func,
  textareaClassName: _propTypes2.default.string,
  rows: _propTypes2.default.number
};

EnhancedTextarea.defaultProps = {
  rows: 1
};

exports.default = EnhancedTextarea;
module.exports = exports['default'];