'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _KeyCode = require('../utils/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _Menu = require('../Menu/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Popover = require('../Popover/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _ChamelThemeService = require('../styles/ChamelThemeService');

var _ChamelThemeService2 = _interopRequireDefault(_ChamelThemeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoComplete = function (_Component) {
  _inherits(AutoComplete, _Component);

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  function AutoComplete(props) {
    _classCallCheck(this, AutoComplete);

    var _this = _possibleConstructorReturn(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).call(this, props));
    // Call parent constructor


    _this._handleInputKeyPress = function (keyCode) {
      switch (keyCode) {
        case _KeyCode2.default.ENTER:
          _this._setAutoCompleteValue(_this.state.focusedIndex);
          break;

        case _KeyCode2.default.ESC:
          _this.setState({
            openMenu: false,
            focusedIndex: 0,
            suggestionList: []
          });
          break;

        case _KeyCode2.default.UP:
          if (_this.state.focusedIndex > 0) {
            _this.setState({
              focusedIndex: _this.state.focusedIndex - 1
            });
          }
          break;

        case _KeyCode2.default.DOWN:

          if (_this.state.focusedIndex < _this.state.suggestionList.length - 1) {
            _this.setState({
              focusedIndex: _this.state.focusedIndex + 1
            });
          }
          break;

        case _KeyCode2.default.LEFT:
        case _KeyCode2.default.RIGHT:
        case _KeyCode2.default.DELETE:
        case _KeyCode2.default.BACKSPACE:
          _this._getSuggestionList();
          break;
      }
    };

    _this._handleItemClick = function (e, key, menuItem) {
      _this._setAutoCompleteValue(key);
      _this._handlePopoverRequestClose();
    };

    var inputDetails = _this.props.inputDetails;
    var suggestionList = _this._getSuggestionList(inputDetails, _this.props.suggestionData);

    _this.state = {
      focusedIndex: 0,
      suggestionList: suggestionList,
      openMenu: false
    };
    return _this;
  }

  /**
   * An alternate theme may be passed down by a provider
   */


  _createClass(AutoComplete, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
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
    }

    /**
     * Render the autocomplete menu
     *
     * @returns {JSX}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // Determine which theme to use
      var theme = this.context.chamelTheme && this.context.chamelTheme.input ? this.context.chamelTheme.input : _ChamelThemeService2.default.defaultTheme.input;

      return _react2.default.createElement(
        'div',
        { className: theme.autoCompleteContainer },
        _react2.default.createElement(
          _Popover2.default,
          {
            open: this.state.openMenu,
            anchorEl: this.props.anchorEl,
            anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
            onRequestClose: function onRequestClose() {
              _this2.setState({ openMenu: false });
            },
            relative: true },
          _react2.default.createElement(_Menu2.default, {
            menuItems: this.state.suggestionList,
            focusedIndex: this.state.focusedIndex,
            onItemClick: this._handleItemClick
          })
        )
      );
    }

    /**
     * Callback used to handle the input keydown
     *
     * @param {DOMEvent} evt    Reference to the DOM event being sent
     * @private
     */


    /**
     * Callback used to handle the clicking of suggestion item list
     *
     * @param {DOMEvent} e          Reference to the DOM event being sent
     * @param {int} key             The index of the menu clicked
     * @param {array} menuItem      The object value of the menu clicked
     * @private
     */

  }, {
    key: '_setAutoCompleteValue',


    /**
     * Set the autoComplete selected value in the input
     *
     * @param {int} selectedIndex    The autoComplete list index that was selected
     * @private
     */
    value: function _setAutoCompleteValue(selectedIndex) {

      var selectedData = this.state.suggestionList[selectedIndex];
      var selectedValue = null;

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
    }

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

  }, {
    key: '_getSuggestionList',
    value: function _getSuggestionList(inputDetails, suggestionData) {
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
            var keyword = chunkedValue.replace(/[!@#$%^&*]+/g, '');

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
  }]);

  return AutoComplete;
}(_react.Component);

AutoComplete.propTypes = {
  /**
   * Suggestion list that will be displayed as menu list
   *
   * @var {array}
   */
  suggestionData: _propTypes2.default.array,

  /**
   * Determine if we need to filter the suggestionData when user types a keyword.
   *
   * This is used in ::_getSuggestionList() where we are using regular expresion to find the suggestion item
   * If the suggestionData is already filtered, then just set this to false so it don't need to do the filtering
   *
   * @var {array}
   */
  filterData: _propTypes2.default.bool,

  /**
   * The trigger key to display the menu list. Default value is null
   *
   * If trigger is null, then it should start autocomplete after two chars are entered
   * If trigger is an array, it will loop thru the triggers. (e.g. ['@', '#', '$']
   * If trigger is an string, then it will display the suggestion list if the user enters that key
   *
   * @var {any}
   */
  trigger: _propTypes2.default.any,

  /**
   * Delimiter will give us the ability to make it ';' or ',' for things like email input but defaults to space/words
   *
   * @var {string}
   */
  delimiter: _propTypes2.default.string,

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
  inputDetails: _propTypes2.default.object,

  /**
   * The keypress value from the input (textField/editor)
   *
   * @var {int}
   */
  keyPressedValue: _propTypes2.default.number,

  /**
   * The callback function used when user selects the suggestion list item
   *
   * @var {func}
   */
  onSelect: _propTypes2.default.func,

  /**
   * The callback function used when displaying a selcted suggestion list item
   *
   * @var {func}
   */
  transform: _propTypes2.default.func,

  /**
   * The anchored element that will be used as a reference on where to display the popover
   *
   * @var {DOMElement}
   */
  anchorEl: _propTypes2.default.object
};
AutoComplete.defaultProps = {
  inputDetails: null,
  keyPressedValue: null,
  delimiter: '',
  trigger: null,
  filterData: true,
  anchorEl: null
};
AutoComplete.contextTypes = {
  chamelTheme: _propTypes2.default.object
};
exports.default = AutoComplete;
module.exports = exports['default'];