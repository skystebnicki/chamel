import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import UniqueId from '../utils/UniqueId';
import DateTimeUtil from '../utils/DateTime';
import AutoComplete from '../AutoComplete/AutoComplete';
import KeyCode from '../utils/KeyCode';
import ThemeService from '../styles/ChamelThemeService';

/**
 * Plain text input field
 */
class TextField extends Component {

  /**
   * Set accepted properties
   */
  static propTypes = {
    /**
     * String value of the input
     */
    value: PropTypes.string,

    /**
     * Any error text for this field
     */
    errorText: PropTypes.string,

    /**
     * Label text that should float on focus (depending on theme)
     */
    floatingLabelText: PropTypes.string,

    /**
     * Hint that is displayed until a value is entered
     */
    hintText: PropTypes.string,

    /**
     * Unique id of this text field
     */
    id: PropTypes.string,

    /**
     * Support more than one line
     */
    multiLine: PropTypes.bool,

    /**
     * Flag property to Focus on text field
     */
    autoFocus: PropTypes.bool,

    /**
     * Callback to capture blur event
     */
    onBlur: PropTypes.func,

    /**
     * Callback triggered when the value changes
     */
    onChange: PropTypes.func,

    /**
     * Callback triggered when focus is given to the input
     */
    onFocus: PropTypes.func,

    /**
     * Callback triggered when a user presses a key
     */
    onKeyDown: PropTypes.func,

    /**
     * Callback triggered when a user releses a key
     */
    onEnterKeyDown: PropTypes.func,

    /**
     * Callback triggered when a user clicks on the field
     */
    onClick: PropTypes.func,

    /**
     * Type of input can be any supported HTML input type
     * such as date, number, or text
     */
    type: PropTypes.string,

    /**
     * If true then add autocomplete to the input
     */
    autoComplete: PropTypes.bool,

    /**
     * Array of data to use for autocomplete
     */
    autoCompleteData: PropTypes.array,

    /**
     * An optional character that is used to open autocomplete
     *
     * A common usage for this would be something like the '@'
     * symbol invoking a user select list for tagging people.
     */
    autoCompleteTrigger: PropTypes.any,

    /**
     * An optional character for separating autocomplete terms
     */
    autoCompleteDelimiter: PropTypes.string,

    /**
     * Callback used to interpret the selection before inserting
     * it into the input.
     */
    autoCompleteTransform: PropTypes.func,

    /**
     * Optional alternative to autoComplete date which waits for a
     * callback to complete (usually an ajax request to the server)
     */
    autoCompleteGetData: PropTypes.func,

    /**
     * Callback that can be optionally called any time a user selects
     * an entiry from the autocomplete dropdown
     */
    autoCompleteSelected: PropTypes.func
  };

  /**
   * Set property defaults
   */
  static defaultProps = {
    type: 'text',
    skipGetData: true,
    autoComplete: false,
    autoCompleteData: null,
    autocompleteTrigger: ['@'],
    autocompleteDelimiter: ''
  };

  /**
   * An alternate theme may be passed down by a provider
   */
  static contextTypes = {
    chamelTheme: PropTypes.object
  };

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call paprent constructor
    super(props);

    this.state = {
      autoCompleteData: this.props.autoCompleteData,
      keyPressedValue: null,
      caretPos: 0,
      errorText: this.props.errorText,
      hasValue: this.props.value || this.props.defaultValue ||
      (this.props.valueLink && this.props.valueLink.value),
      componentIsMounted: false,
      autoFocus: this.props.autoFocus
    }
  }

  /**
   * Component is about to receive updated props, do some checks for setting state
   *
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const hasErrorProp = nextProps.hasOwnProperty('errorText');
    const hasValueLinkProp = nextProps.hasOwnProperty('valueLink');
    const hasValueProp = nextProps.hasOwnProperty('value');
    const hasNewDefaultValue = nextProps.defaultValue !== this.props.defaultValue;
    const hasNewAutoFocusValue = nextProps.autoFocus !== this.props.autoFocus;
    let newState = {};

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

  componentDidMount () {
    this.setState({componentIsMounted: true});

    if (this.props.multiLine) {
      this.handleAutoresize();
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // resize the textarea, if nessesary
    if (this.props.multiLine) this.handleAutoresize();

    if (this.state.autoFocus) {
        this.refs.input.focus();
    }
  }

  componentWillUnmount () {
    this.setState({componentIsMounted: false});
  }

  /**
   * Render the component
   *
   * @returns {JSX}
   */
  render() {

    // Determine which theme to use
    let theme = (this.context.chamelTheme && this.context.chamelTheme.input)
      ? this.context.chamelTheme.input : ThemeService.defaultTheme.input;

    let {
      className,
      errorText,
      floatingLabelText,
      hintText,
      id,
      multiLine,
      isFocus,
      onBlur,
      onChange,
      onFocus,
      onClick,
      type,
      value,
      skipGetData,
      autoComplete,
      autoCompleteData,
      autoCompleteGetData,
      autocompleteTrigger,
      autocompleteDelimiter,
      ...other
    } = this.props;

    const classes = classnames(theme.textField, {
      [theme.textFieldHasError]: this.props.errorText,
      [theme.hasValue]: this.state.hasValue,
      [theme.disabled]: this.props.disabled,
      [theme.focused]: this.state.isFocused
    });

    const inputId = this.props.id || UniqueId.generate();

    const errorTextElement = this.state.errorText ? (
      <div className={theme.errorText}>{this.state.errorText}</div>
    ) : null;

    // Setup hint text label
    const hintTextClasses = classnames(theme.hint, {
      [theme.hintDisabled]: this.props.disabled,
      [theme.hintHasValue]: this.state.hasValue
    });
    const hintTextElement = this.props.hintText ? (
      <label htmlFor={inputId} className={hintTextClasses}>{this.props.hintText}</label>
    ) : null;

    // Setup floating text label
    const floatingLabelClasses = classnames(theme.floatingLabel, {
        [theme.floatingLabelFloated]: (this.state.isFocused || ("date" === type) || this.state.hasValue),
        [theme.floatingLabelError]: this.state.errorText
    });
    const floatingLabelTextElement = this.props.floatingLabelText ? (
      <label
        className={floatingLabelClasses}
        htmlFor={inputId}>
        {this.props.floatingLabelText}
      </label>
    ) : null;

    // Define props for the input element
    const inputClasses = classnames(
      {
        [theme.textarea]: this.props.multiLine,
        [theme.textareaDisabled]: (this.props.multiLine && this.props.disabled),
        [theme.input]: !this.props.multiLine,
        [theme.inputDisabled]: (!this.props.multiLine && this.props.disabled)
      }
    );
    let inputProps = {
      ref: 'input',
      className: inputClasses,
      id: inputId,
      onBlur: this._handleInputBlur,
      onFocus: this._handleInputFocus,
      onKeyDown: this._handleInputKeyDown,
      onKeyUp: this._handleInputKeyUp,
      onClick: this._handleInputClick,
      defaultValue: (value) ? this._sanitizeInputForType(value) : ''
    };

    if (!this.props.hasOwnProperty('valueLink')) {
      inputProps.onChange = this._handleInputChange;
    }

    // We need to remove invalid props before we pass it to <textarea> or <input>
    for (let prop in other) {
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

    let inputElement = this.props.multiLine ? (
      <textarea
        rows={1}
        {...other}
        {...inputProps}
       />
    ) : (
      <input
        {...other}
        {...inputProps}
        type={this.props.type}
      />
    );

    // Check if autoComplete is set before we try to display autoComplete component
    let autoCompleteDisplay = null;
    if (this.props.autoComplete && this.state.hasValue) {

      // Throw an error if the user have provided both data and getData properties
      if (this.props.autoCompleteData && this.props.autoCompleteGetData) {
        console.error('Cannot provide autoCompleteData and autoCompleteGetData properties at the same time.');
      }

      let filterData = false;

      if ((this.state.skipGetData || this.props.autoCompleteData) && this.state.autoCompleteData) {

        // If the autoComplete data is coming from the props, then we need to set the filterData to true
        if (this.props.autoCompleteData)
          filterData = true;

        autoCompleteDisplay = this._getAutoCompleteComponent(this.state.autoCompleteData, filterData);

      } else if (this.props.autoCompleteGetData) {

        // Callback function that will be called once the getting of autoComplete data is done
        const doneGetDataCallback = function (autoCompleteData) {

          // This will allow us to display the autoComplete component using the autoCompleteData as its list
          autoCompleteDisplay = this._getAutoCompleteComponent(autoCompleteData, filterData);
          this.setState({
            autoCompleteData: autoCompleteData,
            skipGetData: true
          })
        }.bind(this);

        let keyword = null;
        const inputDetails = this._evalInputValue()
        const chunkedValue = inputDetails.subValue.substr(inputDetails.startPos, inputDetails.caretPos);

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
    const focuseUnderlineClasses = classnames(theme.focusUnderline, {
      [theme.focusUnderlineOn]: this.state.isFocused,
      [theme.focusUnderlineDisabled]: this.props.disabled,
      [theme.focusUnderlineError]: this.props.errorText
    });

    return (
      <div>
        <div className={classes}>

          {floatingLabelTextElement}
          {hintTextElement}
          {inputElement}

          <div className={theme.unfocusUnderline} />
          <div className={focuseUnderlineClasses} />

          {errorTextElement}
        </div>
        {autoCompleteDisplay}
      </div>
    );
  }


  blur() {
    if (this.state.componentIsMounted) this._getInputNode().blur();
  }

  clearValue() {
    this.setValue('');
  }

  focus() {
    if (this.state.componentIsMounted) this._getInputNode().focus();
  }

  getValue() {
    return this.state.componentIsMounted ? this._getInputNode().value : undefined;
  }

  /**
   * Get the current caret/cursor position of the input node
   *
   * @return {int} iCaretPos      The current caret/cursor position
   * @public
   */
  getCaretPos() {
    // Do not look for position if this is a date input
    if (this.props.type == 'date') {
      return 0;
    }

    let input = this._getInputNode();

    // Initialize
    let iCaretPos = 0;

    // IE Support
    if (document.selection) {

      // Set focus on the element
      input.focus();

      // To get cursor position, get empty selection range
      let oSel = document.selection.createRange();

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
  }

  /**
   * Set the current caret/cursor position of the input node
   *
   * @params {int} caretPos      The caret/cursor position
   * @public
   */
  setCaretPos(caretPos) {
    let input = this._getInputNode();

    input.value = input.value;
    // ^ this is used to not only get "focus", but
    // to make sure we don't have it everything -selected-
    // (it causes an issue in chrome, and having it doesn't hurt any other browser)

    if (input !== null) {

      if (input.createTextRange) {
        let range = input.createTextRange();
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
  }

  setValue(newValue) {
    // Make sure the value is good
    const sanitizedValue = this._sanitizeInputForType(newValue);

    // The value passed was invalid
    if (sanitizedValue === false) {
      this.setState({errorText: newValue + " is invalid for type=" + this.props.type})

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
  _sanitizeInputForType(checkValue) {
    switch (this.props.type) {
      case 'date':
        if (DateTimeUtil.validateDate(checkValue)) {
          const date = new Date(checkValue);
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
  }

  /**
   * Auto-resize a multiline input
   */
  handleAutoresize = () => {
    const element = this.refs.input;
    // compute the height difference between inner height and outer height
    try {
      const style = getComputedStyle(element, null);
      const heightOffset = style.boxSizing === 'content-box'
        ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom))
        : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

      // resize the input to its content size
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight + heightOffset}px`;
    } catch (e) {
      // We do nothing because if the component is not yet mounted
      // and running server-side or in a test then el.style will not exist
    }
  }

  _getInputNode() {
    return ReactDOM.findDOMNode(this.refs.input);
  }

  _handleInputBlur = (e) => {
    this.setState({
      isFocused: false
    });

    if (this.props.onBlur) this.props.onBlur(e);
  };

  _handleInputChange = (e)  =>{
    const value = e.target.value;

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
  };

  _handleInputFocus = (e) => {
    this.setState({
      isFocused: true,
      anchorEl: e.currentTarget
    });
    if (this.props.onFocus) this.props.onFocus(e);
  };

  _isControlled() {
    return this.props.hasOwnProperty('value') ||
      this.props.hasOwnProperty('valueLink');
  }

  _handleInputClick = (e) => {

    if (this.props.autoComplete) {
      this.setState({
        caretPos: this.getCaretPos(),
        keyPressedValue: null,
        skipGetData: true,
        anchorEl: e.currentTarget
      });
    }

    if (this.props.onClick) this.props.onClick(e);
  };

  /**
   * Callback used to handle the input keydown
   *
   * @param {DOMEvent} evt    Reference to the DOM event being sent
   * @private
   */
  _handleInputKeyDown = (evt) => {

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

    // resize the textarea, if nessesary
    if (this.props.multiLine) {
      this.handleAutoresize();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(evt);
    }
  };

  /**
   * Callback used to handle the input keyup
   *
   * @param {DOMEvent} evt    Reference to the DOM event being sent
   * @private
   */
  _handleInputKeyUp = (evt) => {
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
  };

  /**
   * Callback used to handle the selection of autocomplete data
   *
   * @param {string} value The selected value in the autoComplete data list
   * @param {int} caretPos The caret/cursor position of the input
   * @param {obj} selectedData The selected data in the autoComplete
   * @private
   */
  _handleAutoCompleteSelected = (value, caretPos, selectedData) => {
    this.setValue(value);
    this.setCaretPos(caretPos);

    if(this.props.autoCompleteSelected) {
      this.props.autoCompleteSelected(selectedData);
    }
  };

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
  _evalInputValue() {
    let details = null;
    const inputValue = this.state.hasValue; // Get the current input value
    const caretPos = this.state.caretPos; // Get the current caret/cursor position

    if (inputValue) {
      const subValue = inputValue.substr(0, caretPos); // Get the substr of inputValue from index 0 to caretPos

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
      const triggerDelimiter = this.props.autoCompleteTrigger || this.props.autoCompleteDelimiter

      if (triggerDelimiter) {
        for (let idx in triggerDelimiter) {
          let td = triggerDelimiter[idx];

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
  _getAutoCompleteComponent(autoCompleteData, filterData) {
    let component = null,
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
        anchorEl={this.state.anchorEl}
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
}

export default TextField;
