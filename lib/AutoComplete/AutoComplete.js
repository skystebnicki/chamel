'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Popover = require('../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var ReactDOM = require('react-dom');
var KeyCode = require('../utils/KeyCode');
var Menu = require('../Menu');


var AutoComplete = React.createClass({
    displayName: 'AutoComplete',


    propTypes: {

        /**
         * Suggestion list that will be displayed as menu list
         *
         * @var {array}
         */
        suggestionData: React.PropTypes.array,

        /**
         * Determine if we need to filter the suggestionData when user types a keyword.
         *
         * This is used in ::_getSuggestionList() where we are using regular expresion to find the suggestion item
         * If the suggestionData is already filtered, then just set this to false so it don't need to do the filtering
         *
         * @var {array}
         */
        filterData: React.PropTypes.bool,

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
         * The details of input that will be used to determine if we are displaying the suggestion list
         *
         * {
         *  value: the quick brown @fox,
         *  caretPos: 19, // Assuming the cursor/caret position is in second to the last position (between the o and x)
         *  subValue: the quick brown @fo,
         *  minLengthLimit: 0 or 2, // If we have a trigger data then the corresponding value is 0, else the value is 2
         *  startPos: 16
         * }
         *
         * @var {object}
         */
        inputDetails: React.PropTypes.object,

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

        /**
         * The callback function used when displaying a selcted suggestion list item
         *
         * @var {func}
         */
        transform: React.PropTypes.func,

        /**
         * The anchored element that will be used as a reference on where to display the popover
         *
         * @var {DOMElement}
         */
        anchorEl: React.PropTypes.object
    },

    getDefaultProps: function getDefaultProps() {
        return {
            inputDetails: null,
            keyPressedValue: null,
            delimiter: '',
            trigger: null,
            filterData: true,
            anchorEl: null
        };
    },

    getInitialState: function getInitialState() {
        var inputDetails = this.props.inputDetails;
        var suggestionList = this._getSuggestionList(inputDetails, this.props.suggestionData);

        return {
            focusedIndex: 0,
            suggestionList: suggestionList,
            openMenu: false
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var suggestionList = this._getSuggestionList(nextProps.inputDetails, nextProps.suggestionData);

        /**
         * If the anchored element and current active element is the same,
         *  then let's evaluate the suggestionList if we want to display the suggested list for autocomplete
         */
        if (nextProps.anchorEl == document.activeElement) {

            var openMenu = true;

            // If suggestionList is empty, there is no need to display the popover menu list
            if (suggestionList.length == 0) {
                openMenu = false;
            }

            this.setState({
                openMenu: openMenu
            });
        }

        this.setState({
            suggestionList: suggestionList,
            focusedIndex: 0
        });

        if (suggestionList.length > 0) {
            this._handleInputKeyPress(nextProps.keyPressedValue);
        }
    },

    render: function render() {
        var displayAutoComplete = null;

        return React.createElement(
            'div',
            { className: 'chamel-autoComplete' },
            React.createElement(
                _Popover2.default,
                {
                    classes: 'autocomplete-popover',
                    open: this.state.openMenu,
                    anchorEl: this.props.anchorEl,
                    anchorOrigin: { horizontal: 'left', vertical: 'top' },
                    onRequestClose: this._handlePopoverRequestClose },
                React.createElement(Menu, {
                    classes: 'autocomplete-menu',
                    menuItems: this.state.suggestionList,
                    focusedIndex: this.state.focusedIndex,
                    onItemClick: this._handleItemClick
                })
            )
        );
    },

    /**
     * Callback used to close the popover
     *
     * @private
     */
    _handlePopoverRequestClose: function _handlePopoverRequestClose() {
        this.setState({ openMenu: false });
    },

    /**
     * Callback used to handle the input keydown
     *
     * @param {DOMEvent} evt    Reference to the DOM event being sent
     * @private
     */
    _handleInputKeyPress: function _handleInputKeyPress(keyCode) {

        switch (keyCode) {
            case KeyCode.ENTER:
                this._setAutoCompleteValue(this.state.focusedIndex);
                break;

            case KeyCode.ESC:
                this.setState({
                    openMenu: false,
                    focusedIndex: 0,
                    suggestionList: []
                });
                break;

            case KeyCode.UP:
                if (this.state.focusedIndex > 0) {
                    this.setState({
                        focusedIndex: this.state.focusedIndex - 1
                    });
                }
                break;

            case KeyCode.DOWN:

                if (this.state.focusedIndex < this.state.suggestionList.length - 1) {
                    this.setState({
                        focusedIndex: this.state.focusedIndex + 1
                    });
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
    _handleItemClick: function _handleItemClick(e, key, menuItem) {
        this._setAutoCompleteValue(key);
        this._handlePopoverRequestClose();
    },

    /**
     * Set the autoComplete selected value in the input
     *
     * @param {int} selectedIndex    The autoComplete list index that was selected
     * @private
     */
    _setAutoCompleteValue: function _setAutoCompleteValue(selectedIndex) {

        var selectedValue = null;
        var selectedData = this.state.suggestionList[selectedIndex];

        if (this.props.transform) {
            selectedValue = this.props.transform(selectedData);
        }

        if (!selectedValue) {
            selectedValue = selectedData.text;
        }

        var inputDetails = this.props.inputDetails;

        if (this.props.trigger == null) {
            /**
             * If trigger is null and startPos is -1, this means that the user is just typing letters without a trigger key
             * We are also checking if the string has a postfix of space (e.g. 'testString ')
             * If all of these are conditions are met, then we will increment the startPos by 1
             * This is necessary so when replacing the keyword with the selectedValue, we will include the space in between
             */
            if (inputDetails.subValue[inputDetails.startPos] === " ") {
                inputDetails.startPos += 1;
            }
        } else {
            inputDetails.startPos -= 1;
        }

        // Replace the trigger key with the selected autoComplete value
        var newValue = inputDetails.subValue.substr(0, inputDetails.startPos);
        newValue += selectedValue;
        newValue += this.props.delimiter ? this.props.delimiter : '';

        var newCaretPos = newValue.length;

        // If the trigger key is in the middle of text, then we need to append the last part of substr value
        newValue += inputDetails.value.substr(inputDetails.caretPos, inputDetails.value.length);

        this.setState({
            openMenu: false,
            focusedIndex: 0,
            suggestionList: []
        });

        if (this.props.onSelect) {
            this.props.onSelect(newValue, newCaretPos, selectedData);
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
    _getSuggestionList: function _getSuggestionList(inputDetails, suggestionData) {

        if (!suggestionData) {
            suggestionData = this.props.suggestionData;
        }

        var suggestionList = [];

        // If we find an @ in the inputValue, then lets evaluate it inside the if statement
        if (suggestionData && inputDetails && inputDetails.startPos >= 0) {

            /**
             * Now lets get the chuncked value from the @ position to caret position
             * We will not include the @ in the chunkedValue
             * So we need to increment the value of startPos
             */
            var chunkedValue = inputDetails.subValue.substr(inputDetails.startPos, inputDetails.caretPos);
            if (chunkedValue.length <= inputDetails.minLengthLimit) {
                return suggestionList;
            }

            // If the data unfiltered, then we need to filter it by using keyword and regular expressions
            if (this.props.filterData) {

                // Map this.props.suggestionData and find if we have a match of the chunkedValue keyword
                suggestionData.map(function (suggestion) {

                    // We need the keyword to only have alphanumeric characters
                    var keyword = chunkedValue.replace(/[\W\s+]+/g, '');

                    var re = new RegExp(keyword, 'gi'); // Create a regex using the chunkedValue keyword

                    // If we found a match, then lets push it in suggestionList to be displayed later
                    if (suggestion.text.match(re)) {
                        suggestionList.push(suggestion);
                    }
                });
            } else {
                suggestionList = suggestionData;
            }
        }

        return suggestionList;
    }
});

// Check for commonjs
if (module) {
    module.exports = AutoComplete;
}

exports.default = AutoComplete;
module.exports = exports['default'];