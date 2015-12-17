var React = require('react');
var ReactDOM = require('react-dom');
var KeyCode = require('./utils/KeyCode.jsx');
var Menu = require('./menu/Menu.jsx');
var TextField = require('./TextField.jsx');

var AutoComplete = React.createClass({

    propTypes: {
        autoCompleteData: React.PropTypes.array.isRequired,
        inputValue: React.PropTypes.string,
        inputCaretPos: React.PropTypes.number,
        keyPressedValue: React.PropTypes.number,
        onSelect: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            inputValue: null,
            inputCaretPos: 0,
            keyPressedValue: null,
        };
    },

    getInitialState: function () {
        return {
            focusedIndex: 0,
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this._handleInputKeyPress(nextProps.keyPressedValue);
    },

    render: function () {
        var displayAutoComplete = null;

        if (this._displayAutoComplete()) {
            displayAutoComplete = (
                <Menu
                    menuItems={this.props.autoCompleteData}
                    focusedIndex={this.state.focusedIndex}
                    onItemClick={this._handleItemClick}
                    absoluteOnly={true}
                    />
            );
        }

        return (
            <div className='chamel-autoComplete'>
                {displayAutoComplete}
            </div>
        );
    },

    /**
     * Callback used to handle the input keydown
     *
     * @param {DOMEvent} evt    Reference to the DOM event being sent
     * @private
     */
    _handleInputKeyPress: function (keyCode) {

        if(!this._displayAutoComplete()) {
            return;
        }

        switch (keyCode) {
            case KeyCode.ENTER:
                this._setAutoCompleteValue();
                break;

            case KeyCode.ESC:
                break;

            case KeyCode.UP:
                if (this.state.focusedIndex > 0) {
                    this.setState({
                        focusedIndex: this.state.focusedIndex - 1
                    })
                }
                break;

            case KeyCode.DOWN:
                if (this.state.focusedIndex < (this.props.autoCompleteData.length - 1)) {
                    this.setState({
                        focusedIndex: this.state.focusedIndex + 1
                    })
                }
                break;

            case KeyCode.LEFT:
            case KeyCode.RIGHT:
            case KeyCode.DELETE:
            case KeyCode.BACKSPACE:
                this._displayAutoComplete();
                break;
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
        this._setAutoCompleteValue(menuItem.text);
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
        var details = null;
        var inputValue = this.props.inputValue; // Get the current input value

        if (inputValue) {
            var caretPos = this.props.inputCaretPos; // Get the current caret/cursor position
            var subValue = inputValue.substr(0, caretPos); // Get the substr of inputValue from index 0 to caretPos

            var details = {
                value: inputValue,
                caretPos: caretPos,
                subValue: subValue,
                lastIndexOf: subValue.lastIndexOf('@'), // Get the last index value of the @ position
            }
        }

        return details;
    },

    /**
     * Set the autoComplete selected value in the input
     *
     * @param {string} selectedValue    The autoComplete that is selected
     * @private
     */
    _setAutoCompleteValue: function (selectedValue) {

        if(!selectedValue) {
            selectedValue = this.props.autoCompleteData[this.state.focusedIndex].text;
        }

        var input = this.refs.autoCompleteInput;
        var inputDetails = this._evalInputValue();

        // Replace the @[+keyword] with the selected autoComplete value
        var newValue = inputDetails.subValue.substr(0, inputDetails.lastIndexOf) + selectedValue;
        var newCaretPos = newValue.length;

        // If the @ character is in the middle of text, then we need to append the last part of substr value
        newValue += inputDetails.value.substr(inputDetails.caretPos, inputDetails.value.length);

        if(this.props.onSelect) {
            this.props.onSelect(newValue, newCaretPos)
        }
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
    _displayAutoComplete: function () {
        var inputDetails = this._evalInputValue();

        // If we find an @ in the inputValue, then lets evaluate it inside the if statement
        if (inputDetails && inputDetails.lastIndexOf >= 0) {

            /**
             * Now lets get the chuncked value from the @ position to caret position
             * We will not include the @ in the chunkedValue
             * So we need to increment the value of lastIndexOf
             */
            var chunkedValue = inputDetails.subValue.substr(inputDetails.lastIndexOf + 1, inputDetails.caretPos);

            if (chunkedValue.length == 0) {
                return false
            }

            // Loop thru this.props.autoCompleteData and find if we have a match of the chunkedValue
            for (var idx in this.props.autoCompleteData) {

                var re = new RegExp(chunkedValue, 'g'); // Create a regex using the chunkedValue
                var suggestion = this.props.autoCompleteData[idx];

                // If we found a match, then lets display the autoCompleteData list
                if (suggestion.text.match(re)) {
                    return true;
                }
            }
        }

        return false;
    },
});

module.exports = AutoComplete;