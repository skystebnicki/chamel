var React = require('react');

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
      autoGrow: true
    };
  },

  componentDidMount: function() {

    if (this.props.height) {
      var iframe = this.refs.rte.getDOMNode();
      alib.dom.styleSet(iframe, "height", height);
    }

    this._enableDesign();
    this.setValue(this.props.value);
  },

  render: function() {
    return ( 
      <div className="text-field-rich" >
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
      return bodyHtml = idoc.body.innerHTML;
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

    e.target = e.target || {};
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
    var evtObj = (alib.userAgent.ie) ? this.refs.rte.getDOMNode() : this._getIframeWindow();
    alib.events.listen(evtObj, "blur", function(evt) {
      this._handleInputBlur(evt);
    }.bind(this));

    // Set keydown event
    var evtObj = (alib.userAgent.ie) ? this.refs.rte.getDOMNode() : this._getIframeWindow();
    alib.events.listen(evtObj, "keydown", function(evt) {
      this._handleInputKeyDown(evt);
    }.bind(this));

    // TODO: Handle default blockElement if set
    /*
    if (this.defaultBlockElement) {
      this.listen("keydown", function(e) {
        var currentElem = me.currentCaretElem();
        if(!currentElem)
          me.setFont("formatBlock", me.defaultBlockElement)
      });
    }
    */

    /*
    if (alib.userAgent.ie) 
    {
      this.idoc.designMode = (designModeOn) ? "On" : "Off";
    } 
    else 
    {
      this.ifrm.contentDocument.designMode = "on";
      
      if (alib.userAgent.gecko || alib.userAgent.webkit) 
      {
        //attach a keyboard handler for gecko browsers to make keyboard shortcuts work
        //oRTE.addEventListener("keypress", kb_handler, true);
        this.idoc.body.spellcheck = true;
      }
    }
    */
      
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
    //var contentHeight = alib.dom.getElementHeight(idoc, true);
    var contentHeight = idoc.body.scrollHeight;

    var iframe = this.refs.rte.getDOMNode();
    alib.dom.styleSet(iframe, "height", contentHeight + "px");
  }

});

module.exports = RichText;