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

var _uaParserJs = require('ua-parser-js');

var _uaParserJs2 = _interopRequireDefault(_uaParserJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var uaParser = new _uaParserJs2.default();

var TextFieldRich = function (_Component) {
	_inherits(TextFieldRich, _Component);

	/**
  * Class constructor
  *
  * @param {Object} props Properties to send to the render function
  */
	function TextFieldRich(props) {
		_classCallCheck(this, TextFieldRich);

		var _this = _possibleConstructorReturn(this, (TextFieldRich.__proto__ || Object.getPrototypeOf(TextFieldRich)).call(this, props));
		// Call parent constructor


		_this._getIframeWindow = function () {

			// We cannot get iframe document if DOM is not yet mounted
			if (!_this.state.componentIsMounted) {
				return null;
			}

			var ifrm = _reactDom2.default.findDOMNode(_this.refs.rte);
			return ifrm.contentWindow || ifrm.contentDocument;
		};

		_this.sendCommand = function (command, option) {
			try {
				var ifrmWindow = _this._getIframeWindow();
				var idoc = ifrmWindow.document || null;

				if (idoc) {
					ifrmWindow.focus();
					idoc.execCommand(command, false, option);
					ifrmWindow.focus();
					_this._handleInputChange();
				}
			} catch (e) {
				throw new Error('Error while executing the ' + command + ' command');
			}
		};

		_this.setColor = function (type, color) {
			_this._setRange();
			_this.sendCommand(type, color);
		};

		_this.insertHtml = function (html) {
			_this._setRange();

			if (uaParser.getBrowser().name == "IE") {
				_this.sendCommand('paste', html);
			} else {
				_this.sendCommand('insertHtml', html);
			}
		};

		_this.insertLink = function (path) {
			_this._setRange();
			_this.sendCommand("unlink", null);
			_this.sendCommand("createlink", path);
		};

		_this.clearValue = function () {
			_this.setValue('');
		};

		_this.getValue = function () {
			var ifrmWindow = _this._getIframeWindow();
			var idoc = ifrmWindow.document || null;
			var value = idoc.body.innerHTML || "";

			return value;
		};

		_this.setValue = function (newValue) {
			var ifrmWindow = _this._getIframeWindow();
			var idoc = ifrmWindow.document || null;

			if (idoc) {
				idoc.body.innerHTML = newValue;
				_this._autoGrow();
			}
		};

		_this._setRange = function () {
			var ifrmWindow = _this._getIframeWindow();
			var idoc = ifrmWindow.document || null;

			if (idoc && uaParser.getBrowser().name == "IE") {
				var selection = idoc.selection;
				if (selection != null) _this._rangeSelection = selection.createRange();
			} else if (ifrmWindow) {
				var _selection = ifrmWindow.getSelection();
				_this._rangeSelection = _selection.getRangeAt(_selection.rangeCount - 1).cloneRange();
			}

			if (ifrmWindow && idoc && uaParser.getBrowser().name == "IE") {
				ifrmWindow.focus();

				// retrieve selected range
				var sel = idoc.selection;
				if (sel != null) {
					var newRng = sel.createRange();
					newRng = _this._rangeSelection;
					newRng.select();
				}
			}
		};

		_this._handleInputBlur = function (e) {
			var result = { target: { value: _this.getValue() } };

			if (_this.props.onBlur) _this.props.onBlur(result);
		};

		_this._handleInputChange = function (e) {
			var result = { target: { value: _this.getValue() } };
			if (_this.props.onChange) _this.props.onChange(result);
		};

		_this._handleInputFocus = function (e) {
			var result = { target: { value: _this.getValue() } };

			if (_this.props.onFocus) {
				_this.props.onFocus(result);
			}
		};

		_this._handleInputKeyUp = function (e) {
			var result = { target: { value: _this.getValue() } };

			if (_this.props.autoGrow) {
				_this._autoGrow();
			}

			if (e.keyCode == 13 && _this.props.onEnterKeyDown) {
				_this.props.onEnterKeyDown(result);
			}

			// Handle onkeydown event
			if (_this.props.onKeyUp) {
				_this.props.onKeyUp(result);
			}

			// Handle onChange event
			if (_this.props.onChange) {
				_this.props.onChange(result);
			}
		};

		_this._handleTextAreaHeightChange = function (e, height) {
			var newHeight = height + 24;
			if (_this.props.floatingLabelText) {
				newHeight += 24;
			}
			_reactDom2.default.findDOMNode(_this).style.height = newHeight + 'px';
		};

		_this._isControlled = function () {
			return _this.props.hasOwnProperty('value') || _this.props.hasOwnProperty('valueLink');
		};

		_this._enableDesign = function (on) {

			// Only enable after mounted into the dom
			if (!_this.state.componentIsMounted) {
				return false;
			}

			// Get the iframe document
			var ifrmWindow = _this._getIframeWindow();
			var idoc = ifrmWindow.document || null;

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

			// Set document events
			var evtObj = uaParser.getBrowser().name == "IE" ? _reactDom2.default.findDOMNode(_this.refs.rte) : _this._getIframeWindow();

			if (evtObj.addEventListener) {
				// W3C DOM

				// on blur
				evtObj.addEventListener("blur", function (evt) {
					this._handleInputBlur(evt);
				}.bind(_this), false);

				// on keyup
				evtObj.addEventListener("keyup", function (evt) {
					this._handleInputKeyUp(evt);
				}.bind(_this), false);

				// on focus
				evtObj.addEventListener("focus", function (evt) {
					this._handleInputFocus(evt);
				}.bind(_this), false);

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
				evtObj.attachEvent("onblur", function (evt) {
					this._handleInputBlur(evt);
				}.bind(_this));

				// on keydown
				evtObj.attachEvent("onkeyup", function (evt) {
					this._handleInputKeyUp(evt);
				}.bind(_this));

				// on focus
				evtObj.attachEvent("onfocus", function (evt) {
					this._handleInputFocus(evt);
				}.bind(_this));

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

		_this._autoGrow = function () {

			// We cannot autogrow if we are not mounted in the DOM
			if (!_this.state.componentIsMounted) {
				return false;
			}

			var ifrmWindow = _this._getIframeWindow();
			var idoc = ifrmWindow.document || null;

			if (idoc) {
				var contentHeight = idoc.body.scrollHeight;

				var iframe = _reactDom2.default.findDOMNode(_this.refs.rte);
				iframe.style.height = contentHeight + "px";
			}
		};

		_this.state = {
			componentIsMounted: false
		};
		return _this;
	}

	_createClass(TextFieldRich, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var iframe = _reactDom2.default.findDOMNode(this.refs.rte);
			iframe.style.width = "100%";

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
			setTimeout(function () {
				this._enableDesign(true);
				this.setValue(this.props.value);
			}.bind(this), 1);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.setState({ componentIsMounted: false });
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'chamel-text-field-rich' },
				_react2.default.createElement('iframe', { ref: 'rte', src: 'about:blank' })
			);
		}

		/**
   * Get the iframe window document
   *
   * @private
   */


		/**
   * Public interface to send commands to the RTE
   *
   * @param {string} command The name of the RTE command to execute
   * @param {string} option    The option when executing a certain command. e.g. changing the font/background colors
   * @public
   */


		/**
   * Sets the color of the current selection in the iframe document
   *
   * @param {string} type        Type of command to be executed. Either forecolor or backcolor
   * @param {string} color    The color that was selected
   * @public
   */


		/**
   * Inserts the html string
   *
   * @param {string} html        The string that will be inserted
   * @public
   */


		/**
   * Prompts the dialog box for user input
   *
   * @param {string} path        The url path to be linked on text
   * @public
   */


		/**
   * Clear the value of the iframe document
   *
   * @public
   */


		/**
   * Get the current value of the iframe document / code mirror editor
   *
   * @public
   */


		/**
   * Set the value of the iframe document / code mirror editor
   *
   * @param {string} newValue        The value to be saved in the editor
   * @public
   */


		/**
   * Set the range of the iframe document
   *
   * @private
   */


		/**
   * Handles the input blur event of the text area
   *
   * @param {DOMEvent} e        Reference to the DOM event being sent
   * @private
   */


		/**
   * Handles the input change event of the text area
   *
   * @param {DOMEvent} e        Reference to the DOM event being sent
   * @private
   */


		/**
   * Handles the input focus of the text area
   *
   * @param {DOMEvent} e        Reference to the DOM event being sent
   * @private
   */


		/**
   * Handles the input key down of the text area
   *
   * @param {DOMEvent} e        Reference to the DOM event being sent
   * @private
   */


		/**
   * Handles the change of height event of the text area
   *
   * @param {DOMEvent} e        Reference to the DOM event being sent
   * @param {int} height    T    The height to be set
   * @private
   */


		/**
   * Check if the component is controlled
   *
   * @private
   */


		/**
   * Enables the editor if it is already mounted
   *
   * @private
   */


		/**
   * Autogrow the editor to match the contents
   *
   * @private
   */

	}]);

	return TextFieldRich;
}(_react.Component);

TextFieldRich.propTypes = {
	id: _propTypes2.default.string,
	onBlur: _propTypes2.default.func,
	onChange: _propTypes2.default.func,
	onFocus: _propTypes2.default.func,
	onKeyUp: _propTypes2.default.func,
	onEnterKeyDown: _propTypes2.default.func,
	autoGrow: _propTypes2.default.bool,
	height: _propTypes2.default.number,
	value: _propTypes2.default.string
};

TextFieldRich.defaultProps = {
	autoGrow: true,
	value: ""
};

exports.default = TextFieldRich;
module.exports = exports['default'];