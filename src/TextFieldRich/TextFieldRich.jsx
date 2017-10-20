import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import UAParser from 'ua-parser-js';

const uaParser = new UAParser();

class TextFieldRich extends Component {
  /**
	 * Class constructor
	 *
	 * @param {Object} props Properties to send to the render function
	 */
  constructor(props) {
    // Call parent constructor
    super(props);

    this.state = {
      componentIsMounted: false,
    };
  }

  componentDidMount() {
    const iframe = ReactDOM.findDOMNode(this.refs.rte);
    iframe.style.width = '100%';

    // If height has been passed then set the iframe height
    if (this.props.height) {
      iframe.style.height = height + 'px';
    }

    this.setState({ componentIsMounted: true });

    /*
		 * We need to delay the settings of the iframe document body because react only renders the iframe
		 * So after it is mounted, the iframe body is then created.
		 * If we are not going to use setTimeout, the body settings are still set but will not reflect in the iframe document body
		 */
    setTimeout(
      function() {
        this._enableDesign(true);
        this.setValue(this.props.value);
      }.bind(this),
      1,
    );
  }

  componentWillUnmount() {
    this.setState({ componentIsMounted: false });
  }

  render() {
    return (
      <div className="chamel-text-field-rich">
        <iframe ref="rte" src="about:blank" />
      </div>
    );
  }

  /**
	 * Get the iframe window document
	 *
	 * @private
	 */
  _getIframeWindow = () => {
    // We cannot get iframe document if DOM is not yet mounted
    if (!this.state.componentIsMounted) {
      return null;
    }

    const ifrm = ReactDOM.findDOMNode(this.refs.rte);
    return ifrm.contentWindow || ifrm.contentDocument;
  };

  /**
	 * Public interface to send commands to the RTE
	 *
	 * @param {string} command The name of the RTE command to execute
	 * @param {string} option    The option when executing a certain command. e.g. changing the font/background colors
	 * @public
	 */
  sendCommand = (command, option) => {
    try {
      const ifrmWindow = this._getIframeWindow();
      const idoc = ifrmWindow.document || null;

      if (idoc) {
        ifrmWindow.focus();
        idoc.execCommand(command, false, option);
        ifrmWindow.focus();
        this._handleInputChange();
      }
    } catch (e) {
      throw new Error('Error while executing the ' + command + ' command');
    }
  };

  /**
	 * Sets the color of the current selection in the iframe document
	 *
	 * @param {string} type        Type of command to be executed. Either forecolor or backcolor
	 * @param {string} color    The color that was selected
	 * @public
	 */
  setColor = (type, color) => {
    this._setRange();
    this.sendCommand(type, color);
  };

  /**
	 * Inserts the html string
	 *
	 * @param {string} html        The string that will be inserted
	 * @public
	 */
  insertHtml = html => {
    this._setRange();

    if (uaParser.getBrowser().name == 'IE') {
      this.sendCommand('paste', html);
    } else {
      this.sendCommand('insertHtml', html);
    }
  };

  /**
	 * Prompts the dialog box for user input
	 *
	 * @param {string} path        The url path to be linked on text
	 * @public
	 */
  insertLink = path => {
    this._setRange();
    this.sendCommand('unlink', null);
    this.sendCommand('createlink', path);
  };

  /**
	 * Clear the value of the iframe document
	 *
	 * @public
	 */
  clearValue = () => {
    this.setValue('');
  };

  /**
	 * Get the current value of the iframe document / code mirror editor
	 *
	 * @public
	 */
  getValue = () => {
    const ifrmWindow = this._getIframeWindow();
    const idoc = ifrmWindow.document || null;
    let value = idoc.body.innerHTML || '';

    return value;
  };

  /**
	 * Set the value of the iframe document / code mirror editor
	 *
	 * @param {string} newValue        The value to be saved in the editor
	 * @public
	 */
  setValue = newValue => {
    const ifrmWindow = this._getIframeWindow();
    const idoc = ifrmWindow.document || null;

    if (idoc) {
      idoc.body.innerHTML = newValue;
      this._autoGrow();
    }
  };

  /**
	 * Set the range of the iframe document
	 *
	 * @private
	 */
  _setRange = () => {
    const ifrmWindow = this._getIframeWindow();
    const idoc = ifrmWindow.document || null;

    if (idoc && uaParser.getBrowser().name == 'IE') {
      let selection = idoc.selection;
      if (selection != null) this._rangeSelection = selection.createRange();
    } else if (ifrmWindow) {
      let selection = ifrmWindow.getSelection();
      this._rangeSelection = selection.getRangeAt(selection.rangeCount - 1).cloneRange();
    }

    if (ifrmWindow && idoc && uaParser.getBrowser().name == 'IE') {
      ifrmWindow.focus();

      // retrieve selected range
      let sel = idoc.selection;
      if (sel != null) {
        let newRng = sel.createRange();
        newRng = this._rangeSelection;
        newRng.select();
      }
    }
  };

  /**
	 * Handles the input blur event of the text area
	 *
	 * @param {DOMEvent} e        Reference to the DOM event being sent
	 * @private
	 */
  _handleInputBlur = e => {
    let result = { target: { value: this.getValue() } };

    if (this.props.onBlur) this.props.onBlur(result);
  };

  /**
	 * Handles the input change event of the text area
	 *
	 * @param {DOMEvent} e        Reference to the DOM event being sent
	 * @private
	 */
  _handleInputChange = e => {
    let result = { target: { value: this.getValue() } };
    if (this.props.onChange) this.props.onChange(result);
  };

  /**
	 * Handles the input focus of the text area
	 *
	 * @param {DOMEvent} e        Reference to the DOM event being sent
	 * @private
	 */
  _handleInputFocus = e => {
    let result = { target: { value: this.getValue() } };

    if (this.props.onFocus) {
      this.props.onFocus(result);
    }
  };

  /**
	 * Handles the input key down of the text area
	 *
	 * @param {DOMEvent} e        Reference to the DOM event being sent
	 * @private
	 */
  _handleInputKeyUp = e => {
    let result = { target: { value: this.getValue() } };

    if (this.props.autoGrow) {
      this._autoGrow();
    }

    if (e.keyCode == 13 && this.props.onEnterKeyDown) {
      this.props.onEnterKeyDown(result);
    }

    // Handle onkeydown event
    if (this.props.onKeyUp) {
      this.props.onKeyUp(result);
    }

    // Handle onChange event
    if (this.props.onChange) {
      this.props.onChange(result);
    }
  };

  /**
	 * Handles the change of height event of the text area
	 *
	 * @param {DOMEvent} e        Reference to the DOM event being sent
	 * @param {int} height    T    The height to be set
	 * @private
	 */
  _handleTextAreaHeightChange = (e, height) => {
    let newHeight = height + 24;
    if (this.props.floatingLabelText) {
      newHeight += 24;
    }
    ReactDOM.findDOMNode(this).style.height = newHeight + 'px';
  };

  /**
	 * Check if the component is controlled
	 *
	 * @private
	 */
  _isControlled = () => {
    return this.props.hasOwnProperty('value') || this.props.hasOwnProperty('valueLink');
  };

  /**
	 * Enables the editor if it is already mounted
	 *
	 * @private
	 */
  _enableDesign = on => {
    // Only enable after mounted into the dom
    if (!this.state.componentIsMounted) {
      return false;
    }

    // Get the iframe document
    const ifrmWindow = this._getIframeWindow();
    const idoc = ifrmWindow.document || null;

    // Make sure document is defined
    if (!idoc) {
      throw 'Could not get the document of the iframe';
    }

    let designModeOn = on || true;

    let editorBody = idoc.body;

    // Turn on spellcheck if available
    if ('spellcheck' in editorBody && designModeOn) {
      editorBody.spellcheck = true;
    }

    // Make content editable
    if ('contentEditable' in editorBody && designModeOn) {
      editorBody.contentEditable = true;
    } else {
      // Firefox earlier than version 3 uses document rather than body
      if ('designMode' in idoc && designModeOn) {
        idoc.designMode = 'on';
      }
    }

    // Set document events
    let evtObj =
      uaParser.getBrowser().name == 'IE'
        ? ReactDOM.findDOMNode(this.refs.rte)
        : this._getIframeWindow();

    if (evtObj.addEventListener) {
      // W3C DOM

      // on blur
      evtObj.addEventListener(
        'blur',
        function(evt) {
          this._handleInputBlur(evt);
        }.bind(this),
        false,
      );

      // on keyup
      evtObj.addEventListener(
        'keyup',
        function(evt) {
          this._handleInputKeyUp(evt);
        }.bind(this),
        false,
      );

      // on focus
      evtObj.addEventListener(
        'focus',
        function(evt) {
          this._handleInputFocus(evt);
        }.bind(this),
        false,
      );

      /*
			 * For some reason onchange is not working. We will be using onkeydown function instead.
			 *
			 evtObj.addEventListener("change",function(evt) {
			 this._handleInputChange(evt);
			 }.bind(this),false);
			 */
    } else if (evtObj.attachEvent) {
      // IE DOM

      // on blur
      evtObj.attachEvent(
        'onblur',
        function(evt) {
          this._handleInputBlur(evt);
        }.bind(this),
      );

      // on keydown
      evtObj.attachEvent(
        'onkeyup',
        function(evt) {
          this._handleInputKeyUp(evt);
        }.bind(this),
      );

      // on focus
      evtObj.attachEvent(
        'onfocus',
        function(evt) {
          this._handleInputFocus(evt);
        }.bind(this),
      );

      /*
			 * For some reason onchange is not working. We will be using onkeydown function instead.
			 *
			 evtObj.attachEvent("onchange",function(evt) {
			 this._handleInputChange(evt);
			 }.bind(this),false);
			 */
    }

    return true;
  };

  /**
	 * Autogrow the editor to match the contents
	 *
	 * @private
	 */
  _autoGrow = () => {
    // We cannot autogrow if we are not mounted in the DOM
    if (!this.state.componentIsMounted) {
      return false;
    }

    const ifrmWindow = this._getIframeWindow();
    const idoc = ifrmWindow.document || null;

    if (idoc) {
      const contentHeight = idoc.body.scrollHeight;

      let iframe = ReactDOM.findDOMNode(this.refs.rte);
      iframe.style.height = contentHeight + 'px';
    }
  };
}

TextFieldRich.propTypes = {
  id: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyUp: PropTypes.func,
  onEnterKeyDown: PropTypes.func,
  autoGrow: PropTypes.bool,
  height: PropTypes.number,
  value: PropTypes.string,
};

TextFieldRich.defaultProps = {
  autoGrow: true,
  value: '',
};

export default TextFieldRich;
