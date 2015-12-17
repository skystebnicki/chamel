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
        autocompleteTrigger: React.PropTypes.array,
    },

    getDefaultProps: function () {
        return {
            type: 'text',
            autoComplete: false,
            autoCompleteData: null,
            autocompleteTrigger: ['@']
        };
    },

    getInitialState: function () {
        return {
            displayAutoComplete: false,
            errorText: this.props.errorText,
            caretPos: 0,
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

        if (this.props.autoComplete && this.state.hasValue) {
            autoCompleteDisplay = (
                <AutoComplete
                    ref='autoComplete'
                    autoCompleteData={this.props.autoCompleteData}
                    inputValue={this.state.hasValue}
                    inputCaretPos={this.state.caretPos}
                    keyPressedValue={this.state.keyPressedValue}
                    onSelect={this._handleAutoCompleteSelected}
                    />
            );
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
            this.setState({hasValue: sanitizedValue});
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
        this.setState({isFocused: false});
        if (this.props.onBlur) this.props.onBlur(e);
    },

    _handleInputChange: function (e) {
        var value = e.target.value;

        this.setState({
            hasValue: value,
            caretPos: this.getCaretPos()
        });

        if (this.props.onChange) {
            this.props.onChange(e, value);
        }
    },

    _handleInputFocus: function (e) {
        this.setState({isFocused: true});
        if (this.props.onFocus) this.props.onFocus(e);
    },

    _handleInputClick: function (e) {
        if (this.props.onClick) this.props.onClick(e);
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
                        caretPos: this.getCaretPos()
                    });

                    evt.preventDefault();
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
                        caretPos: this.getCaretPos()
                    });
                }
                break;
        }

        if (this.props.onKeyUp) {
            this.props.onKeyUp(evt);
        }
    },

    _handleAutoCompleteSelected: function (value, caretPos) {
        this.setValue(value);
        this.setCaretPos(caretPos)
    }
});

module.exports = TextField;