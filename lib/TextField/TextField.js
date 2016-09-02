'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classable = require('../mixins/classable');

var _classable2 = _interopRequireDefault(_classable);

var _UniqueId = require('../utils/UniqueId');

var _UniqueId2 = _interopRequireDefault(_UniqueId);

var _EnhancedTextarea = require('../EnhancedTextarea/EnhancedTextarea');

var _EnhancedTextarea2 = _interopRequireDefault(_EnhancedTextarea);

var _DateTime = require('../utils/DateTime');

var _DateTime2 = _interopRequireDefault(_DateTime);

var _AutoComplete = require('../AutoComplete/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _KeyCode = require('../utils/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TextField = _react2.default.createClass({
    displayName: 'TextField',


    mixins: [_classable2.default],

    propTypes: {
        errorText: _react2.default.PropTypes.string,
        floatingLabelText: _react2.default.PropTypes.string,
        hintText: _react2.default.PropTypes.string,
        id: _react2.default.PropTypes.string,
        multiLine: _react2.default.PropTypes.bool,
        onBlur: _react2.default.PropTypes.func,
        onChange: _react2.default.PropTypes.func,
        onFocus: _react2.default.PropTypes.func,
        onKeyDown: _react2.default.PropTypes.func,
        onEnterKeyDown: _react2.default.PropTypes.func,
        onClick: _react2.default.PropTypes.func,
        type: _react2.default.PropTypes.string,

        autoComplete: _react2.default.PropTypes.bool,
        autoCompleteData: _react2.default.PropTypes.array,
        autoCompleteTrigger: _react2.default.PropTypes.any,
        autoCompleteDelimiter: _react2.default.PropTypes.string,
        autoCompleteTransform: _react2.default.PropTypes.func,
        autoCompleteGetData: _react2.default.PropTypes.func,
        autoCompleteSelected: _react2.default.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            type: 'text',
            autoComplete: false,
            skipGetData: true,
            autoCompleteData: null,
            autocompleteTrigger: ['@'],
            autocompleteDelimiter: ''
        };
    },

    getInitialState: function getInitialState() {
        return {
            autoCompleteData: this.props.autoCompleteData,
            keyPressedValue: null,
            caretPos: 0,
            errorText: this.props.errorText,
            hasValue: this.props.value || this.props.defaultValue || this.props.valueLink && this.props.valueLink.value
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var hasErrorProp = nextProps.hasOwnProperty('errorText');
        var hasValueLinkProp = nextProps.hasOwnProperty('valueLink');
        var hasValueProp = nextProps.hasOwnProperty('value');
        var hasNewDefaultValue = nextProps.defaultValue !== this.props.defaultValue;
        var newState = {};

        if (hasValueProp) {
            newState.hasValue = nextProps.value;
        } else if (hasValueLinkProp) {
            newState.hasValue = nextProps.valueLink.value;
        } else if (hasNewDefaultValue) {
            newState.hasValue = nextProps.defaultValue;
        }

        if (hasErrorProp) newState.errorText = nextProps.errorText;
        if (newState) this.setState(newState);
    },

    render: function render() {
        var _props = this.props;
        var className = _props.className;
        var errorText = _props.errorText;
        var floatingLabelText = _props.floatingLabelText;
        var hintText = _props.hintText;
        var id = _props.id;
        var multiLine = _props.multiLine;
        var onBlur = _props.onBlur;
        var onChange = _props.onChange;
        var onFocus = _props.onFocus;
        var onClick = _props.onClick;
        var type = _props.type;
        var value = _props.value;

        var other = _objectWithoutProperties(_props, ['className', 'errorText', 'floatingLabelText', 'hintText', 'id', 'multiLine', 'onBlur', 'onChange', 'onFocus', 'onClick', 'type', 'value']);

        var classes = this.getClasses('chamel-text-field', {
            'chamel-has-error': this.props.errorText,
            'chamel-has-floating-labels': this.props.floatingLabelText,
            'chamel-has-value': this.state.hasValue,
            'chamel-is-disabled': this.props.disabled,
            'chamel-is-focused': this.state.isFocused,
            'chamel-is-date': "date" === type,
            'chamel-is-multiLine': this.props.multiLine
        });

        var inputId = this.props.id || _UniqueId2.default.generate();

        var errorTextElement = this.state.errorText ? _react2.default.createElement(
            'div',
            { className: 'chamel-text-field-error' },
            this.state.errorText
        ) : null;

        var hintTextElement = this.props.hintText ? _react2.default.createElement(
            'div',
            { className: 'chamel-text-field-hint' },
            this.props.hintText
        ) : null;

        var floatingLabelTextElement = this.props.floatingLabelText ? _react2.default.createElement(
            'label',
            {
                className: 'chamel-text-field-floating-label',
                htmlFor: inputId },
            this.props.floatingLabelText
        ) : null;

        var inputProps;
        var inputElement;

        inputProps = {
            ref: 'input',
            className: 'chamel-text-field-input',
            id: inputId,
            onBlur: this._handleInputBlur,
            onFocus: this._handleInputFocus,
            onKeyDown: this._handleInputKeyDown,
            onKeyUp: this._handleInputKeyUp,
            onClick: this._handleInputClick
        };

        if (!this.props.hasOwnProperty('valueLink')) {
            inputProps.onChange = this._handleInputChange;
        }

        var sanitizedValue = value ? this._sanitizeInputForType(value) : '';

        inputElement = this.props.multiLine ? _react2.default.createElement(_EnhancedTextarea2.default, _extends({
            value: sanitizedValue
        }, other, inputProps, {
            onHeightChange: this._handleTextAreaHeightChange,
            textareaClassName: 'chamel-text-field-textarea' })) :

        /*
         * We need to use the defaultValue instead of value because we cannot switch the uncontrolled component to a controlled component or vice versa.
         * If we set value in the input type text, then the user cannot input a value since the component is already controlled
         * https://facebook.github.io/react/docs/forms.html
         */
        _react2.default.createElement('input', _extends({
            defaultValue: sanitizedValue
        }, other, inputProps, {
            type: this.props.type }));

        var autoCompleteDisplay = null;

        // Check if autoComplete is set before we try to display autoComplete component
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

        return _react2.default.createElement(
            'div',
            { className: classes },
            floatingLabelTextElement,
            hintTextElement,
            inputElement,
            _react2.default.createElement('hr', { className: 'chamel-text-field-underline' }),
            _react2.default.createElement('hr', { className: 'chamel-text-field-focus-underline' }),
            autoCompleteDisplay,
            errorTextElement
        );
    },

    blur: function blur() {
        if (this.isMounted()) this._getInputNode().blur();
    },

    clearValue: function clearValue() {
        this.setValue('');
    },

    focus: function focus() {
        if (this.isMounted()) this._getInputNode().focus();
    },

    getValue: function getValue() {
        return this.isMounted() ? this._getInputNode().value : undefined;
    },

    /**
     * Get the current caret/cursor position of the input node
     *
     * @return {int} iCaretPos      The current caret/cursor position
     * @public
     */
    getCaretPos: function getCaretPos() {
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
    },

    /**
     * Set the current caret/cursor position of the input node
     *
     * @params {int} caretPos      The caret/cursor position
     * @public
     */
    setCaretPos: function setCaretPos(caretPos) {
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
    },

    setErrorText: function setErrorText(newErrorText) {
        if (process.NODE_ENV !== 'production' && this.props.hasOwnProperty('errorText')) {
            console.error('Cannot call TextField.setErrorText when errorText is defined as a property.');
        } else if (this.isMounted()) {
            this.setState({ errorText: newErrorText });
        }
    },

    setValue: function setValue(newValue) {
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
        } else if (this.isMounted()) {
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
    },

    /**
     * Validate a value for an input based on type
     *
     * @return {string|bool} If null then there was a problem
     */
    _sanitizeInputForType: function _sanitizeInputForType(checkValue) {
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
    },

    _getInputNode: function _getInputNode() {
        return this.props.multiLine ? this.refs.input.getInputNode() : _reactDom2.default.findDOMNode(this.refs.input);
    },

    _handleInputBlur: function _handleInputBlur(e) {
        this.setState({
            isFocused: false
        });

        if (this.props.onBlur) this.props.onBlur(e);
    },

    _handleInputChange: function _handleInputChange(e) {
        var value = e.target.value;

        this.setState({
            hasValue: value,
            caretPos: this.getCaretPos(),
            keyPressedValue: null,
            skipGetData: false,
            anchorEl: e.currentTarget
        });

        if (this.props.onChange) {
            this.props.onChange(e, value);
        }
    },

    _handleInputFocus: function _handleInputFocus(e) {
        this.setState({
            isFocused: true,
            anchorEl: e.currentTarget
        });
        if (this.props.onFocus) this.props.onFocus(e);
    },

    _handleTextAreaHeightChange: function _handleTextAreaHeightChange(e, height) {
        var newHeight = height + 24;
        if (this.props.floatingLabelText) newHeight += 24;
        _reactDom2.default.findDOMNode(this).style.height = newHeight + 'px';
    },

    _isControlled: function _isControlled() {
        return this.props.hasOwnProperty('value') || this.props.hasOwnProperty('valueLink');
    },

    _handleInputClick: function _handleInputClick(e) {

        if (this.props.autoComplete) {
            this.setState({
                caretPos: this.getCaretPos(),
                keyPressedValue: null,
                skipGetData: true,
                anchorEl: e.currentTarget
            });
        }

        if (this.props.onClick) this.props.onClick(e);
    },

    /**
     * Callback used to handle the input keydown
     *
     * @param {DOMEvent} evt    Reference to the DOM event being sent
     * @private
     */
    _handleInputKeyDown: function _handleInputKeyDown(evt) {

        switch (evt.keyCode) {
            case _KeyCode2.default.ENTER:
                if (this.props.onEnterKeyDown) {
                    this.props.onEnterKeyDown(evt);
                }

            case _KeyCode2.default.ESC:
            case _KeyCode2.default.UP:
            case _KeyCode2.default.DOWN:
                if (this.props.autoComplete) {
                    this.setState({
                        keyPressedValue: evt.keyCode,
                        caretPos: this.getCaretPos(),
                        skipGetData: true
                    });

                    if (!this.props.multiLine) {
                        evt.preventDefault();
                    }
                }
                break;
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(evt);
        }
    },

    /**
     * Callback used to handle the input keyup
     *
     * @param {DOMEvent} evt    Reference to the DOM event being sent
     * @private
     */
    _handleInputKeyUp: function _handleInputKeyUp(evt) {
        switch (evt.keyCode) {
            case _KeyCode2.default.LEFT:
            case _KeyCode2.default.RIGHT:
            case _KeyCode2.default.DELETE:
            case _KeyCode2.default.BACKSPACE:
                if (this.props.autoComplete) {
                    this.setState({
                        keyPressedValue: evt.keyCode,
                        caretPos: this.getCaretPos(),
                        skipGetData: true
                    });
                }
                break;
        }

        if (this.props.onKeyUp) {
            this.props.onKeyUp(evt);
        }
    },

    /**
     * Callback used to handle the selection of autocomplete data
     *
     * @param {string} value The selected value in the autoComplete data list
     * @param {int} caretPos The caret/cursor position of the input
     * @param {obj} selectedData The selected data in the autoComplete
     * @private
     */
    _handleAutoCompleteSelected: function _handleAutoCompleteSelected(value, caretPos, selectedData) {
        this.setValue(value);
        this.setCaretPos(caretPos);

        if (this.props.autoCompleteSelected) {
            this.props.autoCompleteSelected(selectedData);
        }
    },

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
    _evalInputValue: function _evalInputValue() {

        var details = null;
        var inputValue = this.state.hasValue; // Get the current input value
        var caretPos = this.state.caretPos; // Get the current caret/cursor position

        if (inputValue) {
            var subValue = inputValue.substr(0, caretPos); // Get the substr of inputValue from index 0 to caretPos

            var details = {
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
    },

    /**
     * Get the autoComplete Component to be displayed
     *
     * @param {array} autoCompleteData  The autoComplete data to be displayed as a list
     * @param {bool} filterData         Determine if we need to filter the suggestionData when user types a keyword.
     * @private
     */
    _getAutoCompleteComponent: function _getAutoCompleteComponent(autoCompleteData, filterData) {
        var component = null,
            attribute;

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
});

// Check for commonjs
if (module) {
    module.exports = TextField;
}

exports.default = TextField;
module.exports = exports['default'];