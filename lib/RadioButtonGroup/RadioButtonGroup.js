'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Paper = require('../Paper/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _RadioButton = require('../Picker/RadioButton');

var _RadioButton2 = _interopRequireDefault(_RadioButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * DEPRECATED - We are now currently using Picker/RadioPicker.js - Marl Tumulak 05/09/2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var RadioButtonGroup = function (_Component) {
  _inherits(RadioButtonGroup, _Component);

  /**
   * Class constructor takes properties and passes them to the parent/super
   */
  function RadioButtonGroup(props) {
    _classCallCheck(this, RadioButtonGroup);

    var _this = _possibleConstructorReturn(this, (RadioButtonGroup.__proto__ || Object.getPrototypeOf(RadioButtonGroup)).call(this, props));

    _this._hasCheckAttribute = function (radioButton) {
      return radioButton.props.hasOwnProperty('checked') && radioButton.props.checked;
    };

    _this._updateRadioButtons = function (newSelection) {
      if (_this.state.numberCheckedRadioButtons == 0) {
        _this.setState({ selected: newSelection });
      } else if (process.env.NODE_ENV !== 'production') {
        var message = "Cannot select a different radio button while another radio button " + "has the 'checked' property set to true.";
        console.error(message);
      }
    };

    _this._onChange = function (newSelection) {
      _this._updateRadioButtons(newSelection);

      // Successful update
      if (_this.state.numberCheckedRadioButtons == 0) {
        if (_this.props.onChange) _this.props.onChange(e, newSelection);
      }
    };

    _this.getSelectedValue = function () {
      return _this.state.selected;
    };

    _this.setSelectedValue = function (newSelection) {
      _this._updateRadioButtons(newSelection);
    };

    _this.clearValue = function () {
      _this.setSelectedValue('');
    };

    _this.state = {
      numberCheckedRadioButtons: 0,
      selected: _this.props.valueSelected || _this.props.defaultSelected || ''
    };
    return _this;
  }

  _createClass(RadioButtonGroup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var cnt = 0;

      this.props.children.forEach(function (option) {
        if (_this2._hasCheckAttribute(option)) cnt++;
      });

      this.setState({ numberCheckedRadioButtons: cnt });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.hasOwnProperty('valueSelected')) {
        this.setState({ selected: nextProps.valueSelected });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var inline = this.props.inline;
      var options = this.props.children.map(function (option) {
        var _option$props = option.props,
            name = _option$props.name,
            value = _option$props.value,
            label = _option$props.label,
            onCheck = _option$props.onCheck,
            other = _objectWithoutProperties(_option$props, ['name', 'value', 'label', 'onCheck']);

        return _react2.default.createElement(_RadioButton2.default, _extends({}, other, {
          inline: inline,
          ref: option.props.value,
          name: this.props.name,
          key: option.props.value,
          value: option.props.value,
          label: option.props.label,
          labelPosition: this.props.labelPosition,
          onSelect: this._onChange,
          checked: option.props.value == this.state.selected }));
      }, this);

      return _react2.default.createElement(
        'div',
        null,
        options
      );
    }
  }]);

  return RadioButtonGroup;
}(_react.Component);

RadioButtonGroup.propTypes = {
  name: _propTypes2.default.string.isRequired,
  valueSelected: _propTypes2.default.string,

  /**
   * Float the label to the left or right of the radio button
   *
   * @type {string}
   */
  labelPosition: _propTypes2.default.oneOf(['left', 'right']),

  /**
   * Callback trigger fired when a user selects a new radio option
   *
   * @type {function}
   */
  onChange: _propTypes2.default.func,

  /**
   * Inline is used to determine if the radio buttons s are printed side-by-side
   *
   * @default true
   * @type {bool}
   */
  inline: _propTypes2.default.bool
};

/**
 * Set default properties if not set by the calling component
 */
RadioButtonGroup.defaultProps = {
  inline: false
};

exports.default = RadioButtonGroup;
module.exports = exports['default'];