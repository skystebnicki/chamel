var React = require('react');
var ReactDOM = require('react-dom');
var KeyCode = require('./utils/KeyCode.jsx');
var Menu = require('./menu/Menu.jsx');

var AutoComplete = React.createClass({

    propTypes: {

        /**
         * Suggestion list that will be displayed as menu list
         *
         * @var {array}
         */
        suggestionData: React.PropTypes.array.isRequired,

        /**
         * The trigger key to display the menu list. Default value is null
         *
         * If trigger is null, then it should start autocomplete after two chars are entered
         * If trigger is an array, it will loop thru the triggers. (e.g. ['@', '#', '$']
         * If trigger is an string, then it will display the suggestion list if the user enters that key
         *
         * @var {any}
         */
        trigger: React.PropTypes.any,

        /**
         * Delimiter will give us the ability to make it ';' or ',' for things like email input but defaults to space/words
         *
         * @var {string}
         */
        delimiter: React.PropTypes.string,

        /**
         * The value coming from the input (textField/editor)
         *
         * @var {string}
         */
        inputValue: React.PropTypes.string,

        /**
         * The caret/cursor positon of the input
         *
         * @var {int}
         */
        inputCaretPos: React.PropTypes.number,

        /**
         * The keypress value from the input (textField/editor)
         *
         * @var {int}
         */
        keyPressedValue: React.PropTypes.number,

        /**
         * The callback function used when user selects the suggestion list item
         *
         * @var {func}
         */
        onSelect: React.PropTypes.func,

        transform: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            inputValue: null,
            inputCaretPos: 0,
            keyPressedValue: null,
            delimiter: '',
            trigger: null
        };
    },

    getInitialState: function () {
        var inputDetails = this._evalInputValue(this.props);
        var suggestionList = this._getSuggestionList(inputDetails);

        return {
            focusedIndex: 0,
            suggestionList: suggestionList
        };
    },

    componentWillReceiveProps: function (nextProps) {

        var inputDetails = this._evalInputValue(nextProps);
        var suggestionList = this._getSuggestionList(inputDetails);

        this.setState({suggestionList: suggestionList})

        if (suggestionList.length > 0) {
            this._handleInputKeyPress(nextProps.keyPressedValue);
        }

    },

    render: function () {
        var displayAutoComplete = null;

        if (this.state.suggestionList.length > 0) {
            displayAutoComplete = (
                <Menu
                    menuItems={this.state.suggestionList}
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

        switch (keyCode) {
            case KeyCode.ENTER:
                this._setAutoCompleteValue(this.state.focusedIndex);
                break;

            case KeyCode.ESC:
                this.setState({
                    focusedIndex: 0,
                    suggestionList: []
                });
                break;

            case KeyCode.UP:
                if (this.state.focusedIndex > 0) {
                    this.setState({
                        focusedIndex: this.state.focusedIndex - 1
                    })
                }
                break;

            case KeyCode.DOWN:
                if (this.state.focusedIndex < (this.props.suggestionData.length - 1)) {
                    this.setState({
                        focusedIndex: this.state.focusedIndex + 1
                    })
                }
                break;

            case KeyCode.LEFT:
            case KeyCode.RIGHT:
            case KeyCode.DELETE:
            case KeyCode.BACKSPACE:
                this._getSuggestionList();
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
        this._setAutoCompleteValue(key);
    },

    /**
     * Set the autoComplete selected value in the input
     *
     * @param {int} selectedIndex    The autoComplete list index that was selected
     * @private
     */
    _setAutoCompleteValue: function (selectedIndex) {

        var selectedValue = null;
        var selectedData = this.state.suggestionList[selectedIndex];

        if(this.props.transform) {
            selectedValue = this.props.transform(selectedData);
        }

        if(!selectedValue) {
            selectedValue = selectedData.text;
        }

        var inputDetails = this._evalInputValue(this.props);

        if (this.props.trigger == null
            && inputDetails.startPos > 0
            && inputDetails.subValue[inputDetails.startPos] === " ") {

            /**
             * If trigger is null and startPos is -1, this means that the user is just typing letters without a trigger key
             * We are also checking if the string has a postfix of space (e.g. 'testString ')
             * If all of these are conditions are met, then we will increment the startPos by 1
             * This is necessary so when replacing the keyword with the selectedValue, we will include the space in between
             */
            inputDetails.startPos += 1;
        }

        // Replace the trigger key with the selected autoComplete value
        var newValue = inputDetails.subValue.substr(0, inputDetails.startPos);
        newValue += selectedValue;
        newValue += this.props.delimiter;

        var newCaretPos = newValue.length;

        // If the trigger key is in the middle of text, then we need to append the last part of substr value
        newValue += inputDetails.value.substr(inputDetails.caretPos, inputDetails.value.length);

        this.setState({
            focusedIndex: 0,
            suggestionList: []
        });

        if (this.props.onSelect) {
            this.props.onSelect(newValue, newCaretPos)
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
    _evalInputValue: function (source) {

        if (!source) {
            source = this.props
        }

        var details = null;
        var inputValue = source.inputValue; // Get the current input value

        var caretPos = source.inputCaretPos; // Get the current caret/cursor position
        if (inputValue) {
            var subValue = inputValue.substr(0, caretPos); // Get the substr of inputValue from index 0 to caretPos

            var details = {
                value: inputValue,
                caretPos: caretPos,
                subValue: subValue,
                minLengthLimit: this.props.trigger ? 0 : 2,
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
            var triggerDelimiter = this.props.trigger || this.props.delimiter

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

            if (this.props.trigger == null && details.startPos == -1) {

                /**
                 * If trigger is null and startPos is -1, this means that the user is just typing letters without a trigger key
                 * We are setting the startPos to 0 since we need to check the input value from start to the current caret position
                 */
                details.startPos = 0;

            } else if (details.startPos >= 0) {
                details.startPos += 1;
            }
        }

        return details;
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
    _getSuggestionList: function (inputDetails) {

        var suggestionList = [];

        // If we find an @ in the inputValue, then lets evaluate it inside the if statement
        if (inputDetails && inputDetails.startPos >= 0) {

            /**
             * Now lets get the chuncked value from the @ position to caret position
             * We will not include the @ in the chunkedValue
             * So we need to increment the value of startPos
             */
            var chunkedValue = inputDetails.subValue.substr(inputDetails.startPos, inputDetails.caretPos).trimLeft();
            if (chunkedValue.length <= inputDetails.minLengthLimit) {
                return suggestionList;
            }

            // Loop thru this.props.suggestionData and find if we have a match of the chunkedValue keyword
            for (var idx in this.props.suggestionData) {

                var re = new RegExp(chunkedValue, 'g'); // Create a regex using the chunkedValue keyword
                var suggestion = this.props.suggestionData[idx];

                // If we found a match, then lets push it in suggestionList to be displayed later
                if (suggestion.text.match(re)) {
                    suggestionList.push(suggestion);
                }
            }
        }

        return suggestionList;
    },
});

module.exports = AutoComplete;