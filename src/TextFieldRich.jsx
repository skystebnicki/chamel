var React = require('react');
var UAParser = require('ua-parser-js');

var uaParser = new UAParser();

var RichText = React.createClass({

  propTypes: {
    id: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onEnterKeyDown: React.PropTypes.func,
    autoGrow: React.PropTypes.bool,
    height: React.PropTypes.number,
    value: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      autoGrow: true,
      value: ""
    };
  },

  componentDidMount: function() {

    // If height has been passed then set the iframe height
    if (this.props.height) {
      var iframe = this.refs.rte.getDOMNode();
      iframe.style.height = height;
    }

    // Make the contents of the iframe editable
    this._enableDesign();
    this.setValue(this.props.value);
  },

  render: function() {
    return ( 
      <div className="chamel-text-field-rich" >
        <iframe ref='rte' src="about:blank" />
      </div> 
    );
  },

  blur: function() {
    if (this.isMounted()) {
      //this._getInputNode().blur();
    }
  },

  clearValue: function() {
    this.setValue('');
  },

  focus: function() {
    if (this.isMounted()) {
    }
  },

  getValue: function() {
    if (!this.isMounted()) {
      return undefined;
    } 

    // if (this.f_src && this.codeMirror) {
    //   this.hdntxt.value = this.codeMirror.getValue();
    // } else {
      var idoc = this._getIframDoc();
      return idoc.body.innerHTML;
    //}

  },

  setValue: function(newValue) {
    var idoc = this._getIframDoc();
    idoc.body.innerHTML = newValue;
    
    if (this.isMounted()) {
      this._autoGrow();
    }
  },

  _handleInputBlur: function(e) {

    if (typeof e.target === "undefied")
      e.target = {};
    e.target.value = this.getValue();

    this._handleInputChange(e);

    if (this.props.onBlur) this.props.onBlur(e);

  },

  _handleInputChange: function(e) {
    if (this.props.onChange) this.props.onChange(e);
  },

  _handleInputFocus: function(e) {
    this.setState({isFocused: true});
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputKeyDown: function(e) {
    if (this.props.autoGrow) {
      this._autoGrow();
    }

    if (e.keyCode === 13 && this.props.onEnterKeyDown) {
      this.props.onEnterKeyDown(e);
    }
    
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  },

  _handleTextAreaHeightChange: function(e, height) {
    var newHeight = height + 24;
    if (this.props.floatingLabelText) newHeight += 24;
    this.getDOMNode().style.height = newHeight + 'px';
  },

  _isControlled: function() {
    return this.props.hasOwnProperty('value') ||
      this.props.hasOwnProperty('valueLink');
  },

  _getIframeWindow: function() {
    var ifrm = this.refs.rte.getDOMNode();
    return ifrm.contentWindow || ifrm.contentDocument;
  },

  _getIframDoc: function() {
    var iwnd = this._getIframeWindow();

    if (iwnd && iwnd.document) {
      return iwnd.document;
    } else {
      return false;
    }
  },

  _enableDesign: function(on){

    // Only enable after mounted into the dom
    if (!this.isMounted()) {
      return false;
    }

    // Get the iframe document
    var idoc = this._getIframDoc();

    // Make sure document is defined
    if (!idoc) {
      throw "Could not get the document of the iframe";
    } 

    var designModeOn = on || true;

    var editorBody = idoc.body;

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
        idoc.designMode = "on";                
      }
    }

    // Set blur event
    // TODO: For some reason it is always firing twice... we should investigate
    var evtObj = (uaParser.getBrowser().name == "IE")
        ? this.refs.rte.getDOMNode() : this._getIframeWindow();

    // W3C DOM
    if (evtObj.addEventListener) {
      evtObj.addEventListener("blur",function(evt) {
        this._handleInputBlur(evt);
      }.bind(this),false);
    } else if (evtObj.attachEvent) {
      // IE DOM
      evtObj.attachEvent("onblur", function(evt) {
        this._handleInputBlur(evt);
      }.bind(this));
    }

    // Set keydown event
    var evtObj = (uaParser.getBrowser().name == "IE")
        ? this.refs.rte.getDOMNode() : this._getIframeWindow();

    // W3C DOM
    if (evtObj.addEventListener) {
      evtObj.addEventListener("keydown",function(evt) {
        this._handleInputKeyDown(evt);
      }.bind(this),false);
    } else if (evtObj.attachEvent) {
      // IE DOM
      evtObj.attachEvent("onkeydown", function(evt) {
        this._handleInputKeyDown(evt);
      }.bind(this));
    }
      
    return true;
  },

  /**
   * Autogrow the editor to match the contents
   */
  _autoGrow: function() {

    // We cannot autogrow if we are not mounted in the DOM
    if (!this.isMounted()) {
      return false;
    }

    var idoc = this._getIframDoc();
    var contentHeight = idoc.body.scrollHeight;

    var iframe = this.refs.rte.getDOMNode();
    iframe.style.height = contentHeight + "px";
  }

});

module.exports = RichText;