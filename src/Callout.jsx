var React = require('react');
var ReactDOM = require('react-dom');
var KeyCode = require('./utils/KeyCode.jsx');
var Menu = require('./menu/Menu.jsx');
var TextField = require('./TextField.jsx');

var Callout = React.createClass({

    propTypes: {
        suggestions: React.PropTypes.array,
        inputAttributes: React.PropTypes.object, // Attributes to pass to the input field (e.g. { id: 'my-input', className: 'chamel-autosuggest'
    },

    getDefaultProps: function () {
        return {
            errorText: 'text'
        };
    },

    getInitialState: function () {
        return {
            focusedIndex: 0,
            displaySuggestions: false
        };
    },

    render: function () {

        var displaySuggestions = null;

        if (this.state.displaySuggestions) {
            displaySuggestions = (
                <Menu
                    menuItems={this.props.suggestions}
                    focusedIndex={this.state.focusedIndex}
                    onItemClick={this._handleItemClick}
                    absoluteOnly={true}
                    />
            );
        }

        return (
            <div className='chamel-callout'>
                <TextField
                    {... this.props.inputAttributes}
                    ref='calloutInput'
                    onKeyDown={this._handleInputKeyDown}
                    onKeyUp={this._handleInputKeyUp}
                    onClick={this._handleInputClick}
                    onChange={this._handleInputChange}
                    />

                {displaySuggestions}
            </div>
        );
    },

    /**
     * Callback used to handle the changing of input
     *
     * @param {DOMEvent} evt    Reference to the DOM event being sent
     * @private
     */
    _handleInputChange: function (evt) {
        this._displaySuggestion();

        if(this.props.inputAttributes.onChange) {
            this.props.inputAttributes.onChange(evt);
        }
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
                if (this.state.displaySuggestions) {
                    var selectedValue = this.props.suggestions[this.state.focusedIndex].text;

                    this._setCalloutValue(selectedValue);
                }

                break;

            case KeyCode.ESC:
                if (this.state.displaySuggestions) {
                    this.setState({displaySuggestions: false});
                    evt.preventDefault();
                }
                break;

            case KeyCode.UP:
                if (this.state.displaySuggestions) {
                    if (this.state.focusedIndex > 0) {
                        this.setState({
                            focusedIndex: this.state.focusedIndex - 1
                        })
                    }
                    evt.preventDefault();
                }
                break;

            case KeyCode.DOWN:
                if (this.state.displaySuggestions) {
                    if (this.state.focusedIndex < (this.props.suggestions.length - 1)) {
                        this.setState({
                            focusedIndex: this.state.focusedIndex + 1
                        })
                    }
                    evt.preventDefault();
                }
                break;
        }

        if(this.props.inputAttributes.onKeyDown) {
            this.props.inputAttributes.onKeyDown(evt);
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
                this._displaySuggestion();
                break;
        }

        if(this.props.inputAttributes.onKeyUp) {
            this.props.inputAttributes.onKeyUp(evt);
        }
    },

    /**
     * Callback used to handle the clicking of suggestion item list
     *
     * @param {DOMEvent} e          Reference to the DOM event being sent
     * @param {int} key             The index of the menu clicked
     * @param {array} menuItem      The object value of the menu clicked
     * @private
     */
    _handleItemClick: function (e, key, menuItem) {
        this._setCalloutValue(menuItem.text);
    },

    /**
     * Evaluate the input value and get the needed details
     *
     * @param {object} details
     *  {
     *      value: the quick brown @fox,
     *      caretPos: 19, // Assuming the cursor/caret position is in second to the last position (between the o and x)
     *      subValue: the quick brown @fo,
     *      lastIndexOf: 16
     *  }
     * @private
     */
    _evalInputValue: function () {
        var input = this.refs.calloutInput;
        var inputValue = input.getValue(); // Get the current input value
        var caretPos = input.getCaretPos(); // Get the current caret/cursor position
        var subValue = inputValue.substr(0, caretPos); // Get the substr of inputValue from index 0 to caretPos

        var details = {
            value: inputValue,
            caretPos: caretPos,
            subValue: subValue,
            lastIndexOf: subValue.lastIndexOf('@'), // Get the last index value of the @ position
        }

        return details;
    },

    /**
     * Set the callout selected value in the input
     *
     * @param {string} selectedValue    The callout that is selected
     * @private
     */
    _setCalloutValue: function (selectedValue) {
        var input = this.refs.calloutInput;
        var inputDetails = this._evalInputValue();

        // Replace the @[+keyword] with the selected callout value
        var newValue = inputDetails.subValue.substr(0, inputDetails.lastIndexOf) + selectedValue;
        var newValueLength = newValue.length;

        // If the @ character is in the middle of text, then we need to append the last part of substr value
        newValue += inputDetails.value.substr(inputDetails.caretPos, inputDetails.value.length);

        input.setValue(newValue); // Set the new value in the input box

        /**
         * Set the caret position of the input box.
         * This is necessary if the @ character is in the middle of text
         */
        input.setCaretPos(newValueLength);

        // Hide the suggestion list once the user has selected a callout
        this.setState({displaySuggestions: false});
    },

    /**
     * Determine if we need to display the suggestion list
     *
     * The suggestion list will be displayed if the user inputs an "@" character in the input box
     * Or if there is already an @ character in the input box
     *      then this function will check if the keyword from "@" char to caret position is in the suggestion list
     *      if so, then it will display the suggestion list
     *
     * @private
     */
    _displaySuggestion: function () {
        var input = this.refs.calloutInput;
        var inputDetails = this._evalInputValue();

        // If we find an @ in the inputValue, then lets evaluate it inside the if statement
        if (inputDetails.lastIndexOf >= 0) {

            /**
             * Now lets get the chuncked value from the @ position to caret position
             * We will not include the @ in the chunkedValue
             * So we need to increment the value of lastIndexOf
             */
            var chunkedValue = inputDetails.subValue.substr(inputDetails.lastIndexOf + 1, inputDetails.caretPos);

            // Loop thru this.props.suggestions and find if we have a match of the chunkedValue
            for(var idx in this.props.suggestions) {

                var re = new RegExp(chunkedValue, 'g'); // Create a regex using the chunkedValue
                var suggestion = this.props.suggestions[idx];

                // If we found a match, then lets display the suggestions list
                if (suggestion.text.match(re)) {
                    this.setState({displaySuggestions: true});
                    return;
                }
            }

            this.setState({displaySuggestions: false});
        } else {
            this.setState({displaySuggestions: false});
        }
    },

    _handleInputClick: function () {
        this._displaySuggestion();
    }
});

module.exports = Callout;