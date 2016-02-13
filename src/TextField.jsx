var React = require('react');
var ReactDOM = require('react-dom');
var Classable = require('./mixins/classable.jsx');
var UniqueId = require('./utils/UniqueId.jsx');
var EnhancedTextarea = require('./EnhancedTextarea.jsx');
var DateTimeUtil = require('./utils/DateTime.jsx');
var AutoComplete = require('./AutoComplete.jsx');
var KeyCode = require('./utils/KeyCode.jsx');

var TextField = React.createClass({

    mixins: [Classable],

    propTypes: {
        errorText: React.PropTypes.string,
        floatingLabelText: React.PropTypes.string,
        hintText: React.PropTypes.string,
        id: React.PropTypes.string,
        multiLine: React.PropTypes.bool,
        onBlur: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onKeyDown: React.PropTypes.func,
        onEnterKeyDown: React.PropTypes.func,
        onClick: React.PropTypes.func,
        type: React.PropTypes.string,

        autoComplete: React.PropTypes.bool,
        autoCompleteData: React.PropTypes.array,
        autoCompleteTrigger: React.PropTypes.any,
        autoCompleteDelimiter: React.PropTypes.string,
        autoCompleteTransform: React.PropTypes.func,
        autoCompleteGetData: React.PropTypes.func,
        autoCompleteSelected: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            type: 'text',
            autoComplete: false,
            skipGetData: true,
            autoCompleteData: null,
            autocompleteTrigger: ['@'],
            autocompleteDelimiter: '',
        };
    },

    getInitialState: function () {
        return {
            autoCompleteData: this.props.autoCompleteData,
            keyPressedValue: null,
            caretPos: 0,
            errorText: this.props.errorText,
            hasValue: this.props.value || this.props.defaultValue ||
            (this.props.valueLink && this.props.valueLink.value)
        };
    },

    componentWillReceiveProps: function (nextProps) {
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

    render: function () {
        var {
            className,
            errorText,
            floatingLabelText,
            hintText,
            id,
            multiLine,
            onBlur,
            onChange,
            onFocus,
            onClick,
            type,
            value,
            ...other
            } = this.props;

        var classes = this.getClasses('chamel-text-field', {
            'chamel-has-error': this.props.errorText,
            'chamel-has-floating-labels': this.props.floatingLabelText,
            'chamel-has-value': this.state.hasValue,
            'chamel-is-disabled': this.props.disabled,
            'chamel-is-focused': this.state.isFocused,
            'chamel-is-date': ("date" === type),
            'chamel-is-multiLine': this.props.multiLine
        });

        var inputId = this.props.id || UniqueId.generate();

        var errorTextElement = this.state.errorText ? (
            <div className="chamel-text-field-error">{this.state.errorText}</div>
        ) : null;

        var hintTextElement = this.props.hintText ? (
            <div className="chamel-text-field-hint">{this.props.hintText}</div>
        ) : null;

        var floatingLabelTextElement = this.props.floatingLabelText ? (
            <label
                className="chamel-text-field-floating-label"
                htmlFor={inputId}>
                {this.props.floatingLabelText}
            </label>
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
            onClick: this._handleInputClick,
        };

        if (!this.props.hasOwnProperty('valueLink')) {
            inputProps.onChange = this._handleInputChange;
        }

        var sanitizedValue = (value) ? this._sanitizeInputForType(value) : null;

        inputElement = this.props.multiLine ? (
            <EnhancedTextarea
                value={sanitizedValue}
                {...other}
                {...inputProps}
                onHeightChange={this._handleTextAreaHeightChange}
                textareaClassName="chamel-text-field-textarea"/>
        ) : (
            <input
                value={sanitizedValue}
                {...other}
                {...inputProps}
                type={this.props.type}/>
        );

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
                if (this.props.autoCompleteData)
                    filterData = true;

                autoCompleteDisplay = this._getAutoCompleteComponent(this.state.autoCompleteData, filterData);

            } else if (this.props.autoCompleteGetData) {

                // Callback function that will be called once the getting of autoComplete data is done
                var doneGetDataCallback = function (autoCompleteData) {

                    // This will allow us to display the autoComplete component using the autoCompleteData as its list
                    autoCompleteDisplay = this._getAutoCompleteComponent(autoCompleteData, filterData);
                    this.setState({
                        autoCompleteData: autoCompleteData,
                        skipGetData: true
                    })
                }.bind(this);

                var keyword = null;
                var inputDetails = this._evalInputValue()
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

        return (
            <div className={classes}>

                {floatingLabelTextElement}
                {hintTextElement}
                {inputElement}

                <hr className="chamel-text-field-underline"/>
                <hr className="chamel-text-field-focus-underline"/>

                {autoCompleteDisplay}

                {errorTextElement}

            </div>
        );
    },

    blur: function () {
        if (this.isMounted()) this._getInputNode().blur();
    },

    clearValue: function () {
        this.setValue('');
    },

    focus: function () {
        if (this.isMounted()) this._getInputNode().focus();
    },

    getValue: function () {
        return this.isMounted() ? this._getInputNode().value : undefined;
    },

    /**
     * Get the current caret/cursor position of the input node
     *
     * @return {int} iCaretPos      The current caret/cursor position
     * @public
     */
    getCaretPos: function () {
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
        else if (input.selectionStart || input.selectionStart == '0')
            iCaretPos = input.selectionStart;

        // Return results
        return iCaretPos;
    },

    /**
     * Set the current caret/cursor position of the input node
     *
     * @params {int} caretPos      The caret/cursor position
     * @public
     */
    setCaretPos: function (caretPos) {
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
            }

            else {
                // (input.sinputectionStart === 0 added for Firefox bug)
                if (input.selectionStart || input.selectionStart === 0) {
                    input.focus();
                    input.setSelectionRange(caretPos, caretPos);
                    return true;
                }

                else { // If all else fail, then just focus the input
                    input.focus();
                    return false;
                }
            }
        }
    },

    setErrorText: function (newErrorText) {
        if (process.NODE_ENV !== 'production' && this.props.hasOwnProperty('errorText')) {
            console.error('Cannot call TextField.setErrorText when errorText is defined as a property.');
        } else if (this.isMounted()) {
            this.setState({errorText: newErrorText});
        }
    },

    setValue: function (newValue) {
        // Make sure the value is good
        var sanitizedValue = this._sanitizeInputForType(newValue);

        // The value passed was invalid
        if (sanitizedValue === false) {
            this.setState({errorText: newValue + " is invalid for type=" + this.props.type})

            // Do not set anything
            return;
        }

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
    },

    /**
     * Validate a value for an input based on type
     *
     * @return {string|bool} If null then there was a problem
     */
    _sanitizeInputForType: function (checkValue) {
        switch (this.props.type) {
            case 'date':
                if (DateTimeUtil.validateDate(checkValue)) {
                    var date = new Date(checkValue);
                    // Format as defined in RFC 3339
                    return DateTimeUtil.format(date, "yyyy-MM-dd");
                } else {
                    return false;
                }
            default:
                // Nothing to do
                return checkValue;
                break;
        }
    },

    _getInputNode: function () {
        return this.props.multiLine ?
            this.refs.input.getInputNode() : ReactDOM.findDOMNode(this.refs.input);
    },

    _handleInputBlur: function (e) {
        this.setState({
            isFocused: false
        });

        if (this.props.onBlur) this.props.onBlur(e);
    },

    _handleInputChange: function (e) {
        var value = e.target.value;

        this.setState({
            hasValue: value,
            caretPos: this.getCaretPos(),
            keyPressedValue: null,
            skipGetData: false
        });

        if (this.props.onChange) {
            this.props.onChange(e, value);
        }
    },

    _handleInputFocus: function (e) {
        this.setState({isFocused: true});
        if (this.props.onFocus) this.props.onFocus(e);
    },

    _handleTextAreaHeightChange: function (e, height) {
        var newHeight = height + 24;
        if (this.props.floatingLabelText) newHeight += 24;
        ReactDOM.findDOMNode(this).style.height = newHeight + 'px';
    },

    _isControlled: function () {
        return this.props.hasOwnProperty('value') ||
            this.props.hasOwnProperty('valueLink');
    },

    _handleInputClick: function (e) {

        if (this.props.autoComplete) {
            this.setState({
                caretPos: this.getCaretPos(),
                keyPressedValue: null,
                skipGetData: true
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
    _handleInputKeyDown: function (evt) {

        switch (evt.keyCode) {
            case KeyCode.ENTER:
                if (this.props.onEnterKeyDown) {
                    this.props.onEnterKeyDown(evt);
                }

            case KeyCode.ESC:
            case KeyCode.UP:
            case KeyCode.DOWN:
                if (this.props.autoComplete) {
                    this.setState({
                        keyPressedValue: evt.keyCode,
                        caretPos: this.getCaretPos(),
                        skipGetData: true
                    });

                    if(!this.props.multiLine) {
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
    _handleInputKeyUp: function (evt) {
        switch (evt.keyCode) {
            case KeyCode.LEFT:
            case KeyCode.RIGHT:
            case KeyCode.DELETE:
            case KeyCode.BACKSPACE:
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
    _handleAutoCompleteSelected: function (value, caretPos, selectedData) {
        this.setValue(value);
        this.setCaretPos(caretPos);

        if(this.props.autoCompleteSelected) {
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
    _evalInputValue: function () {

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
            }

            /**
             * If the this.props.trigger is null, then lets use the this.props.delimiter
             *
             * Common Scenario:
             * trigger = null and delimiter = ';' (this is mostly used for emails)
             * trigger = @ (mostly used to browse users)
             * trigger = @ (mostly used to browse colors)
             */
            var triggerDelimiter = this.props.autoCompleteTrigger || this.props.autoCompleteDelimiter

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
    _getAutoCompleteComponent: function (autoCompleteData, filterData) {
        var component = null,
            attribute;

        if (autoCompleteData) {
            attribute = {
                suggestionData: autoCompleteData,
                filterData: filterData
            };
        }

        component = (
            <AutoComplete
                {... attribute}
                ref='autoComplete'
                inputDetails={this._evalInputValue()}
                keyPressedValue={this.state.keyPressedValue}
                suggestionData={autoCompleteData}
                trigger={this.props.autoCompleteTrigger}
                delimiter={this.props.autoCompleteDelimiter}
                onSelect={this._handleAutoCompleteSelected}
                transform={this.props.autoCompleteTransform}
            />
        );

        return component;
    }
});

module.exports = TextField;