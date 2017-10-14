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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames6 = require('classnames');

var _classnames7 = _interopRequireDefault(_classnames6);

var _UniqueId = require('../utils/UniqueId');

var _UniqueId2 = _interopRequireDefault(_UniqueId);

var _DateTime = require('../utils/DateTime');

var _DateTime2 = _interopRequireDefault(_DateTime);

var _AutoComplete = require('../AutoComplete/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _KeyCode = require('../utils/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Plain text input field
 */
var TextField = function (_Component) {
  _inherits(TextField, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */


  /**
   * Set property defaults
   */
  function TextField(props) {
    _classCallCheck(this, TextField);

    var _this = _possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).call(this, props));
    // Call paprent constructor


    _this.handleAutoresize = function () {
      var element = _this.refs.input;
      // compute the height difference between inner height and outer height
      try {
        var style = getComputedStyle(element, null);
        var heightOffset = style.boxSizing === 'content-box' ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)) : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

        // resize the input to its content size
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + heightOffset + 'px';
      } catch (e) {
        log.error("Could not get the current style", e);
      }
    };

    _this._handleInputBlur = function (e) {
      _this.setState({
        isFocused: false
      });

      if (_this.props.onBlur) _this.props.onBlur(e);
    };

    _this._handleInputChange = function (e) {
      var value = e.target.value;

      _this.setState({
        hasValue: value,
        caretPos: _this.getCaretPos(),
        keyPressedValue: null,
        skipGetData: false,
        anchorEl: e.currentTarget
      });

      if (_this.props.onChange) {
        _this.props.onChange(e, value);
      }
    };

    _this._handleInputFocus = function (e) {
      _this.setState({
        isFocused: true,
        anchorEl: e.currentTarget
      });
      if (_this.props.onFocus) _this.props.onFocus(e);
    };

    _this._handleInputClick = function (e) {

      if (_this.props.autoComplete) {
        _this.setState({
          caretPos: _this.getCaretPos(),
          keyPressedValue: null,
          skipGetData: true,
          anchorEl: e.currentTarget
        });
      }

      if (_this.props.onClick) _this.props.onClick(e);
    };

    _this._handleInputKeyDown = function (evt) {

      switch (evt.keyCode) {
        case _KeyCode2.default.ENTER:
          if (_this.props.onEnterKeyDown) {
            _this.props.onEnterKeyDown(evt);
          }

        case _KeyCode2.default.ESC:
        case _KeyCode2.default.UP:
        case _KeyCode2.default.DOWN:
          if (_this.props.autoComplete) {
            _this.setState({
              keyPressedValue: evt.keyCode,
              caretPos: _this.getCaretPos(),
              skipGetData: true
            });

            if (!_this.props.multiLine) {
              evt.preventDefault();
            }
          }
          break;
      }

      // resize the textarea, if nessesary
      if (_this.props.multiLine) {
        _this.handleAutoresize();
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(evt);
      }
    };

    _this._handleInputKeyUp = function (evt) {
      switch (evt.keyCode) {
        case _KeyCode2.default.LEFT:
        case _KeyCode2.default.RIGHT:
        case _KeyCode2.default.DELETE:
        case _KeyCode2.default.BACKSPACE:
          if (_this.props.autoComplete) {
            _this.setState({
              keyPressedValue: evt.keyCode,
              caretPos: _this.getCaretPos(),
              skipGetData: true
            });
          }
          break;
      }

      if (_this.props.onKeyUp) {
        _this.props.onKeyUp(evt);
      }
    };

    _this._handleAutoCompleteSelected = function (value, caretPos, selectedData) {
      _this.setValue(value);
      _this.setCaretPos(caretPos);

      if (_this.props.autoCompleteSelected) {
        _this.props.autoCompleteSelected(selectedData);
      }
    };

    _this.state = {
      autoCompleteData: _this.props.autoCompleteData,
      keyPressedValue: null,
      caretPos: 0,
      errorText: _this.props.errorText,
      hasValue: _this.props.value || _this.props.defaultValue || _this.props.valueLink && _this.props.valueLink.value,
      componentIsMounted: false,
      autoFocus: _this.props.autoFocus
    };
    return _this;
  }

  /**
   * Component is about to receive updated props, do some checks for setting state
   *
   * @param nextProps
   */


  /**
   * An alternate theme may be passed down by a provider
   */


  /**
   * Set accepted properties
   */


  _createClass(TextField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var hasErrorProp = nextProps.hasOwnProperty('errorText');
      var hasValueLinkProp = nextProps.hasOwnProperty('valueLink');
      var hasValueProp = nextProps.hasOwnProperty('value');
      var hasNewDefaultValue = nextProps.defaultValue !== this.props.defaultValue;
      var hasNewAutoFocusValue = nextProps.autoFocus !== this.props.autoFocus;
      var newState = {};

      if (hasValueProp) {
        newState.hasValue = nextProps.value;
      } else if (hasValueLinkProp) {
        newState.hasValue = nextProps.valueLink.value;
      } else if (hasNewDefaultValue) {
        newState.hasValue = nextProps.defaultValue;
      }

      // If autoFocus has new value update the state object
      if (hasNewAutoFocusValue) {
        newState.autoFocus = nextProps.autoFocus;
      }

      if (newState.hasValue) {
        this.setValue(newState.hasValue);
      }

      // If we changed to a multiline input then attach a listener for window resize
      if (!this.props.multiLine && nextProps.multiLine) {
        this.handleAutoresize();
      }

      if (hasErrorProp) newState.errorText = nextProps.errorText;
      if (newState) this.setState(newState);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ componentIsMounted: true });

      if (this.props.multiLine) {
        this.handleAutoresize();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      // resize the textarea, if nessesary
      if (this.props.multiLine) this.handleAutoresize();

      if (this.state.autoFocus) {
        this.refs.input.focus();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setState({ componentIsMounted: false });
    }

    /**
     * Render the component
     *
     * @returns {JSX}
     */

  }, {
    key: 'render',
    value: function render() {
      var _classnames, _classnames2, _classnames3, _classnames4, _classnames5;

      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.input ? this.context.chamelTheme.input : _ChamelThemeService2.default.defaultTheme.input;

      var _props = this.props,
          className = _props.className,
          errorText = _props.errorText,
          floatingLabelText = _props.floatingLabelText,
          hintText = _props.hintText,
          id = _props.id,
          multiLine = _props.multiLine,
          isFocus = _props.isFocus,
          onBlur = _props.onBlur,
          onChange = _props.onChange,
          onFocus = _props.onFocus,
          onClick = _props.onClick,
          type = _props.type,
          value = _props.value,
          skipGetData = _props.skipGetData,
          autoComplete = _props.autoComplete,
          autoCompleteData = _props.autoCompleteData,
          autoCompleteGetData = _props.autoCompleteGetData,
          autocompleteTrigger = _props.autocompleteTrigger,
          autocompleteDelimiter = _props.autocompleteDelimiter,
          other = _objectWithoutProperties(_props, ['className', 'errorText', 'floatingLabelText', 'hintText', 'id', 'multiLine', 'isFocus', 'onBlur', 'onChange', 'onFocus', 'onClick', 'type', 'value', 'skipGetData', 'autoComplete', 'autoCompleteData', 'autoCompleteGetData', 'autocompleteTrigger', 'autocompleteDelimiter']);

      var classes = (0, _classnames7.default)(theme.textField, (_classnames = {}, _defineProperty(_classnames, theme.textFieldHasError, this.props.errorText), _defineProperty(_classnames, theme.hasValue, this.state.hasValue), _defineProperty(_classnames, theme.disabled, this.props.disabled), _defineProperty(_classnames, theme.focused, this.state.isFocused), _classnames));

      var inputId = this.props.id || _UniqueId2.default.generate();

      var errorTextElement = this.state.errorText ? _react2.default.createElement(
        'div',
        { className: theme.errorText },
        this.state.errorText
      ) : null;

      // Setup hint text label
      var hintTextClasses = (0, _classnames7.default)(theme.hint, (_classnames2 = {}, _defineProperty(_classnames2, theme.hintDisabled, this.props.disabled), _defineProperty(_classnames2, theme.hintHasValue, this.state.hasValue), _classnames2));
      var hintTextElement = this.props.hintText ? _react2.default.createElement(
        'label',
        { htmlFor: inputId, className: hintTextClasses },
        this.props.hintText
      ) : null;

      // Setup floating text label
      var floatingLabelClasses = (0, _classnames7.default)(theme.floatingLabel, (_classnames3 = {}, _defineProperty(_classnames3, theme.floatingLabelFloated, this.state.isFocused || "date" === type || this.state.hasValue), _defineProperty(_classnames3, theme.floatingLabelError, this.state.errorText), _classnames3));
      var floatingLabelTextElement = this.props.floatingLabelText ? _react2.default.createElement(
        'label',
        {
          className: floatingLabelClasses,
          htmlFor: inputId },
        this.props.floatingLabelText
      ) : null;

      // Define props for the input element
      var inputClasses = (0, _classnames7.default)((_classnames4 = {}, _defineProperty(_classnames4, theme.textarea, this.props.multiLine), _defineProperty(_classnames4, theme.textareaDisabled, this.props.multiLine && this.props.disabled), _defineProperty(_classnames4, theme.input, !this.props.multiLine), _defineProperty(_classnames4, theme.inputDisabled, !this.props.multiLine && this.props.disabled), _classnames4));
      var inputProps = {
        ref: 'input',
        className: inputClasses,
        id: inputId,
        onBlur: this._handleInputBlur,
        onFocus: this._handleInputFocus,
        onKeyDown: this._handleInputKeyDown,
        onKeyUp: this._handleInputKeyUp,
        onClick: this._handleInputClick,
        defaultValue: value ? this._sanitizeInputForType(value) : ''
      };

      if (!this.props.hasOwnProperty('valueLink')) {
        inputProps.onChange = this._handleInputChange;
      }

      // We need to remove invalid props before we pass it to <textarea> or <input>
      for (var prop in other) {
        switch (prop) {
          case 'autoCompleteDelimiter':
          case 'autoCompleteTrigger':
          case 'autoCompleteTransform':
          case 'autoCompleteDelimiter':
          case 'autoCompleteTrigger':
          case 'autoCompleteTransform':
            delete other[prop];
            break;
        }
      }

      var inputElement = this.props.multiLine ? _react2.default.createElement('textarea', _extends({
        rows: 1
      }, other, inputProps)) : _react2.default.createElement('input', _extends({}, other, inputProps, {
        type: this.props.type
      }));

      // Check if autoComplete is set before we try to display autoComplete component
      var autoCompleteDisplay = null;
      if (this.props.autoComplete && this.state.hasValue) {

        // Throw an error if the user have provided both data and getData properties
        if (this.props.autoCompleteData && this.props.autoCompleteGetData) {
          console.error('Cannot provide autoCompleteData and autoCompleteGetData properties at the same time.');
        }

        var filterData = false;

        if ((this.state.skipGetData || this.props.autoCompleteData) && this.state.autoCompleteData) {

          // If the autoComplete data is coming from the props, then we need to set the filterData to true
          if (this.props.autoCompleteData) filterData = true;

          autoCompleteDisplay = this._getAutoCompleteComponent(this.state.autoCompleteData, filterData);
        } else if (this.props.autoCompleteGetData) {

          // Callback function that will be called once the getting of autoComplete data is done
          var doneGetDataCallback = function (autoCompleteData) {

            // This will allow us to display the autoComplete component using the autoCompleteData as its list
            autoCompleteDisplay = this._getAutoCompleteComponent(autoCompleteData, filterData);
            this.setState({
              autoCompleteData: autoCompleteData,
              skipGetData: true
            });
          }.bind(this);

          var keyword = null;
          var inputDetails = this._evalInputValue();
          var chunkedValue = inputDetails.subValue.substr(inputDetails.startPos, inputDetails.caretPos);

          if (chunkedValue.length > inputDetails.minLengthLimit) {
            keyword = chunkedValue.replace(/[\W\s+]+$/gi, "");
          }

          // Process the getting of autoComplete data
          if (keyword && inputDetails.startPos >= 0) {
            this.props.autoCompleteGetData(keyword, doneGetDataCallback);
          }
        }
      }

      // Set styles for the focus underline
      var focuseUnderlineClasses = (0, _classnames7.default)(theme.focusUnderline, (_classnames5 = {}, _defineProperty(_classnames5, theme.focusUnderlineOn, this.state.isFocused), _defineProperty(_classnames5, theme.focusUnderlineDisabled, this.props.disabled), _defineProperty(_classnames5, theme.focusUnderlineError, this.props.errorText), _classnames5));

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: classes },
          floatingLabelTextElement,
          hintTextElement,
          inputElement,
          _react2.default.createElement('div', { className: theme.unfocusUnderline }),
          _react2.default.createElement('div', { className: focuseUnderlineClasses }),
          errorTextElement
        ),
        autoCompleteDisplay
      );
    }
  }, {
    key: 'blur',
    value: function blur() {
      if (this.state.componentIsMounted) this._getInputNode().blur();
    }
  }, {
    key: 'clearValue',
    value: function clearValue() {
      this.setValue('');
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (this.state.componentIsMounted) this._getInputNode().focus();
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.state.componentIsMounted ? this._getInputNode().value : undefined;
    }

    /**
     * Get the current caret/cursor position of the input node
     *
     * @return {int} iCaretPos      The current caret/cursor position
     * @public
     */

  }, {
    key: 'getCaretPos',
    value: function getCaretPos() {
      // Do not look for position if this is a date input
      if (this.props.type == 'date') {
        return 0;
      }

      var input = this._getInputNode();

      // Initialize
      var iCaretPos = 0;

      // IE Support
      if (document.selection) {

        // Set focus on the element
        input.focus();

        // To get cursor position, get empty selection range
        var oSel = document.selection.createRange();

        // Move selection start to 0 position
        oSel.moveStart('character', -input.value.length);

        // The caret position is selection length
        iCaretPos = oSel.text.length;
      }

      // Firefox support
      else if (input.selectionStart || input.selectionStart == '0') iCaretPos = input.selectionStart;

      // Return results
      return iCaretPos;
    }

    /**
     * Set the current caret/cursor position of the input node
     *
     * @params {int} caretPos      The caret/cursor position
     * @public
     */

  }, {
    key: 'setCaretPos',
    value: function setCaretPos(caretPos) {
      var input = this._getInputNode();

      input.value = input.value;
      // ^ this is used to not only get "focus", but
      // to make sure we don't have it everything -selected-
      // (it causes an issue in chrome, and having it doesn't hurt any other browser)

      if (input !== null) {

        if (input.createTextRange) {
          var range = input.createTextRange();
          range.move('character', caretPos);
          range.select();
          return true;
        } else {
          // (input.sinputectionStart === 0 added for Firefox bug)
          if (input.selectionStart || input.selectionStart === 0) {
            input.focus();
            input.setSelectionRange(caretPos, caretPos);
            return true;
          } else {
            // If all else fail, then just focus the input
            input.focus();
            return false;
          }
        }
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      // Make sure the value is good
      var sanitizedValue = this._sanitizeInputForType(newValue);

      // The value passed was invalid
      if (sanitizedValue === false) {
        this.setState({ errorText: newValue + " is invalid for type=" + this.props.type });

        // Do not set anything
        return;
      }

      /*
       * Since we are using controlled component for our textfield, we do not need to check and throw an error
       * The textfield component is using the defaultValue props which makes it a controlled component
       * Please refer to this link: https://facebook.github.io/react/docs/forms.html
       */
      /*
       if (process.NODE_ENV !== 'production' && this._isControlled()) {
       console.error('Cannot call TextField.setValue when value or valueLink is defined as a property.');
       } else if (this.state.componentIsMounted) {
       this._getInputNode().value = sanitizedValue;
        this.setState({
       hasValue: sanitizedValue,
       caretPos: this.getCaretPos(),
       keyPressedValue: null,
       skipGetData: false
       });
       }
       */

      this._getInputNode().value = sanitizedValue;

      this.setState({
        hasValue: sanitizedValue,
        caretPos: this.getCaretPos(),
        keyPressedValue: null,
        skipGetData: false
      });
    }

    /**
     * Validate a value for an input based on type
     *
     * @return {string|bool} If null then there was a problem
     */

  }, {
    key: '_sanitizeInputForType',
    value: function _sanitizeInputForType(checkValue) {
      switch (this.props.type) {
        case 'date':
          if (_DateTime2.default.validateDate(checkValue)) {
            var date = new Date(checkValue);
            // Format as defined in RFC 3339
            return _DateTime2.default.format(date, "yyyy-MM-dd");
          } else {
            return false;
          }
        default:
          // Nothing to do
          return checkValue;
          break;
      }
    }

    /**
     * Auto-resize a multiline input
     */

  }, {
    key: '_getInputNode',
    value: function _getInputNode() {
      return _reactDom2.default.findDOMNode(this.refs.input);
    }
  }, {
    key: '_isControlled',
    value: function _isControlled() {
      return this.props.hasOwnProperty('value') || this.props.hasOwnProperty('valueLink');
    }

    /**
     * Callback used to handle the input keydown
     *
     * @param {DOMEvent} evt    Reference to the DOM event being sent
     * @private
     */


    /**
     * Callback used to handle the input keyup
     *
     * @param {DOMEvent} evt    Reference to the DOM event being sent
     * @private
     */


    /**
     * Callback used to handle the selection of autocomplete data
     *
     * @param {string} value The selected value in the autoComplete data list
     * @param {int} caretPos The caret/cursor position of the input
     * @param {obj} selectedData The selected data in the autoComplete
     * @private
     */

  }, {
    key: '_evalInputValue',


    /**
     * Evaluate the input value and get the needed details
     *
     * @param {object} details
     *  {
       *      value: the quick brown @fox,
       *      caretPos: 19, // Assuming the cursor/caret position is in second to the last position (between the o and x)
       *      subValue: the quick brown @fo,
       *      minLengthLimit: 0 or 2, // If we have a trigger data then the corresponding value is 0, else the value is 2
       *      startPos: 16
       *  }
     * @private
     */
    value: function _evalInputValue() {
      var details = null;
      var inputValue = this.state.hasValue; // Get the current input value
      var caretPos = this.state.caretPos; // Get the current caret/cursor position

      if (inputValue) {
        var subValue = inputValue.substr(0, caretPos); // Get the substr of inputValue from index 0 to caretPos

        details = {
          value: inputValue,
          caretPos: caretPos,
          subValue: subValue,
          minLengthLimit: this.props.autoCompleteTrigger ? 0 : 2,
          startPos: -1
        };

        /**
         * If the this.props.trigger is null, then lets use the this.props.delimiter
         *
         * Common Scenario:
         * trigger = null and delimiter = ';' (this is mostly used for emails)
         * trigger = @ (mostly used to browse users)
         * trigger = @ (mostly used to browse colors)
         */
        var triggerDelimiter = this.props.autoCompleteTrigger || this.props.autoCompleteDelimiter;

        if (triggerDelimiter) {
          for (var idx in triggerDelimiter) {
            var td = triggerDelimiter[idx];

            // If we have found the trigger/delimiter in the string, then lets break the for loop
            if (subValue.lastIndexOf(td) >= 0) {
              details.startPos = subValue.lastIndexOf(td);
              break;
            }
          }
        }

        if (this.props.autoCompleteTrigger == null && details.startPos == -1) {

          /**
           * If trigger is null and startPos is -1, this means that the user is just typing letters without a trigger key
           * We are setting the startPos to 0 since we need to check the input value from start to the current caret position
           */
          details.startPos = 0;
        } else if (this.props.autoCompleteTrigger && details.startPos >= 0) {
          details.startPos += 1;
        }
      }

      return details;
    }

    /**
     * Get the autoComplete Component to be displayed
     *
     * @param {array} autoCompleteData  The autoComplete data to be displayed as a list
     * @param {bool} filterData         Determine if we need to filter the suggestionData when user types a keyword.
     * @private
     */

  }, {
    key: '_getAutoCompleteComponent',
    value: function _getAutoCompleteComponent(autoCompleteData, filterData) {
      var component = null,
          attribute = void 0;

      if (autoCompleteData) {
        attribute = {
          suggestionData: autoCompleteData,
          filterData: filterData
        };
      }

      component = _react2.default.createElement(_AutoComplete2.default, _extends({}, attribute, {
        ref: 'autoComplete',
        anchorEl: this.state.anchorEl,
        inputDetails: this._evalInputValue(),
        keyPressedValue: this.state.keyPressedValue,
        suggestionData: autoCompleteData,
        trigger: this.props.autoCompleteTrigger,
        delimiter: this.props.autoCompleteDelimiter,
        onSelect: this._handleAutoCompleteSelected,
        transform: this.props.autoCompleteTransform
      }));

      return component;
    }
  }]);

  return TextField;
}(_react.Component);

TextField.propTypes = {
  /**
   * String value of the input
   */
  value: _propTypes2.default.string,

  /**
   * Any error text for this field
   */
  errorText: _propTypes2.default.string,

  /**
   * Label text that should float on focus (depending on theme)
   */
  floatingLabelText: _propTypes2.default.string,

  /**
   * Hint that is displayed until a value is entered
   */
  hintText: _propTypes2.default.string,

  /**
   * Unique id of this text field
   */
  id: _propTypes2.default.string,

  /**
   * Support more than one line
   */
  multiLine: _propTypes2.default.bool,

  /**
   * Flag property to Focus on text field
   */
  autoFocus: _propTypes2.default.bool,

  /**
   * Callback to capture blur event
   */
  onBlur: _propTypes2.default.func,

  /**
   * Callback triggered when the value changes
   */
  onChange: _propTypes2.default.func,

  /**
   * Callback triggered when focus is given to the input
   */
  onFocus: _propTypes2.default.func,

  /**
   * Callback triggered when a user presses a key
   */
  onKeyDown: _propTypes2.default.func,

  /**
   * Callback triggered when a user releses a key
   */
  onEnterKeyDown: _propTypes2.default.func,

  /**
   * Callback triggered when a user clicks on the field
   */
  onClick: _propTypes2.default.func,

  /**
   * Type of input can be any supported HTML input type
   * such as date, number, or text
   */
  type: _propTypes2.default.string,

  /**
   * If true then add autocomplete to the input
   */
  autoComplete: _propTypes2.default.bool,

  /**
   * Array of data to use for autocomplete
   */
  autoCompleteData: _propTypes2.default.array,

  /**
   * An optional character that is used to open autocomplete
   *
   * A common usage for this would be something like the '@'
   * symbol invoking a user select list for tagging people.
   */
  autoCompleteTrigger: _propTypes2.default.any,

  /**
   * An optional character for separating autocomplete terms
   */
  autoCompleteDelimiter: _propTypes2.default.string,

  /**
   * Callback used to interpret the selection before inserting
   * it into the input.
   */
  autoCompleteTransform: _propTypes2.default.func,

  /**
   * Optional alternative to autoComplete date which waits for a
   * callback to complete (usually an ajax request to the server)
   */
  autoCompleteGetData: _propTypes2.default.func,

  /**
   * Callback that can be optionally called any time a user selects
   * an entiry from the autocomplete dropdown
   */
  autoCompleteSelected: _propTypes2.default.func
};
TextField.defaultProps = {
  type: 'text',
  skipGetData: true,
  autoComplete: false,
  autoCompleteData: null,
  autocompleteTrigger: ['@'],
  autocompleteDelimiter: ''
};
TextField.contextTypes = {
  chamelTheme: _propTypes2.default.object
};
exports.default = TextField;
module.exports = exports['default'];